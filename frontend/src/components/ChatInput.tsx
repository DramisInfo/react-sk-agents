"use client";

import React, { useState, FormEvent } from 'react';

/**
 * Props for the chat input component.
 */
export interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

/**
 * Renders the input box and send button for the chat UI.
 */
export const ChatInput: React.FC<ChatInputProps> = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-muted dark:bg-muted border-t border-border dark:border-border sticky bottom-0 backdrop-blur-sm">
      <input
        type="text"
        className="flex-1 rounded-lg px-4 py-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark"
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
        aria-label="Type your message"
      />
      <button
        type="submit"
        className={`flex items-center justify-center w-12 h-12 rounded-full ml-3 transition-all duration-200 shadow-lg hover:shadow-accent/20 ${
          loading || !input.trim() 
            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
            : 'bg-primary dark:bg-primary text-white hover:bg-primary-dark dark:hover:bg-primary-dark'
        }`}
        disabled={loading || !input.trim()}
        aria-label="Send message"
      >
        {loading ? (
          <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        )}
      </button>
    </form>
  );
};
