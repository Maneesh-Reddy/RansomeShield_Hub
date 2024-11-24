interface PhishingPattern {
  pattern: RegExp;
  indicator: string;
  weight: number;
  examples?: string[];
}

const phishingPatterns: PhishingPattern[] = [
  {
    pattern: /urgent|immediate action|account.*terminat|security.*breach/i,
    indicator: "Urgency or threat-based language",
    weight: 0.8,
    examples: [
      "URGENT: Your account will be terminated in 24 hours",
      "Immediate action required to prevent account suspension"
    ]
  },
  {
    pattern: /verify.*account|confirm.*identity|validate.*credentials/i,
    indicator: "Request for account verification",
    weight: 0.7,
    examples: [
      "Please verify your account details within 24 hours",
      "Confirm your identity to continue using our services"
    ]
  },
  {
    pattern: /bank.*transfer|payment.*confirm|financial.*update/i,
    indicator: "Financial-related requests",
    weight: 0.9,
    examples: [
      "Update your bank details to receive pending payment",
      "Confirm your payment information immediately"
    ]
  },
  {
    pattern: /(http|https):\/\/(?!trusted-domain\.com)[^\s]+/i,
    indicator: "Suspicious URL",
    weight: 0.9,
    examples: [
      "Click here: http://secure-banking-verify.net/auth",
      "Update details: https://paypal-secure.suspicious.com"
    ]
  },
  {
    pattern: /password|username|login|credential/i,
    indicator: "Requests for sensitive information",
    weight: 0.8,
    examples: [
      "Please provide your login credentials for verification",
      "Update your password by clicking this link"
    ]
  },
  {
    pattern: /lottery|winner|prize|inheritance|million dollar|won|claim|reward/i,
    indicator: "Too-good-to-be-true offers",
    weight: 0.95,
    examples: [
      "Congratulations! You've won $1,000,000 in our lottery",
      "You have inherited $5,000,000 from a distant relative"
    ]
  },
  {
    pattern: /dear.*user|dear.*customer|dear.*sir\/madam/i,
    indicator: "Generic greeting (common in scams)",
    weight: 0.6,
    examples: [
      "Dear valued customer",
      "Dear sir/madam"
    ]
  },
  {
    pattern: /bitcoin|crypto|wallet|transfer.*money/i,
    indicator: "Cryptocurrency-related requests",
    weight: 0.8,
    examples: [
      "Transfer Bitcoin to claim your reward",
      "Urgent: Your crypto wallet needs verification"
    ]
  }
];

const malwarePatterns: PhishingPattern[] = [
  {
    pattern: /\.exe$|\.zip$|\.rar$|\.7z$/i,
    indicator: "Suspicious file attachment",
    weight: 0.9,
    examples: [
      "invoice.exe",
      "document.zip containing executable files"
    ]
  },
  {
    pattern: /download.*attachment|open.*file|view.*document/i,
    indicator: "Request to download or open files",
    weight: 0.8,
    examples: [
      "Download this attachment to view your invoice",
      "Open this file to claim your prize"
    ]
  }
];

const realWorldExamples = [
  {
    type: "PayPal Phishing",
    content: "PayPal: Your account has been limited! Click here to verify: http://paypal-secure.suspicious.com",
    explanation: "Real PayPal scam attempting to steal credentials through urgency and fake URLs"
  },
  {
    type: "Bank Account Scam",
    content: "Dear Customer, Your HSBC account shows suspicious activity. Login here: http://hsbc-secure.scam.com",
    explanation: "Common banking scam using fear and urgency to steal login details"
  },
  {
    type: "Lottery Scam",
    content: "CONGRATULATIONS! You've won £1,000,000 in the UK National Lottery. Send your details to claim.",
    explanation: "Classic lottery scam requesting personal information for nonexistent prizes"
  }
];

export async function analyzeMessage(message: string): Promise<ThreatAnalysis> {
  let threatScore = 0;
  const detectedIndicators: string[] = [];
  const matchedExamples: string[] = [];
  const similarScams: string[] = [];

  // Check against phishing patterns
  phishingPatterns.forEach(({ pattern, indicator, weight, examples }) => {
    if (pattern.test(message)) {
      threatScore += weight;
      detectedIndicators.push(indicator);
      if (examples) {
        matchedExamples.push(...examples);
      }
    }
  });

  // Check against malware patterns
  malwarePatterns.forEach(({ pattern, indicator, weight, examples }) => {
    if (pattern.test(message)) {
      threatScore += weight;
      detectedIndicators.push(indicator);
      if (examples) {
        matchedExamples.push(...examples);
      }
    }
  });

  // Find similar real-world scams
  realWorldExamples.forEach(example => {
    if (message.toLowerCase().includes(example.type.toLowerCase()) || 
        example.content.toLowerCase().includes(message.toLowerCase())) {
      similarScams.push(`${example.type}: ${example.explanation}`);
    }
  });

  // Determine threat level and response
  let threatLevel: 'safe' | 'suspicious' | 'dangerous';
  let response: string;

  if (threatScore >= 2) {
    threatLevel = 'dangerous';
    response = `⚠️ HIGH RISK DETECTED! This message shows multiple signs of being a scam:

${detectedIndicators.map(i => `• ${i}`).join('\n')}

🚫 DO NOT:
• Click any links
• Download attachments
• Share personal information
• Send money or cryptocurrency

✅ INSTEAD:
• Delete this message
• Report to your IT department
• Block the sender

${similarScams.length > 0 ? '\n🔍 Similar Known Scams:\n' + similarScams.join('\n') : ''}`;
  } else if (threatScore >= 0.6) {
    threatLevel = 'suspicious';
    response = `⚠️ CAUTION! This message contains suspicious elements:

${detectedIndicators.map(i => `• ${i}`).join('\n')}

Similar scam examples:
${matchedExamples.slice(0, 2).map(e => `• ${e}`).join('\n')}

Always verify the sender through a different communication channel before taking any action.`;
  } else {
    threatLevel = 'safe';
    response = "✅ This message appears relatively safe, but always remain vigilant. If you're unsure, verify the sender through other means.";
  }

  return {
    threatLevel,
    threatScore,
    indicators: detectedIndicators,
    response,
    examples: matchedExamples,
    similarScams
  };
}