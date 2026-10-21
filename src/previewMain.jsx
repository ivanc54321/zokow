import React from 'react';
import ReactDOM from 'react-dom/client';
import VibePreviewApp from './VibePreviewApp.jsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <VibePreviewApp />
    </React.StrictMode>
  );
}
