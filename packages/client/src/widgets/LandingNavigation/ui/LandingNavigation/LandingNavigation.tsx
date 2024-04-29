import { ReactElement } from 'react';
import classes from './LandingNavigation.module.scss';
import { Link } from 'react-router-dom';
import { EAppRoutes } from '@/shared/types';

export const LandingNavigation = (): ReactElement => {
  return (
    <>
      <ul className={`${classes.list}`}>
        <li className={classes.item}>
          <Link to={EAppRoutes.Forum} className={classes.link}>
            Join the Community
          </Link>
        </li>
        <li className={classes.item}>
          <Link to={EAppRoutes.LeaderBoard} className={classes.link}>
            Compete for Glory
          </Link>
        </li>
        <li className={classes.item}>
          <Link to="#" className={classes.link}>
            Customize Your Ship
          </Link>
        </li>
        <li className={classes.item}>
          <Link to={EAppRoutes.Game} className={classes.link}>
            Start Your Adventure
          </Link>
        </li>
      </ul>
    </>
  );
};
