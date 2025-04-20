"use client";

import React, { useState } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import type { ChatMessageProps } from './ChatMessage';

// Define constants
const BOT_RESPONSE_DELAY = 1000; // 1 second delay for bot response

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

  const handleSend = async (msg: string): Promise<void> => {
    // Add user message to chat
    setMessages(prev => [...prev, { 
      message: msg, 
      sender: 'user', 
      timestamp: new Date(),
      senderName: 'You'
    }]);
    setLoading(true);
    
    try {
      // Simulate bot response for UI demo
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, BOT_RESPONSE_DELAY));
      
      setMessages(prev => [...prev, { 
        message: 'This is a bot reply.', 
        sender: 'bot', 
        timestamp: new Date(),
        senderName: 'Assistant'
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      // Could add error handling UI here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full mx-auto border rounded-lg shadow bg-card dark:bg-card glass-effect neon-border tech-shadow relative z-10">
      <div className="flex-grow overflow-auto z-10">
        <MessageList messages={messages} />
      </div>
      <div className="sticky bottom-0 w-full bg-card dark:bg-card p-4">
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};
