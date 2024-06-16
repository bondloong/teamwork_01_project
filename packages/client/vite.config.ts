import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve, join } from 'path';
dotenv.config();

const SERVICE_WORKER = 'service-worker';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __API_SERVER_PORT__: JSON.stringify(process.env.API_SERVER_PORT),
    __API_SERVER_HOST__: JSON.stringify(process.env.API_SERVER_HOST),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:8]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/app/styles/index.scss";',
      },
    },
  },
  build: {
    outDir: join(__dirname, 'dist/client'),
    rollupOptions: {
      input: {
        app: './index.html',
        // Т.к. sw.ts нигде не импртируется, он не попадает в итоговый бандл. Добавляем точку входа
        [SERVICE_WORKER]: './sw.ts',
      },
      output: {
        entryFileNames: (chunk) => {
          // Для чанка с именем 'service-worker' сохраняем исходной имя файла. Остальные чанки складываем в assests, добавляя хэш к имени
          switch (chunk.name) {
            case SERVICE_WORKER:
            case 'entry-server':
              return '[name].js';

            default:
              return 'assets/[name]-[hash].js';
          }
        },
      },
    },
  },
  ssr: {
    // собирать бандл для сервера в формате cjs, который запустится в Node.js среде.
    format: 'cjs',
  },
});
