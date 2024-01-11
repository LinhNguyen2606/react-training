import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react(), tsconfigPaths(), EnvironmentPlugin('all', { prefix: 'REACT_' })],
  server: {
    port: 5173,
  },
  publicDir: 'src/assets',
  // Config for load variable css first
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/styles/index.scss';",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
