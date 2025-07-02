import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const searchTool = createTool({
  id: "brave-search",
  description: "Search the web using Brave Search API",
  inputSchema: z.object({
    query: z.string().describe("Search query"),
    count: z.number().optional().describe("Number of results to return (default: 10)")
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string(),
      date: z.string()
    })),
    query: z.string()
  }),
  execute: async ({ context }) => {
    return await performSearch(context.query, context.count || 10);
  }
});
const performSearch = async (query, count = 10) => {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) {
    throw new Error("BRAVE_SEARCH_API_KEY environment variable is required");
  }
  const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}`;
  const response = await fetch(searchUrl, {
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": apiKey
    }
  });
  if (!response.ok) {
    throw new Error(`Brave Search API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  if (!data.web?.results) {
    throw new Error("No search results found");
  }
  return {
    results: data.web.results.map((result) => ({
      title: result.title,
      url: result.url,
      description: result.description,
      date: result.date || ""
    })),
    query: data.query.original
  };
};

export { searchTool };
//# sourceMappingURL=58bf90da-5b96-4501-aee5-3dee04fab037.mjs.map
