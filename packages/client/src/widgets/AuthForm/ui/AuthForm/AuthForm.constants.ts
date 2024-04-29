import { FC } from 'react';
import { TFormType } from './AuthForm.interfaces';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { ICommonFormProps } from '../../model';

export const formsMap: Record<TFormType, FC<ICommonFormProps>> = {
  login: Login,
  signup: Signup,
} as const;

export const TEXTS = {
  buttons: {
    signup: 'Sign up',
    login: 'Log in',
  },
  logInTitle: 'Log In',
  signUpTitle: 'Sign Up',
};
