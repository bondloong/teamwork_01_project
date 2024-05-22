import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserSchema } from '../types';
import {
  fetchUserInfo,
  logIn,
  logOut,
  signUp,
  changeUserPassword,
  changeProfileAvatar,
  changeUserProfile,
  type TChangePasswordPayload,
} from '../../api';

const initialState: IUserSchema = {
  userData: null,
  isLoading: false,
};

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (payload: TChangePasswordPayload) => {
    await changeUserPassword(payload);
  }
);

export const updateProfileAvatar = createAsyncThunk(
  'user/updateProfileAvatar',
  async (avatar: File) => {
    const userData = await changeProfileAvatar(avatar);
    return userData;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (profileData: Partial<IUser>) => {
    const userData = await changeUserProfile(profileData);
    return userData;
  }
);

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
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateProfileAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileAvatar.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(updateProfileAvatar.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
