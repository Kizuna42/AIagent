import { streamText, convertToCoreMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/lib/supabase/server';
import { searchTool } from '@/src/mastra/tools/search-tool';

export async function POST(req: NextRequest) {
  try {
    console.log('API route called');

    // Environment variable validation
    const braveApiKey = process.env.BRAVE_SEARCH_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    console.log('Environment check:', { 
      hasBraveKey: !!braveApiKey, 
      hasOpenaiKey: !!openaiApiKey 
    });

    if (!braveApiKey) {
      return NextResponse.json(
        { error: 'BRAVE_SEARCH_API_KEY environment variable is required' },
        { status: 500 }
      );
    }

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY environment variable is required' },
        { status: 500 }
      );
    }

    // Supabase authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log('Auth error:', authError);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('User authenticated:', user.id);

    // Parse request body
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    console.log('Messages received:', messages.length);

    // Convert messages to core format
    const coreMessages = convertToCoreMessages(messages);

    // Convert Mastra tool to AI SDK tool format
    const aiSdkTools = {
      searchWeb: {
        description: 'Search the web using Brave Search API',
        parameters: searchTool.inputSchema,
        execute: async (params: { query: string; count?: number }) => {
          console.log('Tool execution:', params);
          try {
            // Call the search function directly from the tool
            const apiKey = process.env.BRAVE_SEARCH_API_KEY;
            if (!apiKey) {
              throw new Error('BRAVE_SEARCH_API_KEY environment variable is required');
            }

            const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(params.query)}&count=${params.count || 10}`;

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

            const data = await response.json();

            if (!data.web?.results) {
              throw new Error('No search results found');
            }

            const result = {
              results: data.web.results.map((searchResult: { title: string; url: string; description: string; date?: string }) => ({
                title: searchResult.title,
                url: searchResult.url,
                description: searchResult.description,
                date: searchResult.date || '',
              })),
              query: data.query.original,
            };

            console.log('Tool result:', result);
            return result;
          } catch (error) {
            console.error('Tool execution error:', error);
            throw error;
          }
        },
      },
    };

    // Stream the response with retry logic
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        console.log(`Streaming attempt ${retryCount + 1}`);
        
        const result = await streamText({
          model: openai('gpt-4o-mini'),
          messages: coreMessages,
          tools: aiSdkTools,
          maxSteps: 5,
          system: `You are a helpful search assistant that can find information on the web using Brave Search.

Your primary function is to help users search for information and provide relevant results. When responding:
- If the user provides a search query, use the searchWeb tool to find relevant information
- Always provide clear, well-organized summaries of the search results
- Include relevant links and sources when available
- If the search returns no results, suggest alternative search terms
- For complex queries, break them down into simpler searches if needed
- Provide context and explanations for technical or specialized information
- Keep responses informative but concise
- If asked about recent events or current information, prioritize newer results

Use the searchWeb tool to fetch web search results and provide comprehensive answers based on the findings.`,
          onFinish: ({ finishReason, usage }) => {
            console.log('Stream finished:', { finishReason, usage });
          },
        });

        return result.toDataStreamResponse();
      } catch (error) {
        retryCount++;
        console.error(`Attempt ${retryCount} failed:`, error);
        
        if (retryCount >= maxRetries) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      }
    }
  } catch (error) {
    console.error('Search chat API error:', error);
    
    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}