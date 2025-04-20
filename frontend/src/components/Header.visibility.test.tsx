import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Visibility Test', () => {
  beforeEach(() => {
    // Create a test root element to contain the header
    document.body.innerHTML = '<div id="test-root"></div>';
  });

  it('renders the header with visible elements', () => {
    const { container } = render(<Header />);
    
    // Check if the header element exists and is visible
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    
    // Get the computed styles of the header
    const headerStyles = window.getComputedStyle(headerElement);
    console.log('Header computed styles:', {
      display: headerStyles.display,
      visibility: headerStyles.visibility,
      position: headerStyles.position,
      height: headerStyles.height,
      zIndex: headerStyles.zIndex
    });
    
    // Check header dimensions
    const headerRect = headerElement.getBoundingClientRect();
    console.log('Header bounding rect:', {
      top: headerRect.top,
      left: headerRect.left,
      width: headerRect.width,
      height: headerRect.height
    });
    
    // Ensure header has height
    expect(headerRect.height).toBeGreaterThan(0);
    
    // Check if the SK Agents text is visible
    const logoText = screen.getByText('SK Agents');
    expect(logoText).toBeInTheDocument();
    expect(logoText).toBeVisible();
  });
  
  // Test layout integration with page structure
  it('is visible when integrated with page layout', () => {
    // Mock a simplified version of the app layout
    const MockLayout = () => (
      <>
        <Header />
        <main>
          <div className="flex flex-col items-center p-8">
            <div className="w-full h-full">
              <div>Chat Window Content</div>
            </div>
          </div>
        </main>
      </>
    );
    
    const { container } = render(<MockLayout />);
    
    // Check if header is rendered in the layout
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeVisible();
    
    // Check the position of the header relative to other elements
    const headerRect = headerElement.getBoundingClientRect();
    const mainElement = container.querySelector('main');
    const mainRect = mainElement?.getBoundingClientRect();
    
    console.log('Layout test - Header rect:', headerRect);
    console.log('Layout test - Main content rect:', mainRect);
    
    // The header should be above the main content
    if (mainRect) {
      expect(headerRect.bottom).toBeLessThanOrEqual(mainRect.top);
    }
  });
});
