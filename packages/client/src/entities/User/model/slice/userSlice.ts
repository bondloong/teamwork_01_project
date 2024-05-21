import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserSchema } from '../types';
import { fetchUserInfoThunk, logInThunk, logOutThunk, signUpThunk } from '../thunks';

const initialState: IUserSchema = {
  userData: null,
  isLoading: false,
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
      .addCase(fetchUserInfoThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfoThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;

        state.userData = action.payload;
      })
      .addCase(fetchUserInfoThunk.rejected, (state) => {
        state.isLoading = false;
        state.userData = null;
      });

    builder
      .addCase(logOutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.isLoading = false;

        state.userData = null;
      })
      .addCase(logOutThunk.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(logInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logInThunk.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(signUpThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
