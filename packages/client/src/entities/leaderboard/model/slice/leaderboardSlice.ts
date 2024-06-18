import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILeaderboardItem, ILeaderboardState } from '../types';
import { fetchLeaderboardByTeam, submitScore } from '../../api';

const initialState: ILeaderboardState = {
  leaderboardData: [],
  isLoading: false,
  error: null,
};

interface IItem {
  data: {
    user?: string;
    rating: number;
  };
}
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboardData: (state, action: PayloadAction<ILeaderboardItem[]>) => {
      state.leaderboardData = action.payload.map((item, index) => ({
        ...item,
        key: `leaderboard_${index}`,
        position: index + 1,
        rating: item.rating,
        user: item.user,
        userId: index + 1,
      }));
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardByTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboardByTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.leaderboardData = action.payload.map((item: IItem) => ({
          user: item.data.user ?? 'Unknown',
          rating: item.data.rating ?? 0,
        }));
      })
      .addCase(fetchLeaderboardByTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(submitScore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitScore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});
export const { actions: leaderboardActions } = leaderboardSlice;
export const { reducer: leaderboardReducer } = leaderboardSlice;
