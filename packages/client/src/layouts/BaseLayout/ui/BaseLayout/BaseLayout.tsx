import { ReactElement } from 'react';
import { IBaseLayoutProps } from './BaseLayout.interfaces';
import classes from './BaseLayout.module.scss';
import { MainNavigation } from '@/widgets/MainNavigation';
import { LogOut } from '@/features/LogOut';

export const BaseLayout = ({ children }: IBaseLayoutProps): ReactElement => {
  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <MainNavigation />

        <LogOut />
      </header>

      <main className={classes.main}>{children}</main>
    </div>
  );
};
