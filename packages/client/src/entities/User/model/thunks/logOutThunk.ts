import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOut } from '../../api';

export const logOutThunk = createAsyncThunk('users/logOut', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    await logOut();
  } catch {
    throw rejectWithValue('Log out failed');
  }
});
