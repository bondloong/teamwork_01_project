import { ReactElement, useEffect } from 'react';
import { IAuthProps } from './Auth.interfaces';
import { useAppDispatch } from '@/shared/hooks';
import { fetchUserInfo, getIsAuth } from '@/entities/User';
import { useSelector } from 'react-redux';

export const Auth = ({ children }: IAuthProps): ReactElement => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    !isAuth && dispatch(fetchUserInfo());
  }, []);

  return children;
};
