import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

// Render the React app into the #root element
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found! Ensure there's a <div id='root'></div> in your HTML.");
}
