import { API, praktikumClient } from '@/shared/api';
import { TLogInPayload } from './logIn.interfaces';

export const logIn = async (credentials: TLogInPayload): Promise<void> =>
  praktikumClient.post(API.logIn, credentials);
