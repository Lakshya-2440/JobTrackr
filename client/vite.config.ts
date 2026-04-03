import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const port = env.PORT || '5000';

  return {
    plugins: [react()],
    envDir: '..',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            state: ['@tanstack/react-query', 'axios', 'zustand'],
            forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
            charts: ['recharts'],
            board: ['@hello-pangea/dnd'],
            icons: ['lucide-react'],
            dates: ['date-fns'],
            feedback: ['react-hot-toast', 'clsx', 'tailwind-merge']
          }
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${port}`,
          changeOrigin: true
        }
      }
    }
  };
});
