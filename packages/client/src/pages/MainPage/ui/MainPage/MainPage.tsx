import { ReactElement } from 'react';
import { LandingNavigation } from '@/widgets/LandingNavigation';
import classes from './MainPage.module.scss';

export const MainPage = (): ReactElement => {
  return (
    <div className={classes.section}>
      <div className={classes.content}>
        <h1 className={classes.heading}>Explore the Universe</h1>
        <p className={classes.paragraph}>
          Embark on an epic journey through space in Starship, a thrilling adventure game where you
          control your own spacecraft and battle against alien invaders.
        </p>
      </div>
      <LandingNavigation />
    </div>
  );
};
