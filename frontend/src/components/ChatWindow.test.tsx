import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWindow } from './ChatWindow';

describe('ChatWindow', () => {
  it('renders the chat window layout', () => {
    render(<ChatWindow />);
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByText(/how can i help you/i)).toBeInTheDocument();
  });

  it('allows user to type and send a message', () => {
    render(<ChatWindow />);
    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: 'Hello bot!' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText('Hello bot!')).toBeInTheDocument();
  });
});
