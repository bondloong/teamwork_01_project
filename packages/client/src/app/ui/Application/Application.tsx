import { ReactElement, useEffect } from 'react';
import '../../styles/_app.scss';
import { useServiceWorker } from '../../model';
import { Auth } from '../Auth';
import { IApplicationProps } from './Application.interfaces';

export const Application = ({ children }: IApplicationProps): ReactElement => {
  useServiceWorker();

  // @TODO Это пример работы с env-переменными для общения с сервером
  // Удалить после того, как будет реализовано апи форума и темизации
  // docker-compose установит связь между контейнерами. Контейнеры смогут общаться между собой по имени контейнера. Поэтому используем API_SERVER_HOST, который также является именем контейнера для контейнера с апи-сервером
  useEffect(() => {
    if (typeof fetch === 'function') {
      const host = __API_SERVER_HOST__;
      const port = __API_SERVER_PORT__;

      console.log('__API_SERVER_HOST__', __API_SERVER_HOST__);
      console.log('__API_SERVER_PORT__', __API_SERVER_PORT__);
      console.log('${host}:${port}/api', `${host}:${port}/api`);

      fetch?.(`${host}:${port}/api`)
        .then((res) => res.json())
        .then(console.log)
        .catch((error) => console.warn('Error was catched: ', error.message));
    }
  }, []);

  return <Auth>{children}</Auth>;
};
