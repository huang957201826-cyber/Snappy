import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const pagesBase = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base: pagesBase,
  plugins: [react()],
  clearScreen: false,
  server: {
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      input: {
        index: 'index.html',
        overlay: 'overlay.html',
        float: 'float.html',
        notes: 'notes.html',
        tooltip: 'tooltip.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
    exclude: ['**/node_modules/**', '**/dist/**', 'account-mvp/tests/**'],
  },
});
