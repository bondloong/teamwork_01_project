import { createAsyncThunk } from '@reduxjs/toolkit';
import { TSignUpPayload, signUp } from '../../api';
import { IUser } from '../types';

export const signUpThunk = createAsyncThunk<IUser, TSignUpPayload>(
  'users/signUp',
  async (userData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await signUp(userData);

      const user = {
        ...userData,
        password: undefined,
        id: response.id,
      };

      return user;
    } catch {
      throw rejectWithValue('Sign Up failed');
    }
  }
);
