export type { IUser, IUserSchema } from './types';
export {
  getUserData,
  getIsAuth,
  getIsUserLoading,
  getIsAvatarLoading,
  getIsProfileLoading,
  getIsPasswordLoading,
} from './selectors';
export { userActions, userReducer } from './slice';
