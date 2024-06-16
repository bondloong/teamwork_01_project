import React, { ReactElement, useEffect, useState } from 'react';
import { IAuthProps } from './Auth.interfaces';
import { useAppDispatch } from '@/shared/hooks';
import { fetchUserInfo } from '@/entities/User';
import { Loader } from '@/shared/ui';
import { Provider } from 'react-redux';
import { createReduxStore } from '@/app/model';

export const Auth = ({ children }: IAuthProps): ReactElement => {
  const store = createReduxStore();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchUserInfo()).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <Provider store={store}>{children}</Provider>;
};
