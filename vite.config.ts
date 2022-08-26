import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/react-clock/',
  plugins: [react(), uno(), tsconfigPaths()],
  optimizeDeps: {
    disabled: false,
  },
  build: {
    commonjsOptions: { include: [] },
  },
});
