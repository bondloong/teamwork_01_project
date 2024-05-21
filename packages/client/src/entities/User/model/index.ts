export type { IUser, IUserSchema } from './types';
export { getUserData, getIsAuth, getIsUserLoading } from './selectors';
export { userActions, userReducer } from './slice';
export { fetchUserInfoThunk, logOutThunk, logInThunk, signUpThunk } from './thunks';
