import { Request as ExpressRequest } from 'express';

// Функция createUrl создает URL объект на основе запроса Express
export const createUrl = (req: ExpressRequest): URL => {
  // Формируем origin (протокол + хост)
  const origin = `${req.protocol}://${req.get('host')}`;

  // Возвращаем новый URL объект, используя оригинальный URL запроса или его URL
  return new URL(req.originalUrl || req.url, origin);
};

// Функция createFetchRequest создает объект Request для использования с fetch API на основе запроса Express
export const createFetchRequest = (req: ExpressRequest): Request => {
  // Создаем URL объекта на основе запроса
  const url = createUrl(req);

  // Создаем контроллер для возможности прерывания запроса
  const controller = new AbortController();
  // Прерываем запрос, если соединение закрыто
  req.on('close', () => controller.abort());

  // Создаем объект Headers для хранения заголовков
  const headers = new Headers();

  // Переносим все заголовки из Express запроса в Headers
  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      // Если значение заголовка - массив, добавляем каждый элемент массива в заголовки
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        // Иначе просто устанавливаем заголовок
        headers.set(key, values);
      }
    }
  }

  // Инициализация параметров запроса
  const init: {
    method: string;
    headers: Headers;
    signal: AbortSignal;
    body?: never;
  } = {
    method: req.method, // Метод запроса (GET, POST и т.д.)
    headers, // Заголовки
    signal: controller.signal, // Сигнал для прерывания запроса
  };

  // Если метод запроса не GET и не HEAD, добавляем тело запроса
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  // Возвращаем новый объект Request с URL и параметрами
  return new Request(url.href, init);
};
