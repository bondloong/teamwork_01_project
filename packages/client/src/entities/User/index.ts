export {
  type IUserSchema,
  getUserData,
  getIsAuth,
  getIsUserLoading,
  getIsAvatarLoading,
  getIsProfileLoading,
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
} from './api';
