import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import type { ChatMessageProps } from './ChatMessage';

describe('MessageList', () => {
  const messages: ChatMessageProps[] = [
    { message: 'Hello!', sender: 'user' },
    { message: 'Hi there!', sender: 'bot' },
  ];

  it('renders a list of chat messages', () => {
    render(<MessageList messages={messages} />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });
});
