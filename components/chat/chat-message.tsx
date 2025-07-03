'use client';

import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { User, Bot, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCall {
  toolName: string;
  toolCallId: string;
  args: Record<string, unknown>;
  result?: Record<string, unknown>;
}

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    content: string;
    createdAt?: Date;
    toolInvocations?: ToolCall[];
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const timestamp = message.createdAt || new Date();

  return (
    <div className={cn(
      'flex gap-3 p-4',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Avatar */}
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser ? 'bg-blue-600' : 'bg-muted'
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        'flex-1 space-y-2 max-w-[80%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        {/* Tool Execution Badges */}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <div className={cn(
            'flex gap-2 flex-wrap',
            isUser ? 'justify-end' : 'justify-start'
          )}>
            {message.toolInvocations.map((tool, index) => (
              <Badge
                key={`${tool.toolCallId}-${index}`}
                variant="secondary"
                className="text-xs flex items-center gap-1"
              >
                <Search className="h-3 w-3" />
                {tool.toolName === 'searchWeb' ? 'Brave Search' : tool.toolName}
              </Badge>
            ))}
          </div>
        )}

        {/* Message Bubble */}
        <div className={cn(
          'rounded-lg px-4 py-2 text-sm',
          isUser
            ? 'bg-blue-600 text-white ml-auto'
            : 'bg-muted text-foreground'
        )}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>

        {/* Timestamp */}
        <div className={cn(
          'text-xs text-muted-foreground',
          isUser ? 'text-right' : 'text-left'
        )}>
          {format(timestamp, 'HH:mm', { locale: ja })}
        </div>
      </div>
    </div>
  );
}