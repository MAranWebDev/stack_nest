import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    resolve: { alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }] },
    server: { port: +process.env.VITE_CLIENT_PORT! || 5173 },
  });
};
