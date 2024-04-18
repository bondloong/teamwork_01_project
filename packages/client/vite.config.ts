import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
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
    // @TODO удалить или использовать в дальнейшем
    // Если нао будет добавить глобальные переменные SASS
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: '@import "./src/app/styles/index.scss";',
    //   },
    // },
  },
});
