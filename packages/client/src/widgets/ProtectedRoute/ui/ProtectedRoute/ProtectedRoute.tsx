import React, { ReactElement } from 'react';
import { IProtectedRouteProps } from './ProtectedRoute.interfaces';
import { Navigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/entities/User';

export const ProtectedRoute = ({ children }: IProtectedRouteProps): ReactElement => {
  const isAuth = useSelector(getIsAuth);

  if (!isAuth) {
    return <Navigate to={EAppRoutes.Auth} />;
  }

  return <>{children}</>;
};
