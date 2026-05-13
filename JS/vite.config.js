import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const proxyApiTarget =
  process.env.VITE_PROXY_API_TARGET || 'http://localhost:3000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: proxyApiTarget,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.jsx'],
    setupFiles: './src/test/setup.js'
  }
});
