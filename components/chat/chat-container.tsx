'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { ChatUIMessage } from '@/lib/chat-types';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Search } from 'lucide-react';

const chatTransport = new DefaultChatTransport({ api: '/api/search/chat' });

function getToolInvocations(message: ChatUIMessage) {
  return message.parts.flatMap((part) => {
    const isToolPart = part.type === 'dynamic-tool' || part.type.startsWith('tool-');
    if (!isToolPart || !('toolCallId' in part)) {
      return [];
    }

    const input = 'input' in part && typeof part.input === 'object' && part.input !== null
      ? part.input as Record<string, unknown>
      : {};
    const output = 'output' in part && typeof part.output === 'object' && part.output !== null
      ? part.output as Record<string, unknown>
      : undefined;
    const toolName = part.type === 'dynamic-tool' && 'toolName' in part
      ? String(part.toolName)
      : part.type.slice('tool-'.length);

    return [{ toolName, toolCallId: part.toolCallId, args: input, result: output }];
  });
}

export function ChatContainer() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat<ChatUIMessage>({
    transport: chatTransport,
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });
  const isLoading = status === 'submitted' || status === 'streaming';

  // 新しいメッセージが来たら最下部までスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    sendMessage({ text: message, metadata: { createdAt: Date.now() } });
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
                  id: message.id,
                  role: message.role,
                  content: message.parts
                    .filter((part) => part.type === 'text')
                    .map((part) => part.text)
                    .join(''),
                  createdAt: message.metadata ? new Date(message.metadata.createdAt) : undefined,
                  toolInvocations: getToolInvocations(message),
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
