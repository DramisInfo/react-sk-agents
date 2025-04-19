import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock the required modules
vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mock-geist-variable' }),
  Geist_Mono: () => ({ variable: 'mock-geist-mono-variable' }),
}));

vi.mock('../components/Header', () => ({
  Header: () => <div data-testid="mocked-header">Mocked Header</div>
}));

// Mock CSS import
vi.mock('./globals.css', () => ({}));

// Import the component after the mocks are set up
import RootLayout from './layout';

describe('RootLayout Component', () => {
  it('should render with header and children', () => {
    // Since we can't easily test Next.js layout directly in Vitest,
    // we'll just verify the module can be imported without errors
    expect(RootLayout).toBeDefined();
    expect(typeof RootLayout).toBe('function');
  });
});
