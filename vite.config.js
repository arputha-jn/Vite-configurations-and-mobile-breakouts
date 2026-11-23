import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or your framework plugin
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // 1. Absolute Imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // 2. Compile & Environment Configurations
  define: {
    __APP_ENV__: JSON.stringify(mode),
  },
  server: {
    port: 3000,
    open: true,
  },

  // 3. Build Optimization & Asset Processing
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB as base64
    sourcemap: mode === 'development',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
}));
