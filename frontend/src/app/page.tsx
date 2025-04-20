"use client";
import React from 'react';
import { ChatWindow } from '../components/ChatWindow';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start w-full h-[calc(100vh-64px)] p-8 pt-4">
      <div className="w-full h-full tech-shadow">
        <ChatWindow />
      </div>
    </div>
  );
}
