import React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

// Polyfill para garantir suporte ao Zustand v5 no React 17
if (!(React as any).useSyncExternalStore) {
  (React as any).useSyncExternalStore = useSyncExternalStore;
}

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
