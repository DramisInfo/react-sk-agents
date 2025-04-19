import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting', () => {
  it('renders the greeting message', () => {
    render(<Greeting name="Test User" />);
    expect(screen.getByText(/hello, test user/i)).toBeInTheDocument();
  });
});
