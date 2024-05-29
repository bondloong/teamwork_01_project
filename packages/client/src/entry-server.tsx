import ReactDOM from 'react-dom/server';
import { Application } from '@/app';
import './app/styles/_reset.scss';
import './app/styles/_app.scss';

// Точка входа для генерации html на сервере
export const render = (): string => ReactDOM.renderToString(<Application />);
