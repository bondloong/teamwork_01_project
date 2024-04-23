import { EInputNames } from '@/shared/types';
import { StringSchema } from 'yup';

export type TInputsMap = Partial<Record<EInputNames, string>>;

export type TValidateFormData = (
  values: TInputsMap,
  schemas: Partial<Record<EInputNames, StringSchema>>
) => {
  isValid: boolean;
  errors: TInputsMap;
};
