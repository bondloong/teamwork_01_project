import { API, praktikumClient } from '@/shared/api';
import { TChangePasswordPayload } from './changeUserPassword.interfaces';

export const changeUserPassword = async (payload: TChangePasswordPayload): Promise<void> => {
  return praktikumClient.put(API.password, payload);
};
