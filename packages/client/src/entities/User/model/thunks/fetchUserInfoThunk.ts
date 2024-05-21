import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../../api';

export const fetchUserInfoThunk = createAsyncThunk('users/fetchUserInfo', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const user = await fetchUserInfo();

    return user;
  } catch {
    throw rejectWithValue('Fetching user data failed');
  }
});
