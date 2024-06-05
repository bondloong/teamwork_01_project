import { IInputData } from '@/shared/hooks';
import { EInputNames } from '@/shared/types';

export const PROFILE_INPUTS: IInputData[] = [
  {
    name: EInputNames.FirstName,
    placeholder: 'First Name',
    type: 'text',
  },
  {
    name: EInputNames.SecondName,
    placeholder: 'Second Name',
    type: 'text',
  },
  {
    name: EInputNames.DisplayName,
    placeholder: 'Display Name',
    type: 'text',
  },
  {
    name: EInputNames.Login,
    placeholder: 'Login',
    type: 'text',
  },
  {
    name: EInputNames.Email,
    placeholder: 'Email',
    type: 'text',
  },
  {
    name: EInputNames.Phone,
    placeholder: 'Phone',
    type: 'text',
  },
] as const;
