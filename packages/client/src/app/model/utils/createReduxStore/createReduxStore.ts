import { userReducer } from '@/entities/User';

import { topicsReducer } from '@/entities/Topics';

import { leaderboardReducer } from '@/entities/leaderboard';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TCreateReduxStore } from './createReduxStore.interfaces';

// Глобально декларируем в window наш ключ
// и задаем ему тип такой же, как у стейта в сторе
declare global {
  interface Window {
    APP_INITIAL_STATE: IStateSchema;
  }
}

export const reducer = combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
  topics: topicsReducer,
});

export const createReduxStore: TCreateReduxStore = () => {
  const store = configureStore({
    reducer,

    // чтобы приложение, которое мы будем гидрировать, имело тот же самый стейт, что и приложение, которое рендерилось в HTML.
    preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  });

  return store;
};
