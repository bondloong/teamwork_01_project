import { ReactElement } from 'react';
import classes from './AuthPage.module.scss';
import { AuthForm } from '@/widgets/AuthForm';

export const AuthPage = (): ReactElement => {
  return (
    <div className={classes.wrapper}>
      <AuthForm />
    </div>
  );
};
