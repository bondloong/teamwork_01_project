"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// Путь к корневой папке
const clientPath = path_1.default.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
const createServer = async () => {
    const app = (0, express_1.default)();
    let vite;
    // Создавать vite-dev-сервер есть смысл только в дев-режиме, чтобы он разадавал файлы из исходников
    // В production-режиме просто раздаем статику
    if (isDev) {
        vite = await (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: clientPath,
            appType: 'custom',
        });
        // vite.middlewares — это функция промежуточной обработки запроса. В нашем случае мидлвары от Vite будут заниматься самостоятельной раздачей статики (CSS и картинки).
        app.use(vite.middlewares);
    }
    else {
        app.use(express_1.default.static(path_1.default.join(clientPath, 'dist/client'), { index: false }));
    }
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        // Пробуем приложение отрендерить в строку и вернуть ее в ответе
        try {
            let render;
            let template;
            // Есди в dev-режиме (переменная vite определена)
            if (vite) {
                // Получаем файл client/index.html который мы правили ранее
                template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
                // Применяем встроенные HTML-преобразования vite и плагинов
                template = await vite.transformIndexHtml(url, template);
                // Загружаем модуль клиента, который писали выше,
                // он будет рендерить HTML-код
                render = (await vite.ssrLoadModule(path_1.default.join(clientPath, 'src/entry-server.tsx'))).render;
            }
            else {
                console.log("IT'S PRODUCTION!");
                // Если в prod-режиме
                template = await promises_1.default.readFile(path_1.default.join(clientPath, 'dist/client/index.html'), 'utf-8');
                // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
                const pathToServer = path_1.default.join(clientPath, 'dist/server/entry-server.js');
                // Импортируем этот модуль и вызываем с инишл стейтом
                render = (await Promise.resolve(`${pathToServer}`).then(s => __importStar(require(s)))).render;
            }
            // Получаем HTML-строку из JSX
            const appHtml = await render();
            // Заменяем комментарий на сгенерированную HTML-строку
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            // Завершаем запрос и отдаём HTML-страницу
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (error) {
            vite === null || vite === void 0 ? void 0 : vite.ssrFixStacktrace(error);
            next(error);
        }
    });
    app.listen(port, () => {
        console.log(`Client is listening on port: ${port}`);
    });
};
createServer();
