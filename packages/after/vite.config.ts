import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

// https://vite.dev/config/

const viteConfig = defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ...(process.env.STORYBOOK !== 'true' && {
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: id => {
            if (id.includes('.stories.') || id.includes('storybook')) {
              return;
            }
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('@radix-ui')) {
                return 'radix-ui';
              }
              if (
                id.includes('react-hook-form') ||
                id.includes('@hookform') ||
                id.includes('zod')
              ) {
                return 'form-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'lucide-icons';
              }
              if (
                id.includes('class-variance-authority') ||
                id.includes('clsx') ||
                id.includes('tailwind-merge')
              ) {
                return 'utils';
              }
              return 'vendor';
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  }),
});

export default mergeConfig(
  viteConfig,
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  })
);
