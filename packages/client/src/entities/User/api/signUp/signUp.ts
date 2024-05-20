import { API, praktikumClient } from '@/shared/api';
import { ISignUpResponse, TSignUpPayload } from './signUp.interfaces';

export const signUp = async (user: TSignUpPayload): Promise<ISignUpResponse> =>
  praktikumClient.post(API.signUp, user).then((res) => res.data);
