import { API, praktikumClient } from '@/shared/api';
import { IChangePasswordPayload } from './changeUserPassword.interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const changeUserPassword = createAsyncThunk<void, IChangePasswordPayload>(
  'user/changeUserPassword',
  async (payload, thunkAPI) => {
    try {
      await praktikumClient.put(API.password, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to change user password');
    }
  }
);
