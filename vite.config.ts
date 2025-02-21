import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        format: 'iife',
        manualChunks: () => {
          return 'index';
        },
      },
    },
  },

  plugins: [react(), tailwindcss()],
});
