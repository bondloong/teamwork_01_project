import { IUser, IUserSchema } from '@/entities/User';

declare const __SERVER_PORT__: number;
declare const __EXTERNAL_SERVER_URL__: string;
declare const __INTERNAL_SERVER_URL__: string;

declare global {
  interface IAuthContex {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
  }

  interface IStateSchema {
    user: IUserSchema;
  }
}
