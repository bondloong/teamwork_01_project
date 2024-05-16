import { useFullscreen } from '@/shared/hooks/useFullscreen';
import { BaseLayout } from '@/layouts/BaseLayout';
import { Game } from '@/widgets/Game';
import { ReactElement } from 'react';
import classes from './GamePage.module.scss';

export const GamePage = (): ReactElement => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <BaseLayout isFullscreen={isFullscreen}>
      <h1 className={isFullscreen ? classes.hidden : ''}>GamePage</h1>
      <Game
        width={1000}
        height={500}
        onFullscreenToggle={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </BaseLayout>
  );
};
