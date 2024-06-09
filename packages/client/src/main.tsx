import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/_reset.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes);

// Восстанавливаем состояние, навешиваем обработчики
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
