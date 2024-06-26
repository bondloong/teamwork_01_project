import { useState, useMemo, useCallback } from 'react';
import { TInputValues, TUseForm } from './useForm.interfaces';
import { validateFormData, validateString } from './utils';

export const useForm: TUseForm = (inputs) => {
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

  const resetForm = useCallback(() => {
    setValues(
      inputs.reduce<TInputValues<typeof inputs>>((acc, input) => {
        acc[input.name] = '';

        return acc;
      }, {})
    );
    setErrors(
      inputs.reduce<TInputValues<typeof inputs>>((acc, input) => {
        acc[input.name] = '';

        return acc;
      }, {})
    );
  }, [inputs]);

  const inputNames = useMemo<(typeof inputs)[number]['name'][]>(
    () => inputs.map(({ name }) => name),
    [inputs]
  );

  return {
    values,
    setValue,
    errors,
    setError,
    setErrors,
    resetForm,
    inputNames,
    validateFormData,
    validateString,
  };
};
