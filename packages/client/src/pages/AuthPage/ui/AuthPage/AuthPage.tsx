import { ReactElement } from 'react';
import classes from './AuthPage.module.scss';
import { AuthForm } from '@/widgets/AuthForm';
import { Navigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/entities/User';

export const AuthPage = (): ReactElement => {
  const isAuth = useSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={EAppRoutes.Main} />;
  }

  return (
    <div className={classes.wrapper}>
      <AuthForm />
    </div>
  );
};
