import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import SecurityChatbot from './SecurityChatbot';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-[400px] h-[600px] mb-4">
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <SecurityChatbot />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}