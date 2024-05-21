import { API, praktikumClient } from '@/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logOut = createAsyncThunk('users/logOut', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    await praktikumClient.post(API.logOut);
  } catch {
    throw rejectWithValue('Log out failed');
  }
});
