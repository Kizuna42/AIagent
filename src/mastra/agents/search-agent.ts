import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { searchTool } from '../tools/search-tool';

// 検索エージェントのシステムプロンプト。
// Mastra Agent と本番 API ルート（app/api/search/chat）の両方から参照する単一の真実の源。
export const SEARCH_SYSTEM_PROMPT = `You are a helpful search assistant that can find information on the web using Brave Search.

Your primary function is to help users search for information and provide relevant results. When responding:
- If the user provides a search query, use the search tool to find relevant information
- Always provide clear, well-organized summaries of the search results
- Include relevant links and sources when available
- If the search returns no results, suggest alternative search terms
- For complex queries, break them down into simpler searches if needed
- Provide context and explanations for technical or specialized information
- Keep responses informative but concise
- If asked about recent events or current information, prioritize newer results

Use the search tool to fetch web search results and provide comprehensive answers based on the findings.`;

// 同じ検索ツールを使う Mastra Agent の定義。
// 本番 API はストリーミング制御のため AI SDK を直接利用するが、このエージェント定義は
// 同一ロジックを Mastra のエージェント抽象として表現したもの（マルチエージェント化の起点）。
export const searchAgent = new Agent({
  name: 'Search Agent',
  instructions: SEARCH_SYSTEM_PROMPT,
  model: openai('gpt-4o-mini'),
  tools: { searchTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // パスは .mastra/output ディレクトリ基準
    }),
  }),
});
