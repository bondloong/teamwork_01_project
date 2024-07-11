export {
  type IUserSchema,
  getUserData,
  getIsAuth,
  getIsUserLoading,
  getIsAvatarLoading,
  getIsProfileLoading,
  getIsPasswordLoading,
  userActions,
  userReducer,
} from './model';

export { type TSignUpPayload, type TLogInPayload, type IChangePasswordPayload } from './api';

export {
  fetchUserInfo,
  logOut,
  logIn,
  signUp,
  changeUserPassword,
  uploadProfileAvatar,
  changeUserProfile,
  fetchTheme,
  setTheme,
} from './api';
