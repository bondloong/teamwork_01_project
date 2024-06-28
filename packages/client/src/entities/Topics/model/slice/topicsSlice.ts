import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthor, ITopic, ITopicsSchema } from '../types';
import { fetchTopics, addTopic, fetchTopicAuthor } from '../../api';
import { createTopicAuthor } from '../../api/createTopicAuthor';

const initialState: ITopicsSchema = {
  data: [],
  topicAuthor: null,
  isLoading: true,
  isNewTopicLoading: true,
  isTopicAuthorLoading: true,
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: (state, { payload }: PayloadAction<ITopic>) => {
      state.data = [...state.data, payload];
    },
    deleteTopic: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action: PayloadAction<ITopic[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopics.rejected, (state) => {
        state.isLoading = false;
        state.data = [];
      });

    builder
      .addCase(addTopic.pending, (state) => {
        state.isNewTopicLoading = true;
      })
      .addCase(addTopic.fulfilled, (state, action: PayloadAction<ITopic>) => {
        state.isNewTopicLoading = false;
        state.data = [action.payload, ...state.data];
      })
      .addCase(addTopic.rejected, (state) => {
        state.isNewTopicLoading = false;
      });

    builder
      .addCase(fetchTopicAuthor.pending, (state) => {
        state.isTopicAuthorLoading = true;
      })
      .addCase(fetchTopicAuthor.fulfilled, (state, action: PayloadAction<IAuthor>) => {
        state.isTopicAuthorLoading = false;
        state.topicAuthor = action.payload;
      })
      .addCase(fetchTopicAuthor.rejected, (state) => {
        state.isTopicAuthorLoading = false;
        console.log('reject');
      });

    builder
      .addCase(createTopicAuthor.pending, (state) => {
        state.isTopicAuthorLoading = true;
      })
      .addCase(createTopicAuthor.fulfilled, (state, action: PayloadAction<IAuthor>) => {
        state.isTopicAuthorLoading = false;
        state.topicAuthor = action.payload;
      })
      .addCase(createTopicAuthor.rejected, (state) => {
        state.isTopicAuthorLoading = false;
      });
  },
});

export const { actions: topicsActions } = topicsSlice;
export const { reducer: topicsReducer } = topicsSlice;
