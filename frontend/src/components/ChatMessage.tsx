"use client";

import React, { useState, useEffect } from 'react';

/**
 * Props for a single chat message.
 */
export interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
  senderName?: string;
}

/**
 * Formats a date to a readable time string.
 * Using a fixed format to prevent hydration errors between server and client.
 */
const formatTimestamp = (date?: Date): string => {
  if (!date) return '';
  
  // Using a fixed format instead of locale-dependent formatting
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // 24-hour format that won't change between server and client
  return `${hours}:${minutes}`;
};

/**
 * Renders a single chat message with sender information and timestamp.
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  sender, 
  timestamp, 
  senderName 
}) => {
  const displayName = senderName || (sender === 'user' ? 'You' : 'Agent');
  const [timeDisplay, setTimeDisplay] = useState<string>('');
  
  // Only render the timestamp on the client side
  useEffect(() => {
    setTimeDisplay(formatTimestamp(timestamp || new Date()));
  }, [timestamp]);

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {sender === 'bot' && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
            AI
          </div>
        </div>
      )}
      
      <div className="flex flex-col">
        <div className={`text-xs ${sender === 'user' ? 'text-right' : 'text-left'} text-gray-500 dark:text-gray-400 mb-1`}>
          {displayName}{timeDisplay && ` • ${timeDisplay}`}
        </div>
        
        <div
          className={`rounded-lg px-4 py-3 max-w-xs md:max-w-sm lg:max-w-md break-words shadow-md text-sm transition-all duration-200 ${
            sender === 'user'
              ? 'bg-primary dark:bg-primary text-white rounded-tr-none neon-border'
              : 'glass-effect border border-border dark:border-border text-card-foreground dark:text-card-foreground rounded-tl-none'
          }`}
        >
          {message}
        </div>
      </div>
      
      {sender === 'user' && (
        <div className="flex-shrink-0 ml-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
            You
          </div>
        </div>
      )}
    </div>
  );
};
