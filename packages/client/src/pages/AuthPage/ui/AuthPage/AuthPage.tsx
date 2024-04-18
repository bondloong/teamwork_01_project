import { ReactElement } from 'react';
import { Button } from 'antd';
import classes from './AuthPage.module.scss';

export const AuthPage = (): ReactElement => {
  const handleClick = (): void => {
    alert('Hello world!');
  };

  return (
    <>
      <h1 className={classes.heading}>AuthPage</h1>

      <Button onClick={handleClick}>Click me</Button>
    </>
  );
};
