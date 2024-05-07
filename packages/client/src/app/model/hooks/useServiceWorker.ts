import { useEffect } from 'react';
import { startServiceWorker } from '../utils';

export const useServiceWorker = (): void => {
  useEffect(() => {
    window.addEventListener('load', startServiceWorker);

    return () => {
      window.removeEventListener('load', startServiceWorker);
    };
  }, []);
};
