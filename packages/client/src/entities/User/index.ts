export {
  type IUser,
  type IUserSchema,
  getUserData,
  getIsAuth,
  getIsUserLoading,
  userActions,
  userReducer,
} from './model';

export { type TSignUpPayload, type TLogInPayload } from './api';
export { fetchUserInfo, logOut, logIn, signUp } from './api';
