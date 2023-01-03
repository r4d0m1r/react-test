import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/react-clock/',
  build: { commonjsOptions: { include: [] } },
  optimizeDeps: { disabled: false },
  plugins: [react(), uno(), tsconfigPaths()],
});
