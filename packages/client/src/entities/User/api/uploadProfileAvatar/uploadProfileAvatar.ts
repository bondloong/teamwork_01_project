import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadProfileAvatar = createAsyncThunk<IUser, File>(
  'user/uploadProfileAvatar',
  async (avatar, thunkAPI) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const response = await praktikumClient.put(API.profileAvatar, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to change profile avatar');
    }
  }
);
