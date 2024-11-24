import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, MessageSquare } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Defense Toolkit', path: '/toolkit' },
    { name: 'Live Simulation', path: '/simulate' },
    { name: 'Threats', path: '/threats' },
    { name: 'Security Chat', path: '/chat', icon: MessageSquare },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">RansomShield Hub</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-indigo-200 transition flex items-center gap-2 ${
                  location.pathname === item.path ? 'text-indigo-200' : ''
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block hover:text-indigo-200 transition flex items-center gap-2 ${
                  location.pathname === item.path ? 'text-indigo-200' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}