import { API, projectClient } from '@/shared/api';
import { IAuthor } from '../../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopicAuthor = createAsyncThunk<IAuthor, number>(
  'topics/fetchTopicAuthor',
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const topics = await projectClient
        .get<IAuthor>(`${API.users}/yandex/${id}`)
        .then((res) => res.data);

      return topics;
    } catch {
      throw rejectWithValue('Fetching topics failed');
    }
  }
);
