"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const vite_1 = require("vite");
const port = process.env.PORT || 80;
const clientPath = path_1.default.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
const createServer = async () => {
    const app = (0, express_1.default)();
    const vite = await (0, vite_1.createServer)({
        server: { middlewareMode: true },
        root: clientPath,
        appType: 'custom',
    });
    app.use(vite.middlewares);
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            // Получаем файл client/index.html который мы правили ранее
            let template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
            // Применяем встроенные HTML-преобразования vite и плагинов
            template = await vite.transformIndexHtml(url, template);
            // Загружаем модуль клиента, который писали выше,
            // он будет рендерить HTML-код
            const { render } = await vite.ssrLoadModule(path_1.default.join(clientPath, 'src/entry-server.tsx'));
            // Получаем HTML-строку из JSX
            const appHtml = await render();
            // Заменяем комментарий на сгенерированную HTML-строку
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            // Завершаем запрос и отдаём HTML-страницу
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`Client is listening on port: ${port}`);
    });
};
createServer();
