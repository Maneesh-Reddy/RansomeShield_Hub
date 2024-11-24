import React from 'react';
import { Shield, AlertTriangle, Lock, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-indigo-600 to-purple-700 text-white py-20">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">
            Protect Your Digital Assets from Ransomware
          </h1>
          <p className="text-xl mb-8 text-indigo-100">
            Interactive training, real-time threat intelligence, and powerful defense tools
            to keep your organization safe from ransomware attacks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition">
              Start Training
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              View Threats
            </button>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <AlertTriangle className="h-8 w-8 mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">Threat Detection</h3>
            <p className="text-indigo-100">Real-time monitoring and alerts for emerging ransomware threats.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <Lock className="h-8 w-8 mb-4 text-green-300" />
            <h3 className="text-xl font-semibold mb-2">Defense Tools</h3>
            <p className="text-indigo-100">Comprehensive security checklists and response guides.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <Activity className="h-8 w-8 mb-4 text-pink-300" />
            <h3 className="text-xl font-semibold mb-2">Live Simulation</h3>
            <p className="text-indigo-100">Practice responding to attacks in a safe environment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}