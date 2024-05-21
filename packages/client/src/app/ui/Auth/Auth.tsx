import React, { ReactElement, useEffect, useState } from 'react';
import { IAuthProps } from './Auth.interfaces';
import { useAppDispatch } from '@/shared/hooks';
import { fetchUserInfoThunk } from '@/entities/User';
import { Loader } from '@/shared/ui';

export const Auth = ({ children }: IAuthProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchUserInfoThunk()).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};
