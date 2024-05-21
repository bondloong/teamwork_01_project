import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLogInPayload, logIn } from '../../api';

export const logInThunk = createAsyncThunk<void, TLogInPayload>(
  'users/logIn',
  async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await logIn(credentials);
    } catch {
      throw rejectWithValue('Log In failed');
    }
  }
);
