import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const changeUserProfile = createAsyncThunk<IUser, Partial<IUser>>(
  'user/changeUserProfile',
  async (profileData, thunkAPI) => {
    try {
      const response = await praktikumClient.put(API.profile, profileData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to change user profile');
    }
  }
);
