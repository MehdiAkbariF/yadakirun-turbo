import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig(async () => {
  const react = (await import('@vitejs/plugin-react')).default;
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        react: path.resolve(__dirname, '../../node_modules/react'),
        'react-dom': path.resolve(__dirname, '../../node_modules/react-dom')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      css: true
    }
  };
});
