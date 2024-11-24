import React from 'react';
import SecurityChatbot from '../components/SecurityChatbot';

export default function SecurityChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Security Analysis Chat</h1>
        <SecurityChatbot />
      </div>
    </div>
  );
}