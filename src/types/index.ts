export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  analysis?: ThreatAnalysis;
}

export interface ThreatAnalysis {
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
  threatScore: number;
  indicators: string[];
  response: string;
  examples?: string[];
  similarScams?: string[];
}