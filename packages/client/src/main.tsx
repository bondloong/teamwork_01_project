import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/_reset.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createReduxStore } from './app/model';
import { Provider } from 'react-redux';
import { routes } from './app/model/constants/routes';
import { Application } from './app';

const router = createBrowserRouter(routes);

const store = createReduxStore();

// Восстанавливаем состояние, навешиваем обработчики
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <Application>
        <RouterProvider router={router} />
      </Application>
    </Provider>
  </React.StrictMode>
);
