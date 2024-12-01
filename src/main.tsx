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
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          padding: 20px;
          direction: rtl;
        ">
          <h1 style="color: #e53e3e; margin-bottom: 16px;">عذراً، حدث خطأ</h1>
          <p style="color: #4a5568; margin-bottom: 24px;">
            حدث خطأ أثناء تهيئة التطبيق. يرجى المحاولة مرة أخرى لاحقاً.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background-color: #3182ce;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            "
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      `;
    }
  }
}

init();