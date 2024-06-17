import { ReactElement } from 'react';
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
