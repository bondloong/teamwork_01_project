export {
  type IUser,
  type IUserSchema,
  getUserData,
  getIsAuth,
  userActions,
  userReducer,
} from './model';

export {
  fetchUserInfo,
  logOut,
  signUp,
  type TSignUpPayload,
  logIn,
  type TLogInPayload,
} from './api';
