import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar.jsx';
import ImageUploader from './components/ImageUploader.jsx';
import History from './components/History.jsx';
import FluidBackground from './components/FluidBackground.jsx';

import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <div className="app-container" data-theme={theme}>
        {/* Animated background stays behind everything */}
        <FluidBackground />

        {/* Main app layout */}
        <div className="app-layout">
          {/* Toast notifications */}
          <Toaster position="top-center" />

          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <main className="main-content">
            {/* Theme toggle button */}
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<ImageUploader />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
