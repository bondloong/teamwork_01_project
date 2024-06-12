import { ReactElement } from 'react';
import { Button, message } from 'antd';
import { TEXTS } from './LogOut.constants';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';
import { getIsUserLoading, logOut } from '@/entities/User';
import { Loader } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { ILogOutProps } from './LogOut.interfaces';

export const LogOut = ({
  buttonType = 'primary',
  danger = false,
  ghost = false,
  ...restProps
}: ILogOutProps): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsUserLoading);

  const handleClick = (): void => {
    dispatch(logOut()).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        message.success('Logged out successfully!');
        navigate(EAppRoutes.Auth, { replace: true });
      }
    });
  };

  return (
    <>
      <Button type={buttonType} danger={danger} ghost={ghost} onClick={handleClick} {...restProps}>
        {TEXTS.button}
      </Button>

      {isLoading && <Loader mode="dark" />}
    </>
  );
};
