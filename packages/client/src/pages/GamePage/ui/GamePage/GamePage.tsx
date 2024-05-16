import { BaseLayout } from '@/layouts/BaseLayout';
import { Game } from '@/widgets/Game';
import { useState, ReactElement } from 'react';
import classes from './GamePage.module.scss';

export const GamePage = (): ReactElement => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <BaseLayout isFullscreen={isFullscreen}>
      <h1 className={isFullscreen ? classes.hidden : ''}>GamePage</h1>
      <Game width={1000} height={500} onFullscreenToggle={setIsFullscreen} />
    </BaseLayout>
  );
};
