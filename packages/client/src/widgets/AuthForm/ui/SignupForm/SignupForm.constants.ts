import { EInputNames } from '@/shared/types';

export const TEXTS = {
  submitButton: 'Submit',
  signupButton: 'Log in',
} as const;

export const INPUTS = [
  {
    name: EInputNames.FirstName,
    placeholder: 'Введите имя',
    type: 'text',
  },
  {
    name: EInputNames.SecondName,
    placeholder: 'Введите фамилию',
    type: 'text',
  },
  {
    name: EInputNames.Phone,
    placeholder: 'Введите нормер телефона',
    type: 'text',
  },
  {
    name: EInputNames.Login,
    placeholder: 'Введите логин',
    type: 'text',
  },
  {
    name: EInputNames.Email,
    placeholder: 'Введите email',
    type: 'text',
  },
  {
    name: EInputNames.Password,
    placeholder: 'Введите пароль',
    type: 'password',
  },
  {
    name: EInputNames.PasswordRepeat,
    placeholder: 'Введите пароль',
    type: 'password',
  },
] as const;
