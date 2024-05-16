import { ReactElement } from 'react';
import { IBaseLayoutProps } from './BaseLayout.interfaces';
import classes from './BaseLayout.module.scss';
import { MainNavigation } from '@/widgets/MainNavigation';
import { LogOut } from '@/features/LogOut';
import classNames from 'classnames';

export const BaseLayout = ({ children, isFullscreen }: IBaseLayoutProps): ReactElement => {
  const headerClasses = classNames({
    [classes.header]: true,
    [classes.fullscreenHeader]: isFullscreen,
  });

  const mainClasses = classNames({
    [classes.main]: true,
    [classes.fullscreenMain]: isFullscreen,
  });

  return (
    <div className={classes.layout}>
      <header className={headerClasses}>
        <MainNavigation />
        <LogOut />
      </header>

      <main className={mainClasses}>{children}</main>
    </div>
  );
};
