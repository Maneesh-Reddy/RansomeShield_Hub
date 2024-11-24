interface ChatResponse {
  keywords: string[];
  response: string;
}

export const followUpResponses: ChatResponse[] = [
  {
    keywords: ['what', 'should', 'do', 'steps', 'guide', 'help'],
    response: `Here are the immediate steps you should take:

1. 🚫 Don't interact with the suspicious content
   • Don't click any links
   • Don't download attachments
   • Don't reply to the sender

2. 📝 Document the incident
   • Take screenshots
   • Note the sender's details
   • Save email headers if possible

3. 🚨 Report the incident
   • Forward to your IT security team
   • Report to abuse@[domain]
   • Use your email client's "Report Phishing" feature

4. 🔒 Protect your accounts
   • Change passwords if you entered any
   • Enable 2FA where possible
   • Monitor your accounts for suspicious activity

Need more specific guidance? Just ask!`
  },
  {
    keywords: ['how', 'identify', 'spot', 'recognize', 'tell'],
    response: `Here's how to identify suspicious messages:

🚩 Common Red Flags:
• Urgent or threatening language
• Generic greetings ("Dear Sir/Madam")
• Poor grammar or spelling
• Requests for sensitive information
• Suspicious sender addresses
• Mismatched or fake URLs

💡 Pro Tips:
• Hover over links (don't click!) to preview URLs
• Check the sender's full email address
• Be wary of unexpected attachments
• Question any urgent payment requests

Want to learn about a specific red flag? Just ask!`
  },
  {
    keywords: ['report', 'where', 'who'],
    response: `Here's where you can report cyber threats:

1. 🏢 Internal Reporting
   • Your IT Department
   • Security Team
   • Direct Manager

2. 🌐 External Reporting
   • Anti-Phishing Working Group (APWG)
   • FBI's Internet Crime Complaint Center (IC3)
   • Your country's cyber security center

3. 📧 Email Providers
   • Gmail: "Report Phishing"
   • Outlook: "Report Junk"
   • Yahoo: "Report Spam"

Need specific reporting instructions? Let me know!`
  },
  {
    keywords: ['prevent', 'protect', 'secure', 'safety'],
    response: `Here's how to protect yourself from cyber attacks:

🛡️ Essential Security Measures:
1. Use strong, unique passwords
2. Enable Two-Factor Authentication (2FA)
3. Keep software updated
4. Use antivirus software
5. Backup important data

🎓 Stay Educated:
• Take security awareness training
• Keep up with latest scam tactics
• Verify unexpected requests
• Use password managers

Want specific security recommendations? Ask away!`
  }
];

export function getContextualResponse(userMessage: string): string | null {
  const message = userMessage.toLowerCase();
  
  for (const response of followUpResponses) {
    if (response.keywords.some(keyword => message.includes(keyword))) {
      return response.response;
    }
  }
  
  return null;
}