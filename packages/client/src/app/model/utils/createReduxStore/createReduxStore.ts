import { userReducer } from '@/entities/User';
import { configureStore } from '@reduxjs/toolkit';
import { TCreateReduxStore } from './createReduxStore.interfaces';

export const createReduxStore: TCreateReduxStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return store;
};
