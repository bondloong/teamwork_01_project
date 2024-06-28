import { API, projectClient } from '@/shared/api';
import { TCreateTopicAuthorPayload } from './createTopicAuthor.interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IAuthor } from '../../model';

export const createTopicAuthor = createAsyncThunk<IAuthor, TCreateTopicAuthorPayload>(
  'topics/createTopicAuthor',
  async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await projectClient.post<
        void,
        AxiosResponse<IAuthor>,
        TCreateTopicAuthorPayload
      >(API.users, credentials);
      return data;
    } catch {
      throw rejectWithValue('Add topic failed');
    }
  }
);
