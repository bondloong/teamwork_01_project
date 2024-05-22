import { API, praktikumClient } from '@/shared/api';
import { TLogInPayload } from './logIn.interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export const logIn = createAsyncThunk<void, TLogInPayload>(
  'users/logIn',
  async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await praktikumClient.post<void, AxiosResponse<void>, TLogInPayload>(API.logIn, credentials);
    } catch {
      throw rejectWithValue('Log In failed');
    }
  }
);
