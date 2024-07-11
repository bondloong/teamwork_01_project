import { API, apiServerClient } from '@/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export const fetchTheme = createAsyncThunk<string, string>(
  'user/fetchTheme',
  async (userId, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await apiServerClient.get<void, AxiosResponse<{ theme: string }>>(
        `${API.user}/theme/${userId}`
      );
      return data.theme;
    } catch (error) {
      return rejectWithValue('Fetch theme failed');
    }
  }
);
