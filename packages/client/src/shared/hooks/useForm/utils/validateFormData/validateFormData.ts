import { ValidationError } from 'yup';
import { EInputNames } from '@/shared/types';
import { TInputsMap, TValidateFormData } from './validateFormData.interfaces';

export const validateFormData: TValidateFormData = (values, schemas) => {
  let isValid = true;

  const errors: TInputsMap = {};

  (Object.keys(values) as EInputNames[]).forEach((key) => {
    const value = values[key];
    const schema = schemas[key];

    if (!schema) {
      errors[key] = '';
      return;
    }

    try {
      schema.validateSync(value);

      errors[key] = '';
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        errors[key] = '';
        return;
      }

      errors[key] = error.message;

      isValid = false;
    }
  });

  return { isValid, errors };
};
