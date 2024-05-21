import { IUser } from '../../model';

export type TLogInPayload = Pick<IUser, 'login'> & {
  password: string;
};
