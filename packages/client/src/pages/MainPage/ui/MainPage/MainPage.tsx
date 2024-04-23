import { BaseLayout } from '@/layouts/BaseLayout';
import { ReactElement } from 'react';
// import MainImage from '@/assets/images/main.jpg';
import classes from './MainPage.module.scss';

export const MainPage = (): ReactElement => {
  // console.log('ok', MainImage as string);
  return (
    <BaseLayout>
      <div className={classes.container}>
        <img src={'/assets/images/main.jpg'} alt="Starship Screenshot" className={classes.image} />
        <div className={classes.overlay}>
          <div className={classes.content}>
            <h1>Explore the Universe</h1>
            <p>
              Embark on an epic journey through space in Starship, a thrilling adventure game where
              you control your own spacecraft and battle against alien invaders.
            </p>
            <nav>
              <ul>
                <li>
                  <a href="/forum">Join the Community</a>
                </li>
                <li>
                  <a href="/leaderboard">Compete for Glory</a>
                </li>
                <li>
                  <a href="/profile">Customize Your Ship</a>
                </li>
                <li>
                  <a href="/game">Start Your Adventure</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
