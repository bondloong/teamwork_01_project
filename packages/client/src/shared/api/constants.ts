export const PRAKTIKUM_BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const PROJECT_BASE_URL = 'http://localhost:3002/api';

export const API = {
  userInfo: '/auth/user',
  signUp: '/auth/signup',
  logIn: '/auth/signin',
  logOut: '/auth/logout',
  profileAvatar: '/user/profile/avatar',
  password: '/user/password',
  profile: '/user/profile',
  topics: '/topics',
  users: '/users',
  comments: '/comments',
} as const;
