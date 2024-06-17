import ReactDOM from 'react-dom/server';
import './app/styles/_reset.scss';
import './app/styles/_app.scss';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from './app/model/utils/createReduxStore/createReduxStore';
import { IUserSchema } from './entities/User';
import { Request as ExpressRequest } from 'express';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { createFetchRequest } from './entry-server.utils';
import { routes } from './app/model/constants/routes';

// Точка входа для генерации html на сервере
interface IRenderOptions {
  html: string;
  initialState: {
    user: IUserSchema;
  };
}

export const render = async (req: ExpressRequest): Promise<IRenderOptions> => {
  const { query, dataRoutes } = createStaticHandler(routes);

  const fetchRequest = createFetchRequest(req);

  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const store = configureStore({
    reducer,
  });

  const router = createStaticRouter(dataRoutes, context);

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  };
};
