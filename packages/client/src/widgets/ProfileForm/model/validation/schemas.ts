import { EInputNames } from '@/shared/types';
import { PROFILE_INPUTS } from '../constants';
import { StringSchema } from 'yup';
import { INPUT_VALIDATION_SCHEMAS } from '@/shared/constants';

const REQUIRED_ERROR = 'Обязательное поле';

export const ProfileSchema: Record<(typeof PROFILE_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.FirstName]: INPUT_VALIDATION_SCHEMAS.name.required(REQUIRED_ERROR),
  [EInputNames.SecondName]: INPUT_VALIDATION_SCHEMAS.name.required(REQUIRED_ERROR),
  [EInputNames.DisplayName]: INPUT_VALIDATION_SCHEMAS.name.required(REQUIRED_ERROR),
  [EInputNames.Login]: INPUT_VALIDATION_SCHEMAS.login.required(REQUIRED_ERROR),
  [EInputNames.Email]: INPUT_VALIDATION_SCHEMAS.email.required(REQUIRED_ERROR),
  [EInputNames.Phone]: INPUT_VALIDATION_SCHEMAS.phone.required(REQUIRED_ERROR),
  [EInputNames.Password]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
  [EInputNames.PasswordRepeat]: INPUT_VALIDATION_SCHEMAS.password.required(REQUIRED_ERROR),
} as const;
