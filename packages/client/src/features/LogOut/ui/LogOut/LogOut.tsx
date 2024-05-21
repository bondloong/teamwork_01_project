import { ReactElement } from 'react';
import { Button } from 'antd';
import { TEXTS } from './LogOut.constants';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';
import { getIsUserLoading, logOutThunk } from '@/entities/User';
import { Loader } from '@/shared/ui';
import { useSelector } from 'react-redux';

export const LogOut = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsUserLoading);

  const handleClick = (): void => {
    dispatch(logOutThunk()).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(EAppRoutes.Auth);
      }
    });
  };

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        {TEXTS.button}
      </Button>

      {isLoading && <Loader mode="dark" />}
    </>
  );
};
