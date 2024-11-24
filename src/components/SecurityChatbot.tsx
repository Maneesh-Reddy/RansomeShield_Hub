import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Shield, Bot } from 'lucide-react';
import { analyzeMessage } from '../utils/securityAnalyzer';
import { getContextualResponse } from '../utils/chatResponses';
import { Message, ThreatAnalysis } from '../types';

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello! 👋 I'm your AI Security Assistant. I can help you:

• Analyze suspicious emails or messages
• Identify potential scams and threats
• Guide you on security best practices
• Provide real-world scam examples

Share any suspicious message or ask me a security question!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsAnalyzing(true);

    // First, check for follow-up questions
    const contextualResponse = getContextualResponse(input);
    
    if (contextualResponse) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: contextualResponse,
      };
      setMessages((prev) => [...prev, botResponse]);
    } else {
      // If not a follow-up question, analyze for threats
      const analysis: ThreatAnalysis = await analyzeMessage(input);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: analysis.response,
        analysis: analysis,
      };

      if (analysis.threatLevel !== 'safe') {
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: "❓ Would you like to know:\n• What steps to take next?\n• How to identify similar scams?\n• Where to report this?\n• How to prevent future attacks?\n\nJust ask and I'll guide you!",
        };
        setMessages((prev) => [...prev, botResponse, followUpMessage]);
      } else {
        setMessages((prev) => [...prev, botResponse]);
      }
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex items-center gap-2">
        <Bot className="h-6 w-6" />
        <h2 className="text-lg font-semibold">Security Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.analysis && (
                <div className="mt-4 space-y-2">
                  {message.analysis.threatLevel !== 'safe' && (
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-semibold">
                        Threat Level: {message.analysis.threatLevel}
                      </span>
                    </div>
                  )}
                  {message.analysis.indicators.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold mb-1">Suspicious indicators:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {message.analysis.indicators.map((indicator, index) => (
                          <li key={index} className="text-sm">
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {message.analysis.similarScams && message.analysis.similarScams.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold mb-1">Similar known scams:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {message.analysis.similarScams.map((scam, index) => (
                          <li key={index} className="text-sm">
                            {scam}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {message.analysis.threatLevel === 'safe' && (
                    <div className="flex items-center gap-2 text-green-500">
                      <Shield className="h-5 w-5" />
                      <span>No immediate threats detected</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share a suspicious message or ask a question..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isAnalyzing}
          />
          <button
            type="submit"
            className={`${
              isAnalyzing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white p-2 rounded-lg transition flex items-center gap-2`}
            disabled={isAnalyzing}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}