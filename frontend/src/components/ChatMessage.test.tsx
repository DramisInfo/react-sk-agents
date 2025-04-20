"use client";

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ChatMessage, ChatMessageProps } from './ChatMessage';

describe('ChatMessage Component', () => {
  const mockUserMessage: ChatMessageProps = {
    message: 'Hello, this is a test message',
    sender: 'user',
    timestamp: new Date('2025-04-19T10:30:00'),
    senderName: 'Test User'
  };

  const mockBotMessage: ChatMessageProps = {
    message: 'This is a response from the bot',
    sender: 'bot',
    timestamp: new Date('2025-04-19T10:31:00'),
    senderName: 'Assistant'
  };

  test('renders user message with correct content and styling', () => {
    render(<ChatMessage {...mockUserMessage} />);
    
    // Check message content
    expect(screen.getByText(mockUserMessage.message)).toBeInTheDocument();
    
    // Check sender name
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
    
    // Check avatar (You)
    expect(screen.getByText('You')).toBeInTheDocument();
    
    // Check timestamp format (we can't check exact time as it depends on locale)
    const timestampRegex = /\d{1,2}:\d{2}/;
    const timestampElements = screen.getAllByText((content) => 
      timestampRegex.test(content)
    );
    expect(timestampElements.length).toBeGreaterThan(0);

    // Ensure user message has primary background (check for classes that apply to user messages)
    const messageElement = screen.getByText(mockUserMessage.message);
    const messageContainer = messageElement.closest('div');
    expect(messageContainer).toHaveClass('bg-primary');
  });

  test('renders bot message with correct content and styling', () => {
    render(<ChatMessage {...mockBotMessage} />);
    
    // Check message content
    expect(screen.getByText(mockBotMessage.message)).toBeInTheDocument();
    
    // Check sender name
    expect(screen.getByText(/Assistant/)).toBeInTheDocument();
    
    // Check avatar (AI)
    expect(screen.getByText('AI')).toBeInTheDocument();
    
    // Check timestamp
    const timestampRegex = /\d{1,2}:\d{2}/;
    const timestampElements = screen.getAllByText((content) => 
      timestampRegex.test(content)
    );
    expect(timestampElements.length).toBeGreaterThan(0);

    // Ensure bot message has glass-effect styling
    const messageElement = screen.getByText(mockBotMessage.message);
    const messageContainer = messageElement.closest('div');
    expect(messageContainer).toHaveClass('glass-effect');
  });

  test('uses default values when optional props are not provided', () => {
    const minimalProps = {
      message: 'Minimal message',
      sender: 'user' as const
    };
    
    render(<ChatMessage {...minimalProps} />);
    
    // Check message content
    expect(screen.getByText(minimalProps.message)).toBeInTheDocument();
    
    // Check default sender name 'You' is used (we need to be more specific since it appears in multiple places)
    const headerElements = screen.getAllByText(/You/);
    expect(headerElements.length).toBeGreaterThan(0);
    
    // Timestamp should still appear in some format
    const timestampRegex = /\d{1,2}:\d{2}/;
    const timestampElements = screen.getAllByText((content) => 
      timestampRegex.test(content)
    );
    expect(timestampElements.length).toBeGreaterThan(0);
  });

  test('messages are visually distinctive between user and bot', () => {
    const { rerender } = render(<ChatMessage {...mockUserMessage} />);
    
    // User message should be aligned to the right
    let container = screen.getByText(mockUserMessage.message).closest('div[class*="flex"]');
    while (container && !container.className.includes('justify-end')) {
      container = container.parentElement;
    }
    expect(container).toHaveClass('justify-end');
    
    // Re-render with bot message
    rerender(<ChatMessage {...mockBotMessage} />);
    
    // Bot message should be aligned to the left
    container = screen.getByText(mockBotMessage.message).closest('div[class*="flex"]');
    while (container && !container.className.includes('justify-start')) {
      container = container.parentElement;
    }
    expect(container).toHaveClass('justify-start');
  });
});
