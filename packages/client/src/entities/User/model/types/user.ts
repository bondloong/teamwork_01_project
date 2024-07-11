export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  avatar?: string;
  email: string;
  theme: string;
}

export interface IUserSchema {
  userData: IUser | null;
  isLoading: boolean;
  isAvatarLoading: boolean;
  isProfileLoading: boolean;
  isPasswordLoading: boolean;
}
