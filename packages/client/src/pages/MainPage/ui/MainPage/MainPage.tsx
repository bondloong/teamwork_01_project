import { ReactElement } from 'react';
import { LandingNavigation } from '@/widgets/LandingNavigation';
import classes from './MainPage.module.scss';
import { TEXTS } from './MainPage.constants';

export const MainPage = (): ReactElement => {
  return (
    <div className={classes.section}>
      <div className={classes.content}>
        <h1 className={classes.heading}>{TEXTS.title}</h1>

        <p className={classes.paragraph}>{TEXTS.description}</p>
      </div>

      <LandingNavigation />
    </div>
  );
};
