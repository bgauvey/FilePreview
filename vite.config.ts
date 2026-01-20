import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-pdf': ['pdfjs-dist'],
          'vendor-office': ['mammoth', 'xlsx'],
          'vendor-markdown': ['marked', 'prismjs'],
        },
      },
      onwarn(warning, warn) {
        // Suppress eval warnings from pdfjs-dist as it's a known issue
        if (warning.code === 'EVAL' && warning.id?.includes('pdfjs-dist')) {
          return;
        }
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
  },
})
