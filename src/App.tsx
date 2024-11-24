import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DefenseToolkitPage from './pages/DefenseToolkitPage';
import LiveSimulationPage from './pages/LiveSimulationPage';
import ThreatDashboardPage from './pages/ThreatDashboardPage';
import SecurityChatPage from './pages/SecurityChatPage';
import FloatingChatButton from './components/FloatingChatButton';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="toolkit" element={<DefenseToolkitPage />} />
              <Route path="simulate" element={<LiveSimulationPage />} />
              <Route path="threats" element={<ThreatDashboardPage />} />
              <Route path="chat" element={<SecurityChatPage />} />
            </Route>
          </Routes>
          <FloatingChatButton />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;