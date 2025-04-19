import React from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';

/**
 * Props for the message list component.
 */
export interface MessageListProps {
  messages: ChatMessageProps[];
}

/**
 * Renders a scrollable list of chat messages.
 */
export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="h-full overflow-y-auto p-4 bg-card dark:bg-card grid-bg">
      <div className="flex flex-col space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} sender={msg.sender} />
        ))}
      </div>
    </div>
  );
};
