import tailwindcss from '@tailwindcss/vite';
import { Unhead } from '@unhead/react/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    clearScreen: false,
    server: {
      port: 3000,
      strictPort: true,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      host: host || false,
      hmr: host
        ? {
            protocol: 'ws',
            host,
            port: 3001,
          }
        : undefined,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      react(),
      tailwindcss(),
      Unhead(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint',
          useFlatConfig: true,
          dev: {
            logLevel: ['error'],
          },
        },
      }),
    ],
  };
});
