"use client";

import React, { useState } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import type { ChatMessageProps } from './ChatMessage';

/**
 * Main chat window layout component.
 */
export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    { 
      message: 'Hello! How can I help you today?', 
      sender: 'bot', 
      timestamp: new Date(), 
      senderName: 'Assistant' 
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (msg: string) => {
    setMessages(prev => [...prev, { 
      message: msg, 
      sender: 'user', 
      timestamp: new Date(),
      senderName: 'You'
    }]);
    setLoading(true);
    // Simulate bot response for UI demo
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        message: 'This is a bot reply.', 
        sender: 'bot', 
        timestamp: new Date(),
        senderName: 'Assistant'
      }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[100vh] w-full mx-auto border rounded-lg shadow bg-card dark:bg-card glass-effect neon-border tech-shadow">
      <div className="flex-grow overflow-hidden">
        <MessageList messages={messages} />
      </div>
      <div className="mt-auto">
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};
