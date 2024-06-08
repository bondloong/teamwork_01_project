import { userReducer } from '@/entities/User';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TCreateReduxStore } from './createReduxStore.interfaces';

declare global {
  interface Window {
    APP_INITIAL_STATE: IStateSchema;
  }
}

export const reducer = combineReducers({
  user: userReducer,
});

export const createReduxStore: TCreateReduxStore = () => {
  const store = configureStore({
    reducer,
    preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  });

  return store;
};
