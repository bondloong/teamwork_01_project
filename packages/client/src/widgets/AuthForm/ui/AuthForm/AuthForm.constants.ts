import { FC } from 'react';
import { TFormType } from './AuthForm.interfaces';
import { LoginForm } from '../LoginForm';
import { SignupForm } from '../SignupForm';
import { IFormProps } from '../../model';

export const formsMap: Record<TFormType, FC<IFormProps>> = {
  login: LoginForm,
  signup: SignupForm,
} as const;

export const TEXTS = {
  buttons: {
    signup: 'Sign up',
    login: 'Log in',
  },
  logInTitle: 'Log In',
  signUpTitle: 'Sign Up',
};
