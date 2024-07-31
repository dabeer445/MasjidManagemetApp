// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <NextUIProvider>
        <main className="purple-dark text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}