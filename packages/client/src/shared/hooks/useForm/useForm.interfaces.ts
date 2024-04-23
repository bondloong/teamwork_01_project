import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';
import { TValidateFormData } from './validateFormData';

export interface IInputData {
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export type TInputValues<T extends Readonly<IInputData[]>> = Record<T[number]['name'], string>;

export type TUseForm = (inputs: Readonly<IInputData[]>) => {
  values: TInputValues<typeof inputs>;
  setValue: (name: string, value: string) => void;
  errors: TInputValues<typeof inputs>;
  setError: (name: string, error: string) => void;
  inputNames: (typeof inputs)[number]['name'][];
  setErrors: Dispatch<SetStateAction<TInputValues<readonly IInputData[]>>>;
  validateFormData: TValidateFormData;
};
