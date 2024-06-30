export const PRAKTIKUM_BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const API_SERVER_URL = `${__API_SERVER_HOST__}:${__API_SERVER_PORT__}/api`;

export const API = {
  userInfo: '/auth/user',
  signUp: '/auth/signup',
  logIn: '/auth/signin',
  logOut: '/auth/logout',
  leaderBoard: '/leaderboard',
  profileAvatar: '/user/profile/avatar',
  password: '/user/password',
  profile: '/user/profile',
  topics: '/topics',
  users: '/users',
  comments: '/comments',
} as const;
