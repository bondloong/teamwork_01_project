import { useState, useEffect } from 'react';
import { UseFullscreenResult } from './useFullscreen.interfaces';

export const useFullscreen = (initialState: boolean = false): UseFullscreenResult => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(initialState);

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((e) =>
          console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)
        );
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((e) =>
          console.error(`Error attempting to exit full-screen mode: ${e.message} (${e.name})`)
        );
    }
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (document.fullscreenElement != null) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
};
