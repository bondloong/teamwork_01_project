import { EInputNames } from '@/shared/types';
import { PASSWORD_INPUTS } from '../constants';
import { StringSchema } from 'yup';
import { INPUT_VALIDATION_SCHEMAS } from '@/shared/constants';

const REQUIRED_ERROR = 'Обязательное поле';

export const PasswordSchema: Record<(typeof PASSWORD_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.OldPassword]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
  [EInputNames.NewPassword]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
  [EInputNames.PasswordRepeat]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
} as const;
