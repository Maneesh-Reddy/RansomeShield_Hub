import React from 'react';
import { AlertTriangle, TrendingUp, Shield, AlertCircle } from 'lucide-react';

export default function ThreatDashboard() {
  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Real-Time Threat Intelligence
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Monitor and analyze emerging ransomware threats to stay one step ahead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <span className="text-red-500 text-sm font-semibold">High Risk</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Active Threats</h3>
            <p className="text-3xl font-bold text-white">147</p>
            <p className="text-gray-400 text-sm mt-2">+12 in last 24h</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-green-500 text-sm font-semibold">Trending</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Attack Vectors</h3>
            <p className="text-3xl font-bold text-white">23</p>
            <p className="text-gray-400 text-sm mt-2">Most common: Phishing</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-blue-500 text-sm font-semibold">Protected</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Organizations</h3>
            <p className="text-3xl font-bold text-white">2.4K</p>
            <p className="text-gray-400 text-sm mt-2">98% success rate</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              <span className="text-yellow-500 text-sm font-semibold">Alert Level</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Global Status</h3>
            <p className="text-3xl font-bold text-white">Elevated</p>
            <p className="text-gray-400 text-sm mt-2">Updated 5m ago</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Recent Threats</h3>
          <div className="space-y-4">
            {[
              {
                name: 'BlackCat Ransomware',
                type: 'Ransomware',
                severity: 'Critical',
                time: '2h ago'
              },
              {
                name: 'Emotet Campaign',
                type: 'Malware',
                severity: 'High',
                time: '4h ago'
              },
              {
                name: 'LockBit 3.0',
                type: 'Ransomware',
                severity: 'Critical',
                time: '6h ago'
              }
            ].map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-semibold">{threat.name}</h4>
                  <p className="text-gray-400 text-sm">{threat.type}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    threat.severity === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {threat.severity}
                  </span>
                  <p className="text-gray-400 text-sm mt-1">{threat.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}