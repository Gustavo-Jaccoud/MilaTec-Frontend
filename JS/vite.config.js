import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/request-pin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/auth/verify-pin': {
        target: 'http://localhost:3000',
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
