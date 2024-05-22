export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  avatar?: string;
  email: string;
}

export interface IUserSchema {
  userData: IUser | null;
  isLoading: boolean;
}
