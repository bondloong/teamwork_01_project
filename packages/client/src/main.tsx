import React from 'react';
import ReactDOM from 'react-dom/client';
import { Application } from '@/app';
import './app/styles/_reset.scss';

// Восстанавливаем состояние, навешиваем обработчики
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
