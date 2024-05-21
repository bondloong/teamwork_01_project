import { ReactElement } from 'react';
import { IBaseLayoutProps } from './BaseLayout.interfaces';
import classes from './BaseLayout.module.scss';
import { MainNavigation } from '@/widgets/MainNavigation';
import { LogOut } from '@/features/LogOut';
import { LogIn } from '@/features/LogIn';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/entities/User';

export const BaseLayout = ({ children }: IBaseLayoutProps): ReactElement => {
  const isAuth = useSelector(getIsAuth);

  return (
    <div>
      <header className={classes.header}>
        <MainNavigation />

        {isAuth ? <LogOut /> : <LogIn />}
      </header>

      <main className={classes.main}>{children}</main>
    </div>
  );
};
