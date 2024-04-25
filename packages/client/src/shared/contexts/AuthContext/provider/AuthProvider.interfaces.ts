import { IUser } from '@/entities/User';
import { ReactNode } from 'react';

export interface IAuthProviderProps {
  children: ReactNode;
  getUserInfo: () => Promise<IUser>;
}
