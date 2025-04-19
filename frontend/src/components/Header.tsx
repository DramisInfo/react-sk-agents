"use client";

import React from "react";
import Link from "next/link";

/**
 * Fixed header component displaying the app logo.
 */
export const Header: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 bg-card dark:bg-card border-b border-border dark:border-border glass-effect backdrop-blur-sm">
    <div className="container mx-auto flex items-center">
      <Link href="/" className="flex items-center">
        {/* Using a direct SVG element instead of Image component for better compatibility */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" className="h-10 w-40">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect x="5" y="10" width="40" height="30" rx="5" fill="url(#grad)" filter="url(#glow)" />
          <text x="55" y="33" fill="currentColor" className="text-foreground dark:text-foreground" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24">SK Agents</text>
          <circle cx="25" cy="25" r="10" fill="white" />
          <path d="M25 18 L22 23 L28 23 Z" fill="#06B6D4" />
          <path d="M25 32 L28 27 L22 27 Z" fill="#06B6D4" />
        </svg>
      </Link>
    </div>
  </header>
);

export default Header;
