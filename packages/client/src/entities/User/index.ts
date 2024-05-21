export {
  type IUser,
  type IUserSchema,
  getUserData,
  getIsAuth,
  getIsUserLoading,
  userActions,
  userReducer,
  fetchUserInfoThunk,
  logOutThunk,
  logInThunk,
  signUpThunk,
} from './model';

export { type TSignUpPayload, type TLogInPayload } from './api';
