import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/_reset.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { createReduxStore } from './app/model';
import { Provider } from 'react-redux';

const router = createBrowserRouter(routes);

const store = createReduxStore();

// Восстанавливаем состояние, навешиваем обработчики
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
