import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserInfo = createAsyncThunk<IUser>('users/fetchUserInfo', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const user = await praktikumClient.get<IUser>(API.userInfo).then((res) => res.data);

    return user;
  } catch {
    throw rejectWithValue('Fetching user data failed');
  }
});
