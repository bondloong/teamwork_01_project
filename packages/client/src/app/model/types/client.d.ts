import { IUser } from '@/entities/User';

declare const __SERVER_PORT__: number;

declare global {
  interface IAuthContex {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
  }
}
