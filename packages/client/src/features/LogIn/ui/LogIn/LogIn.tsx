import { ReactElement } from 'react';
import { Button } from 'antd';
import { TEXTS } from './LogIn.constants';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';

export const LogIn = (): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(EAppRoutes.Auth);
  };

  return (
    <Button type="primary" onClick={handleClick}>
      {TEXTS.button}
    </Button>
  );
};
