import { ReactElement, useEffect } from 'react';
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom';
import '../../styles/_app.scss';
import { useServiceWorker } from '../../model';
import { Auth } from '../Auth';
import { StoreProvider } from '../StoreProvider';
import { routes } from '@/app/model/constants/routes';

const renderRoutes = (routes: RouteObject[]): JSX.Element[] => {
  return routes.map((route) => {
    // Проверяем наличие вложенных маршрутов
    if (route.children) {
      return (
        <Route key={route.path as string} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return <Route key={route.path as string} path={route.path} element={route.element} />;
  });
};

export const Application = (): ReactElement => {
  useServiceWorker();

  // @TODO Это пример работы с env-переменными для общения с сервером
  // Удалить после того, как будет реализовано апи форума и темизации
  // docker-compose установит связь между контейнерами. Контейнеры смогут общаться между собой по имени контейнера. Поэтому используем API_SERVER_HOST, который также является именем контейнера для контейнера с апи-сервером
  useEffect(() => {
    if (typeof fetch === 'function') {
      const host = __API_SERVER_HOST__;
      const port = __API_SERVER_PORT__;

      fetch?.(`${host}:${port}/api`)
        .then((res) => res.json())
        .then(console.log);
    }
  }, []);

  return (
    <StoreProvider>
      <Auth>
        <BrowserRouter>
          <Routes>{renderRoutes(routes)}</Routes>
        </BrowserRouter>
      </Auth>
    </StoreProvider>
  );
};
