import { API, apiServerClient } from '@/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export const fetchTheme = createAsyncThunk<string, string>(
  'user/theme',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await apiServerClient.get<void, AxiosResponse<{ theme: string }>>(
        API.getUserTheme(userId)
      );
      return data.theme;
    } catch (error) {
      return rejectWithValue('Fetch theme failed');
    }
  }
);
