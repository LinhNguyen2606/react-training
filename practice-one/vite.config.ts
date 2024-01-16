import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});
