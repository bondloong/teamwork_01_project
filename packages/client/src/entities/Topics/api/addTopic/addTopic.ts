import { API, apiServerClient } from '@/shared/api';
import { TAddTopicPayload } from './addTopic.interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ITopic } from '../../model';

export const addTopic = createAsyncThunk<ITopic, TAddTopicPayload>(
  'topics/addTopic',
  async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await apiServerClient.post<void, AxiosResponse<ITopic>, TAddTopicPayload>(
        API.topics,
        credentials
      );
      return data;
    } catch {
      throw rejectWithValue('Add topic failed');
    }
  }
);
