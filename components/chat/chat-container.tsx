'use client';

import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Search } from 'lucide-react';

export function ChatContainer() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, append, isLoading, error } = useChat({
    api: '/api/search/chat',
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  // 新しいメッセージが来たら最下部までスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    append({ role: 'user', content: message });
  };

  return (
    <div className="flex flex-col h-[600px] border border-border rounded-lg bg-background">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Search className="h-5 w-5 text-blue-600" />
        <h3 className="font-medium text-foreground">AI検索アシスタント</h3>
        <div className="ml-auto text-xs text-muted-foreground">
          Powered by Brave Search
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div className="space-y-3">
              <Search className="h-12 w-12 text-muted-foreground mx-auto" />
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">検索を開始</h4>
                <p className="text-sm text-muted-foreground">
                  質問や検索したい内容を入力してください
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={{
                  ...message,
                  createdAt: message.createdAt || new Date(),
                  toolInvocations: message.toolInvocations?.map((tool) => ({
                    toolName: ('toolName' in tool ? tool.toolName as string : 'searchWeb'),
                    toolCallId: ('toolCallId' in tool ? tool.toolCallId as string : ''),
                    args: ('args' in tool ? tool.args as Record<string, unknown> : {}),
                    result: ('result' in tool ? tool.result as Record<string, unknown> : {}),
                  })),
                }}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              エラーが発生しました: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={!!error}
      />
    </div>
  );
}