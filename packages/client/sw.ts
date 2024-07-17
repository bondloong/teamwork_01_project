/// <reference lib="WebWorker" />

export type {};
declare const self: ServiceWorkerGlobalScope;

const CACHE_TITLE = 'cache';
const CACHE_VERSION = 'v1';

const CACHE_NAME = `${CACHE_TITLE}-${CACHE_VERSION}`;

const URLS = ['/', '/game', '/auth', '/leaderboard', '/forum', '/profile', '/index.html'];

const ERROR_BLOCK = `
<div>
  Something went wrong. Please try again later.
</div>
`;

const fallbackResponse = new Response(ERROR_BLOCK, {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
  },
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      // пропустить ожидание активации
      // По-умолчанию, браузер будет использовать старый SW, пока открыта хоть одна старая вкладка. При выпуске критичных обновлений надо заставить браузер немедленно нечать использовать новую версию SW
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Браузер может останавливать сервис-воркеры, чтобы освободить ресурсы системы и улучшить производительность (например, когда они больше не нужны, например, когда пользователь закрывает вкладку или выходит из приложения).
  // Браузер не должен останавливать сервис-воркер, пока он не установит контроль над всеми клиентами страницы
  // Браузер должен убедиться, что сервис-воркер установил контроль над всеми клиентами страницы, прежде чем сервис-воркер будет останавлен
  event.waitUntil(
    // При установке нового сервис-воркера (новая версия) Вначале чистим кэш,
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Удаляем все кеши, кроме текущего
              return cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })
        );
      })
      // Потом говорим браузеру не останавливать сервис-воркер
      .then(() => self.clients.claim())
  );
});

// Событие fetch в сервис-воркере вызывается каждый раз, когда браузер пытается получить ресурс из сети, такой как HTML-страница, изображение, стиль, скрипт и т.д.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Если сеть доступна
  if (navigator.onLine) {
    // Запрос - это поток, который может существовать только в одном экземпляре, который будет передан или браузеру, или сервис-воркеру Поэтому создаем копию, с которой будет работать SW
    const requestCopy = event.request.clone();

    return fetch(requestCopy)
      .then((response) => {
        // response.type === 'basic' - проверяем, что ответ является простым ответом CORS
        if (response && response.status === 200 && response.type === 'basic') {
          //Кэш работает со своей копией ответа
          const responseCopy = response.clone();

          // Сохраняем ответ в кэш
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
        }

        // Возвращаем оригинальный ответ
        return response;
      })
      .catch(() => fallbackResponse);
    // Если браузер не в сети
  } else {
    // Если находим в кэше нужные файлы, то используем их, в противном случае возвращаем загулушку

    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return response || fallbackResponse;
        })
        .catch(() => fallbackResponse)
    );
  }
});
