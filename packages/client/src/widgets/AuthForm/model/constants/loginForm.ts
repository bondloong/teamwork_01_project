import { EInputNames } from '@/shared/types';

export const LOGIN_INPUTS = [
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
