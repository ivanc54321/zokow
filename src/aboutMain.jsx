import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AboutUsPage from './components/AboutUsPage.jsx';

function AboutStandaloneApp() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('zokal_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('zokal_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AboutUsPage 
      onBackToDirectory={() => {
        window.location.href = '/';
      }}
      onOpenSubmit={() => {
        window.location.href = '/?action=submit';
      }}
      onOpenVenue={() => {
        window.location.href = '/';
      }}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutStandaloneApp />
  </StrictMode>
);
