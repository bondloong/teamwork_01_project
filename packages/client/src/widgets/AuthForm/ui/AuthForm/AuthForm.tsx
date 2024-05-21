import { ReactElement, useState } from 'react';
import { TFormType } from './AuthForm.interfaces';
import { TEXTS, formsMap } from './AuthForm.constants';
import { Button } from 'antd';
import classes from './AuthForm.module.scss';
import { Loader } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { getIsUserLoading } from '@/entities/User';

export const AuthForm = (): ReactElement => {
  const [formType, setFormType] = useState<TFormType>('login');

  const isLoading = useSelector(getIsUserLoading);

  const Form = formsMap[formType];

  const toggleFormType = (): void => {
    setFormType((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  const isLoginFormSelected = formType === 'login';

  const title = isLoginFormSelected ? TEXTS.logInTitle : TEXTS.signUpTitle;

  const buttonText = isLoginFormSelected ? TEXTS.buttons.signup : TEXTS.buttons.login;

  const toggleFormButton = (
    <Button onClick={toggleFormType} htmlType="button">
      {buttonText}
    </Button>
  );

  return (
    <>
      <h2 className={classes.heading}>{title}</h2>

      <Form toggleFormButton={toggleFormButton} />

      {isLoading && <Loader mode="dark" />}
    </>
  );
};
