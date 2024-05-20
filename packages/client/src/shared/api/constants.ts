export const PRAKTIKUM_BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const API = {
  userInfo: '/auth/user',
  signUp: '/auth/signup',
  logIn: '/auth/signin',
  logOut: '/auth/logout',
  profileAvatar: '/user/profile/avatar',
  password: '/user/password',
  profile: '/user/profile',
} as const;
