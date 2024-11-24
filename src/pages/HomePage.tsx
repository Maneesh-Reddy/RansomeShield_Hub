import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
          <div className="flex justify-center gap-4">
            <Link
              to="/toolkit"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Access Defense Toolkit
            </Link>
            <Link
              to="/simulate"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition border border-indigo-600"
            >
              Try Simulation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}