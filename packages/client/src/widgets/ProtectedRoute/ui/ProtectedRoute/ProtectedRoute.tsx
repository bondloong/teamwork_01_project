import React, { ReactElement } from 'react';
import { IProtectedRouteProps } from './ProtectedRoute.interfaces';
import { useAuthContext } from '@/shared/contexts';
import { Navigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';

export const ProtectedRoute = ({ children }: IProtectedRouteProps): ReactElement => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={EAppRoutes.Main} />;
  }

  return <>{children}</>;
};
