import { ReactElement } from 'react';
import classes from './LandingNavigation.module.scss';
import { Link } from 'react-router-dom';
import { navItems } from './LandingNavigation.constants';

export const LandingNavigation = (): ReactElement => {
  return (
    <ul className={classes.list}>
      {navItems.map((item, index) => (
        <li className={classes.item} key={index}>
          <Link to={item.path} className={classes.link}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
