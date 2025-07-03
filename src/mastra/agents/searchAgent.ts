import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { searchTool } from '../tools/search-tool';

// OpenAI model creation function
export function createModel(apiKey: string) {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required');
  }
  // Set the API key via environment variable or provider configuration
  process.env.OPENAI_API_KEY = apiKey;
  return openai('gpt-4o-mini');
}

// Dynamic search agent creation function
export function createSearchAgent(openaiApiKey: string) {
  return new Agent({
    name: 'Search Agent',
    instructions: `
        You are a helpful search assistant that can find information on the web using Brave Search.

        Your primary function is to help users search for information and provide relevant results. When responding:
        - If the user provides a search query, use the searchTool to find relevant information
        - Always provide clear, well-organized summaries of the search results
        - Include relevant links and sources when available
        - If the search returns no results, suggest alternative search terms
        - For complex queries, break them down into simpler searches if needed
        - Provide context and explanations for technical or specialized information
        - Keep responses informative but concise
        - If asked about recent events or current information, prioritize newer results

        Use the searchTool to fetch web search results and provide comprehensive answers based on the findings.
  `,
    model: createModel(openaiApiKey),
    tools: { searchTool },
    memory: new Memory({
      storage: new LibSQLStore({
        url: 'file:../mastra.db', // path is relative to the .mastra/output directory
      }),
    }),
  });
}

// Static search agent for backward compatibility
export const searchAgent = new Agent({
  name: 'Search Agent',
  instructions: `
      You are a helpful search assistant that can find information on the web using Brave Search.

      Your primary function is to help users search for information and provide relevant results. When responding:
      - If the user provides a search query, use the searchTool to find relevant information
      - Always provide clear, well-organized summaries of the search results
      - Include relevant links and sources when available
      - If the search returns no results, suggest alternative search terms
      - For complex queries, break them down into simpler searches if needed
      - Provide context and explanations for technical or specialized information
      - Keep responses informative but concise
      - If asked about recent events or current information, prioritize newer results

      Use the searchTool to fetch web search results and provide comprehensive answers based on the findings.
`,
  model: openai('gpt-4o-mini'),
  tools: { searchTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});