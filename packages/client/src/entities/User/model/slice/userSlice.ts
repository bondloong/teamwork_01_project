import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserSchema } from '../types';

const initialState: IUserSchema = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUser>) => {
      state.userData = payload;
    },

    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
