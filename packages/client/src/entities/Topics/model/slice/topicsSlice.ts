import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthor, ITopic, ITopicsSchema, IComment } from '../types';
import { ECommentReactions } from '@/shared/types';
import { fetchTopics, addTopic, fetchTopicAuthor } from '../../api';
import { createTopicAuthor } from '../../api/createTopicAuthor';

const initialState: ITopicsSchema = {
  data: [],
  topicAuthor: null,
  isLoading: true,
  isNewTopicLoading: true,
  isTopicAuthorLoading: true,
  commentsReactions: {},
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
    addComment: (state, { payload }: PayloadAction<{ topicId: string; comment: IComment }>) => {
      const topic = state.data.find(({ id }) => id === payload.topicId);
      if (topic) {
        topic.comments.push(payload.comment);
      }
    },
    toggleReaction: (
      state,
      { payload }: PayloadAction<{ commentId: string; reaction: ECommentReactions }>
    ) => {
      const reactions = state.commentsReactions[payload.commentId] || [];
      const reactionIndex = reactions.indexOf(payload.reaction);

      if (reactionIndex === -1) {
        reactions.push(payload.reaction);
      } else {
        reactions.splice(reactionIndex, 1);
      }

      state.commentsReactions[payload.commentId] = reactions;
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
