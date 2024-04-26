import { ReactElement } from 'react';
import classes from './LandingNavigation.module.scss';
import { LandingNavigationProps } from './LandingNavigation.interfaces';

export const LandingNavigation = ({ className }: LandingNavigationProps): ReactElement => {
  return (
    <nav className={`${classes.navigation} ${className}`}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <a href="/forum" className={classes.link}>
            Join the Community
          </a>
        </li>
        <li className={classes.item}>
          <a href="/leaderboard" className={classes.link}>
            Compete for Glory
          </a>
        </li>
        <li className={classes.item}>
          <a href="/profile" className={classes.link}>
            Customize Your Ship
          </a>
        </li>
        <li className={classes.item}>
          <a href="/game" className={classes.link}>
            Start Your Adventure
          </a>
        </li>
      </ul>
    </nav>
  );
};
