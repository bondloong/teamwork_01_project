import { IInputData } from '@/shared/hooks';
import { EInputNames } from '@/shared/types';

export const PASSWORD_INPUTS: IInputData[] = [
  {
    name: EInputNames.OldPassword,
    placeholder: 'Old Password',
    type: 'password',
  },
  {
    name: EInputNames.NewPassword,
    placeholder: 'New Password',
    type: 'password',
  },
  {
    name: EInputNames.PasswordRepeat,
    placeholder: 'Confirm New Password',
    type: 'password',
  },
] as const;
