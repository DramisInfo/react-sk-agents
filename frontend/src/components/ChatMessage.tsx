import React from 'react';

/**
 * Props for a single chat message.
 */
export interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

/**
 * Renders a single chat message.
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`rounded-lg px-4 py-3 max-w-xs break-words shadow-md text-sm transition-all duration-200 ${
          sender === 'user'
            ? 'bg-primary dark:bg-primary text-white neon-border'
            : 'glass-effect border border-border dark:border-border text-card-foreground dark:text-card-foreground'
        }`}
      >
        {message}
      </div>
    </div>
  );
};
