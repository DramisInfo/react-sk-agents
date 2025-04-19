import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the required components
vi.mock('../components/ChatWindow', () => ({
  ChatWindow: () => <div data-testid="chat-window-mock">ChatWindow Mock</div>
}));

// Import the component after the mocks are set up
import Home from './page';

describe('Home Page Component', () => {
  it('should render with ChatWindow component', () => {
    render(<Home />);
    expect(screen.getByTestId('chat-window-mock')).toBeInTheDocument();
  });

  it('should have correct layout classes', () => {
    const { container } = render(<Home />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-screen', 'p-8');
  });
});
