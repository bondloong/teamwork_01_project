import { userReducer } from '@/entities/User';
import { leaderboardReducer } from '@/entities/leaderboard';
import { configureStore } from '@reduxjs/toolkit';
import { TCreateReduxStore } from './createReduxStore.interfaces';

export const createReduxStore: TCreateReduxStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      leaderboard: leaderboardReducer,
    },
  });

  return store;
};
