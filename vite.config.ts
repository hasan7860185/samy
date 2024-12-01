import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'charts': ['recharts'],
            'ui': ['lucide-react'],
            'db': ['@supabase/supabase-js', 'dexie', 'dexie-react-hooks'],
          }
        }
      }
    },
    optimizeDeps: {
      include: ['@supabase/supabase-js', 'bcryptjs']
    },
    define: {
      'process.env': {}
    }
  };
});