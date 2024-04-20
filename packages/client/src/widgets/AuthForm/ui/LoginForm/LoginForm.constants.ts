import { EInputNames } from '@/shared/types';

export const TEXTS = {
  submitButton: 'Submit',
  signupButton: 'Sign up',
} as const;

export const INPUTS = [
  {
    name: EInputNames.Login,
    placeholder: 'Введите логин',
    type: 'text',
  },
  {
    name: EInputNames.Password,
    placeholder: 'Введите пароль',
    type: 'password',
  },
] as const;
