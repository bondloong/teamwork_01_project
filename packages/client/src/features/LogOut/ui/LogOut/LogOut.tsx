import { ReactElement } from 'react';
import { Button } from 'antd';
import { TEXTS } from './LogOut.constants';
import { logOut } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/contexts';
import { EAppRoutes } from '@/shared/types';

export const LogOut = (): ReactElement => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = (): void => {
    logOut()
      .then(() => {
        setUser(null);

        navigate(EAppRoutes.Main);
      })
      .catch((error) => {
        console.log('LogOut failed', error);
      });
  };

  return (
    <Button type="primary" onClick={handleClick}>
      {TEXTS.button}
    </Button>
  );
};
