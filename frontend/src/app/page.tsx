"use client";
import React from 'react';
import { ChatWindow } from '../components/ChatWindow';

export default function Home() {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full h-full tech-shadow">
        <ChatWindow />
      </div>
    </div>
  );
}
