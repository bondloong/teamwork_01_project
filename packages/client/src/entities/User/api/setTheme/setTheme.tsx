import { API, apiServerClient } from '@/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

interface SetThemePayload {
  id: number;
  theme: string;
}

export const setTheme = createAsyncThunk<void, SetThemePayload>(
  'user/setTheme',
  async (payload, thunkAPI) => {
    try {
      console.log('Payload:', payload);
      await apiServerClient.put<void, AxiosResponse<void>>(API.setUserTheme, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to set user theme');
    }
  }
);
