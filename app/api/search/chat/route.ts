import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
} from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/lib/supabase/server';
import type { ChatUIMessage } from '@/lib/chat-types';
import { performSearch, searchInputSchema } from '@/src/mastra/tools/search-tool';
import { SEARCH_SYSTEM_PROMPT } from '@/src/mastra/agents/search-agent';

export async function POST(req: NextRequest) {
  try {
    // 必須の環境変数を検証
    if (!process.env.BRAVE_SEARCH_API_KEY) {
      return NextResponse.json(
        { error: 'BRAVE_SEARCH_API_KEY environment variable is required' },
        { status: 500 }
      );
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY environment variable is required' },
        { status: 500 }
      );
    }

    // Supabase認証: ログイン済みユーザーのみ許可
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // リクエストボディを検証
    const { messages }: { messages: ChatUIMessage[] } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Mastra で定義した Brave 検索ツールのロジックを AI SDK のツールとして再利用
    const tools = {
      searchWeb: tool({
        description: 'Search the web using Brave Search API',
        inputSchema: searchInputSchema,
        execute: async ({ query, count }) =>
          performSearch(query, count),
      }),
    };

    // ストリーミング応答。AI SDK 標準の maxRetries で一時的な API 障害を自動リトライ
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(5),
      maxRetries: 3,
      system: SEARCH_SYSTEM_PROMPT,
    });

    const createdAt = Date.now();
    return result.toUIMessageStreamResponse<ChatUIMessage>({
      originalMessages: messages,
      messageMetadata: ({ part }) => part.type === 'start' ? { createdAt } : undefined,
    });
  } catch (error) {
    // 詳細はサーバーログのみに残し、クライアントには汎用メッセージを返す
    console.error('Search chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
