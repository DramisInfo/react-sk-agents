import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('renders the header with logo', () => {
    render(<Header />);
    
    // Check if the header element exists
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    
    // Check if the logo SVG is rendered
    const logoSvg = document.querySelector('svg');
    expect(logoSvg).toBeInTheDocument();
    
    // Check if the SK Agents text is present in the SVG
    const logoText = screen.getByText('SK Agents');
    expect(logoText).toBeInTheDocument();
    
    // Check if there's a link to the homepage
    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
