import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/accessibility.css';
import './styles/rtl.css';
import './i18n/i18n';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 