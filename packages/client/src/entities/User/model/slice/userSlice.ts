import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserSchema } from '../types';
import {
  fetchUserInfo,
  logIn,
  logOut,
  signUp,
  changeUserPassword,
  uploadProfileAvatar,
  changeUserProfile,
} from '../../api';

const initialState: IUserSchema = {
  userData: null,
  isLoading: true,
  isAvatarLoading: false,
  isProfileLoading: false,
  isPasswordLoading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.userData = null;
      });

    builder
      .addCase(uploadProfileAvatar.pending, (state) => {
        state.isAvatarLoading = true;
      })
      .addCase(uploadProfileAvatar.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isAvatarLoading = false;
        state.userData = action.payload;
      })
      .addCase(uploadProfileAvatar.rejected, (state) => {
        state.isAvatarLoading = false;
      })
      .addCase(changeUserProfile.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(changeUserProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isProfileLoading = false;
        state.userData = action.payload;
      })
      .addCase(changeUserProfile.rejected, (state) => {
        state.isProfileLoading = false;
      });

    builder
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(changeUserPassword.pending, (state) => {
        state.isPasswordLoading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.isPasswordLoading = false;
      })
      .addCase(changeUserPassword.rejected, (state) => {
        state.isPasswordLoading = false;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
