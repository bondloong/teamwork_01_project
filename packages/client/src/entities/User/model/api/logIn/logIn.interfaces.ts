import { IUser } from '../../types';

export type TLogInPayload = Pick<IUser, 'login'> & {
  password: string;
};
