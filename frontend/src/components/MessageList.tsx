"use client";

import React, { useRef, useEffect } from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';

/**
 * Props for the message list component.
 */
export interface MessageListProps {
  messages: ChatMessageProps[];
}

/**
 * Renders a scrollable list of chat messages.
 * Automatically scrolls to the bottom when new messages are added.
 */
export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = (): void => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 bg-card dark:bg-card grid-bg">
      <div className="flex flex-col space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} sender={msg.sender} />
        ))}
        {/* This is an empty div that serves as a reference point to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
