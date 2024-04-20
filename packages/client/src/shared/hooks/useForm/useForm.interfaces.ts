import { HTMLInputTypeAttribute } from 'react';

export interface IInputData {
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const INPUTS = [
  {
    name: 'login',
    placeholder: 'Введите логин',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Введите пароль',
    type: 'password',
  },
] as const;

export type TInputValues<T extends Readonly<IInputData[]>> = Record<T[number]['name'], string>;

export type TUseForm = (inputs: Readonly<IInputData[]>) => {
  values: TInputValues<typeof inputs>;
  setValue: (name: string, value: string) => void;
  errors: TInputValues<typeof inputs>;
  setError: (name: string, error: string) => void;
  inputNames: (typeof inputs)[number]['name'][];
};
