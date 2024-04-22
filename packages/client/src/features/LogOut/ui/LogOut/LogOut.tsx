import { ReactElement } from 'react';
import { Button } from 'antd';
import { TEXTS } from './LogOut.constants';

export const LogOut = (): ReactElement => {
  const handleClick = (): void => {
    console.log('Log out button clicked');
  };
  return (
    <Button type="primary" onClick={handleClick}>
      {TEXTS.button}
    </Button>
  );
};
