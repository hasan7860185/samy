import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { db } from './services/db/instance';

async function init() {
  try {
    // Initialize database before rendering
    await db.initialize();
    
    const root = createRoot(document.getElementById('root')!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'padding: 20px; color: red; text-align: center;';
    errorDiv.textContent = 'حدث خطأ أثناء تهيئة التطبيق. يرجى تحديث الصفحة.';
    document.body.appendChild(errorDiv);
  }
}

init();