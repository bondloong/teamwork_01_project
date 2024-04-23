import { useState } from 'react';
import { TInputValues, TUseForm } from './useForm.interfaces';

export const useForm: TUseForm = (inputs) => {
  const [inputNames] = useState<(typeof inputs)[number]['name'][]>(() =>
    inputs.map(({ name }) => name)
  );

  const [values, setValues] = useState<TInputValues<typeof inputs>>(() =>
    inputs.reduce<TInputValues<typeof inputs>>((acc, input) => {
      acc[input.name] = '';

      return acc;
    }, {})
  );

  const [errors, setErrors] = useState<TInputValues<typeof inputs>>(() =>
    inputs.reduce<TInputValues<typeof inputs>>((acc, input) => {
      acc[input.name] = '';

      return acc;
    }, {})
  );

  const setValue = (name: string, value: string): void => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setError = (name: string, error: string): void => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return {
    values,
    setValue,
    errors,
    setError,
    inputNames,
  };
};
