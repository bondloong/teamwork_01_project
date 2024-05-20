import { ReactElement } from 'react';
import classes from './AuthPage.module.scss';
import { AuthForm } from '@/widgets/AuthForm';
import { useAuthContext } from '@/shared/contexts';
import { Navigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';

export const AuthPage = (): ReactElement => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to={EAppRoutes.Main} />;
  }

  return (
    <div className={classes.wrapper}>
      <AuthForm />
    </div>
  );
};
