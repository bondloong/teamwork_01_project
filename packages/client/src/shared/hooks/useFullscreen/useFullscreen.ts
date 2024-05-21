import { useState, useEffect, RefObject } from 'react';
import { IUseFullscreenResult } from './useFullscreen.interfaces';

export const useFullscreen = (
  elementRef: RefObject<HTMLElement>,
  initialState: boolean = false,
  onToggle?: () => void
): IUseFullscreenResult => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(initialState);

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement && elementRef.current) {
      elementRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          onToggle?.();
        })
        .catch((e) =>
          console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)
        );
    } else if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          onToggle?.();
        })
        .catch((e) =>
          console.error(`Error attempting to exit full-screen mode: ${e.message} (${e.name})`)
        );
    }
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (document.fullscreenElement === elementRef.current) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef]);

  return { isFullscreen, toggleFullscreen };
};
