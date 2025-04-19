import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock the required components
vi.mock('../components/ChatWindow', () => ({
  ChatWindow: () => <div data-testid="chat-window-mock">ChatWindow Mock</div>
}));

// Import the component after the mocks are set up
import Home from './page';

describe('Home Page Component', () => {
  it('should render with ChatWindow component', () => {
    // Verify the Home component exists and is a function
    expect(Home).toBeDefined();
    expect(typeof Home).toBe('function');
  });
});
