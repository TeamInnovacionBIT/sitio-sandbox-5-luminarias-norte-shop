import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './app.css';

// Renderizado exclusivamente en el cliente.
createRoot(document.getElementById('raiz')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
