import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

interface BraveSearchResponse {
  web: {
    results: {
      title: string;
      url: string;
      description: string;
      date?: string;
    }[];
  };
  query: {
    original: string;
  };
}

export const searchTool = createTool({
  id: 'brave-search',
  description: 'Search the web using Brave Search API',
  inputSchema: z.object({
    query: z.string().describe('Search query'),
    count: z.number().int().min(1).max(20).optional().describe('Number of results to return (1-20, default: 10)'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string(),
      date: z.string(),
    })),
    query: z.string(),
  }),
  execute: async ({ context }) => {
    return await performSearch(context.query, context.count || 10);
  },
});

export const performSearch = async (query: string, count: number = 10) => {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error('BRAVE_SEARCH_API_KEY environment variable is required');
  }

  // 不正・過大な count による外部APIコストの増大を防ぐためクランプ
  const safeCount = Math.min(Math.max(1, Math.floor(count)), 20);

  const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${safeCount}`;

  const response = await fetch(searchUrl, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Brave Search API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as BraveSearchResponse;

  if (!data.web?.results) {
    throw new Error('No search results found');
  }

  return {
    results: data.web.results.map(result => ({
      title: result.title,
      url: result.url,
      description: result.description,
      date: result.date || '',
    })),
    query: data.query.original,
  };
};