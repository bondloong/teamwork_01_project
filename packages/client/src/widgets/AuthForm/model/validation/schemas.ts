import { INPUT_VALIDATION_SCHEMAS } from '@/shared/services';
import { EInputNames } from '@/shared/types';
import { LOGIN_INPUTS, SIGNUP_INPUTS } from '../constants';
import { StringSchema } from 'yup';

export const loginSchema: Record<(typeof LOGIN_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.Login]: INPUT_VALIDATION_SCHEMAS.login,
  [EInputNames.Password]: INPUT_VALIDATION_SCHEMAS.password,
} as const;

export const signupSchema: Record<(typeof SIGNUP_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.FirstName]: INPUT_VALIDATION_SCHEMAS.name,
  [EInputNames.SecondName]: INPUT_VALIDATION_SCHEMAS.name,
  [EInputNames.Phone]: INPUT_VALIDATION_SCHEMAS.phone,
  [EInputNames.Login]: INPUT_VALIDATION_SCHEMAS.login,
  [EInputNames.Email]: INPUT_VALIDATION_SCHEMAS.email,
  [EInputNames.Password]: INPUT_VALIDATION_SCHEMAS.password,
  [EInputNames.PasswordRepeat]: INPUT_VALIDATION_SCHEMAS.password,
};
