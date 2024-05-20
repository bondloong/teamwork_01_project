import { ReactElement } from 'react';
import { IBaseLayoutProps } from './BaseLayout.interfaces';
import classes from './BaseLayout.module.scss';
import { MainNavigation } from '@/widgets/MainNavigation';
import { LogOut } from '@/features/LogOut';
import { LogIn } from '@/features/LogIn';
import { useAuthContext } from '@/shared/contexts';

export const BaseLayout = ({ children }: IBaseLayoutProps): ReactElement => {
  const { user } = useAuthContext();

  return (
    <div>
      <header className={classes.header}>
        <MainNavigation />

        {user ? <LogOut /> : <LogIn />}
      </header>

      <main className={classes.main}>{children}</main>
    </div>
  );
};
