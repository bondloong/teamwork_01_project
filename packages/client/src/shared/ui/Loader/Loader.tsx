import { ReactElement } from 'react';
import { spinner } from './assets';

import classes from './Loader.module.scss';
import { ILoaderProps } from './Loader.interfaces';
import { classNames } from '@/shared/utils';

export const Loader = ({ mode }: ILoaderProps): ReactElement => {
  const wrapperClasses = classNames({
    [classes.wrapper]: true,
    [classes.wrapper__dark]: mode === 'dark',
  });

  return (
    <div className={wrapperClasses}>
      <img src={spinner} alt="Loading..." />
    </div>
  );
};
