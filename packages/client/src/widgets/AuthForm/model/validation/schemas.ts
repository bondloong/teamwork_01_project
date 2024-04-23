import { EInputNames } from '@/shared/types';
import { LOGIN_INPUTS, SIGNUP_INPUTS } from '../constants';
import { StringSchema } from 'yup';
import { INPUT_VALIDATION_SCHEMAS } from '@/shared/constants';

const REQUIRED_ERROR = 'Обязательное поле';

export const loginSchema: Record<(typeof LOGIN_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.Login]: INPUT_VALIDATION_SCHEMAS.login.required(REQUIRED_ERROR),
  [EInputNames.Password]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
} as const;

export const signupSchema: Record<(typeof SIGNUP_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.FirstName]: INPUT_VALIDATION_SCHEMAS.name.required(REQUIRED_ERROR),
  [EInputNames.SecondName]: INPUT_VALIDATION_SCHEMAS.name.required(REQUIRED_ERROR),
  [EInputNames.Phone]: INPUT_VALIDATION_SCHEMAS.phone.required(REQUIRED_ERROR),
  [EInputNames.Login]: INPUT_VALIDATION_SCHEMAS.login.required(REQUIRED_ERROR),
  [EInputNames.Email]: INPUT_VALIDATION_SCHEMAS.email.required(REQUIRED_ERROR),
  [EInputNames.Password]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
  [EInputNames.PasswordRepeat]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
};
