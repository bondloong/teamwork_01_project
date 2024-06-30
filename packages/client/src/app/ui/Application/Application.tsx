import { ReactElement } from 'react';
import '../../styles/_app.scss';
import { useServiceWorker } from '../../model';
import { Auth } from '../Auth';
import { IApplicationProps } from './Application.interfaces';

export const Application = ({ children }: IApplicationProps): ReactElement => {
  useServiceWorker();

  return <Auth>{children}</Auth>;
};
