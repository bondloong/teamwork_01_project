import ReactDOM from 'react-dom/server';
import { Application } from '@/app';
import './app/styles/_reset.scss';
import './app/styles/_app.scss';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from './app/model/utils/createReduxStore/createReduxStore';
import { IUserSchema } from './entities/User';
// Точка входа для генерации html на сервере

interface IRenderOptions {
  html: string;
  initialState: {
    user: IUserSchema;
  };
}

export const render = async (): Promise<IRenderOptions> => {
  const store = configureStore({
    reducer,
  });

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <Application />
      </Provider>
    ),
    initialState: store.getState(),
  };
};
