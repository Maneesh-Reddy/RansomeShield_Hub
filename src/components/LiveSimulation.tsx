import React, { useState } from 'react';
import { AlertTriangle, Mail, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';

const PHISHING_SIGNS = [
  { id: 1, text: 'Urgent action required', suspicious: true },
  { id: 2, text: 'Unusual sender address', suspicious: true },
  { id: 3, text: 'Grammatical errors', suspicious: true },
  { id: 4, text: 'Company logo present', suspicious: false },
  { id: 5, text: 'Threatening language', suspicious: true },
];

export default function LiveSimulation() {
  const { addAlert } = useStore();
  const [selectedSigns, setSelectedSigns] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSignClick = (id: number) => {
    setSelectedSigns((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const correctSigns = PHISHING_SIGNS.filter((sign) => sign.suspicious).map(
      (sign) => sign.id
    );
    const score = selectedSigns.filter((id) => correctSigns.includes(id)).length;
    const total = correctSigns.length;

    setShowFeedback(true);
    
    if (score === total) {
      toast.success('Perfect! You identified all phishing signs correctly!');
      addAlert({
        title: 'Phishing simulation completed successfully',
        severity: 'low',
      });
    } else {
      toast.error(`You identified ${score} out of ${total} phishing signs correctly.`);
    }
  };

  return (
    <div className="bg-gray-50 py-20" id="simulate">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Live Simulation
            </h2>
            <p className="text-xl text-gray-600">
              Practice identifying phishing attempts in a safe environment
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Mail className="h-6 w-6 text-gray-400 mt-1" />
              <div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">From:</span>
                  <span className="ml-2">security-alert@bankingsecure.net</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Subject:</span>
                  <span className="ml-2 font-semibold">
                    URGENT: Your account access will be terminated
                  </span>
                </div>
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <p className="mb-4">
                    Dear Valued Customer,
                  </p>
                  <p className="mb-4">
                    We have detected suspicious activity on your account. Your account
                    access will be terminated within 24 hours unless you verify your
                    identity immediately.
                  </p>
                  <p className="mb-4">
                    Click here to verify your identity and prevent account
                    termination: <span className="text-blue-600 underline cursor-pointer">
                    https://secure-banking-verify.net/auth</span>
                  </p>
                  <p>
                    Best regards,<br />
                    Security Team
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Select all suspicious signs in this email:
              </h3>
              <div className="space-y-3">
                {PHISHING_SIGNS.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => handleSignClick(sign.id)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedSigns.includes(sign.id)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    {sign.text}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Analysis
            </button>

            {showFeedback && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Analysis Feedback</span>
                </div>
                <p className="text-yellow-800">
                  Key signs of a phishing email in this example:
                </p>
                <ul className="mt-2 space-y-1 text-yellow-800">
                  <li>• Urgent action required to create pressure</li>
                  <li>• Suspicious sender domain (not a real bank domain)</li>
                  <li>• Threatening language about account termination</li>
                  <li>• Suspicious link URL different from legitimate bank URLs</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}