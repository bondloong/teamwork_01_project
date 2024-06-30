import { API, projectClient } from '@/shared/api';
import { ITopic } from '../../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopics = createAsyncThunk<ITopic[]>('topics/fetchTopics', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const topics = await projectClient.get<ITopic[]>(API.topics).then((res) => res.data);

    return topics;
  } catch {
    throw rejectWithValue('Fetching topics failed');
  }
});
