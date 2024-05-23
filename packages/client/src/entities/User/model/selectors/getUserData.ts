import { IUser } from '../types';

export const getUserData = (state: IStateSchema): IUser | null => state.user.userData;
