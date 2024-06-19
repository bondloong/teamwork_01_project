import React, { ReactElement } from 'react';
import { IProtectedRouteProps } from './ProtectedRoute.interfaces';
import { Navigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';
import { useSelector } from 'react-redux';
import { getIsAuth, getIsUserLoading } from '@/entities/User';
import { Loader } from '@/shared/ui';

export const ProtectedRoute = ({ children }: IProtectedRouteProps): ReactElement | null => {
  const isAuth = useSelector(getIsAuth);
  const isUserLoading = useSelector(getIsUserLoading);

  if (!isAuth && !isUserLoading) {
    return <Navigate to={EAppRoutes.Auth} />;
  }

  if (isUserLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
