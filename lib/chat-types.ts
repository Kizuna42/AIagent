import type { UIMessage } from 'ai';

export interface ChatMessageMetadata {
  createdAt: number;
}

export type ChatUIMessage = UIMessage<ChatMessageMetadata>;
