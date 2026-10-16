import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsInlineLimit: 10000000, cssCodeSplit: false, modulePreload: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } } }
});
