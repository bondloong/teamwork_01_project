import dotenv from 'dotenv';
import express, { Request as ExpressRequest } from 'express';
import path from 'path';

import fs from 'fs/promises';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import serialize from 'serialize-javascript';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  dotenv.config({ path: path.join(__dirname, '..', '.env.dev') });
} else {
  dotenv.config();
}

// @TODO удалаить
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.CLIENT_PORT', process.env.CLIENT_PORT);
console.log('process.env.API_SERVER_HOST', process.env.API_SERVER_HOST);
console.log('process.env.API_SERVER_PORT', process.env.API_SERVER_PORT);

const port = process.env.CLIENT_PORT;
// Путь к корневой папке
const clientPath = path.join(__dirname, '..');

const createServer = async (): Promise<void> => {
  const app = express();

  let vite: ViteDevServer | undefined;

  // Создавать vite-dev-сервер есть смысл только в дев-режиме, чтобы он разадавал файлы из исходников
  // В production-режиме просто раздаем статику
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    });

    // vite.middlewares — это функция промежуточной обработки запроса. В нашем случае мидлвары от Vite будут заниматься самостоятельной раздачей статики (CSS и картинки).
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }));
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    // Пробуем приложение отрендерить в строку и вернуть ее в ответе
    try {
      // Объявим тип метода render
      let render: (req: ExpressRequest) => Promise<{ html: string; initialState: unknown }>;
      let template: string;

      // Есди в dev-режиме (переменная vite определена)
      if (vite) {
        // Получаем файл client/index.html который мы правили ранее
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template);

        // Загружаем модуль клиента (точка входа для SSR)
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render;
      } else {
        // Если в prod-режиме

        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8');

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(clientPath, 'dist/server/entry-server.js');

        // Импортируем этот модуль
        render = (await import(pathToServer)).render;
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState } = await render(req);

      // Заменяем комментарий на сгенерированную HTML-строку
      // глобально создаётся объект со стейтом для приложения.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true,
        })}</script>`
      );

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error as Error);
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
};

createServer();
