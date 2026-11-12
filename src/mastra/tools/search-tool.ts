import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Brave Search API の応答待ちの上限。ハングした接続でリクエストを占有し続けないようにする
const SEARCH_TIMEOUT_MS = 10_000;

interface BraveSearchResponse {
  web?: {
    results: {
      title: string;
      url: string;
      description: string;
      date?: string;
    }[];
  };
  query?: {
    original: string;
  };
}

export const searchInputSchema = z.object({
  query: z.string().describe('Search query'),
  count: z.number().int().min(1).max(20).optional().describe('Number of results to return (1-20, default: 10)'),
});

export const searchTool = createTool({
  id: 'brave-search',
  description: 'Search the web using Brave Search API',
  inputSchema: searchInputSchema,
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string(),
      date: z.string(),
    })),
    query: z.string(),
  }),
  execute: async ({ query, count }) => {
    return await performSearch(query, count || 10);
  },
});

export const performSearch = async (query: string, count: number = 10) => {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error('BRAVE_SEARCH_API_KEY environment variable is required');
  }

  // 不正・過大な count による外部APIコストの増大を防ぐためクランプ（NaN 等は既定値 10）
  const safeCount = Number.isFinite(count)
    ? Math.min(Math.max(1, Math.floor(count)), 20)
    : 10;

  const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${safeCount}`;

  const response = await fetch(searchUrl, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': apiKey,
    },
    signal: AbortSignal.timeout(SEARCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Brave Search API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as BraveSearchResponse;

  // 該当なしは例外ではなく空配列で返し、モデルに代替クエリを提案させる
  const results = data.web?.results ?? [];

  return {
    results: results.map(result => ({
      title: result.title,
      url: result.url,
      description: result.description,
      date: result.date || '',
    })),
    query: data.query?.original ?? query,
  };
};
