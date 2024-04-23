import { ValidationError } from 'yup';
import { TValidateString } from './validateString.interfaces';

export const validateString: TValidateString = (value, schema) => {
  let errorMessage = '';

  try {
    schema.validateSync(value);
  } catch (error) {
    if (error instanceof ValidationError) {
      errorMessage = error.message;
    }
  }

  return errorMessage;
};
