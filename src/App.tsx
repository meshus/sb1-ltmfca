import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Settings from './components/Settings';
import { useStore } from './store/useStore';

const queryClient = new QueryClient();

function App() {
  const { settings } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={`min-h-screen ${settings.darkMode ? 'dark' : ''}`}>
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
            <Navbar />
            <main className="pt-20 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;