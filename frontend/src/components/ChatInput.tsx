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
        className="bg-primary dark:bg-primary text-white px-5 py-3 rounded-lg ml-3 hover:bg-primary-dark dark:hover:bg-primary-dark disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-accent/20"
        disabled={loading || !input.trim()}
        aria-label="Send message"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
