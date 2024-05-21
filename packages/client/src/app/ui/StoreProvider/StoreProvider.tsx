import { createReduxStore } from '../../model';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { IStoreProviderProps } from './StoreProvider.interfaces';

export const StoreProvider = ({ children }: IStoreProviderProps): ReactElement => {
  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
