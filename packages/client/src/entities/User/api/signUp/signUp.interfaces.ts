import { IUser } from '../../model';

export type TSignUpPayload = Omit<IUser, 'id' | 'avatar'> & {
  password: string;
};

export interface ISignUpResponse {
  id: number;
}
