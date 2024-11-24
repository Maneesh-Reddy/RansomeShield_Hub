import React from 'react';
import { BookOpen, Shield, Database, PlayCircle } from 'lucide-react';

export default function Features() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Protection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to protect your organization
            from ransomware threats.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
            <BookOpen className="h-12 w-12 text-indigo-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Interactive Learning</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Phishing simulations</li>
              <li>• Security best practices</li>
              <li>• Gamified training</li>
              <li>• Progress tracking</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
            <Shield className="h-12 w-12 text-indigo-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Defense Toolkit</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Security checklists</li>
              <li>• Backup strategies</li>
              <li>• Response guides</li>
              <li>• Risk assessment</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
            <Database className="h-12 w-12 text-indigo-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Threat Intelligence</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Real-time updates</li>
              <li>• CVE integration</li>
              <li>• Threat analysis</li>
              <li>• Risk scoring</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
            <PlayCircle className="h-12 w-12 text-indigo-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Live Simulation</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Attack scenarios</li>
              <li>• Response practice</li>
              <li>• Safe environment</li>
              <li>• Instant feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}