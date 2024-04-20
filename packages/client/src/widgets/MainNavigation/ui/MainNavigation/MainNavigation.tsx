import { Menu } from 'antd';
import { ReactElement } from 'react';
import { navItems } from './MainNavigation.constants';
import { useNavigate } from 'react-router-dom';
import { IMenuInfo } from './MainNavigation.interfaces';
import classes from './MainNavigation.module.scss';

export const MainNavigation = (): ReactElement => {
  const navigate = useNavigate();

  const handleClick = ({ key }: IMenuInfo): void => {
    navigate(key);
  };

  return (
    <Menu
      items={navItems}
      mode="horizontal"
      onClick={handleClick}
      className={classes.mainNavigation}
    />
  );
};
