import { IUser, IUserSchema } from '@/entities/User';

declare global {
  interface IAuthContex {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
  }

  interface IStateSchema {
    user: IUserSchema;
  }

  declare const __API_SERVER_PORT__: number;
  declare const __API_SERVER_HOST__: string;
}
