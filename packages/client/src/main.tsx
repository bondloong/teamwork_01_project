import React from 'react';
import ReactDOM from 'react-dom/client';
import { Application } from '@/app';
import './app/styles/_reset.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
