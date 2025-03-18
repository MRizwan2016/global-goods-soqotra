
import { useState } from 'react';

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return {
    isFullScreen,
    toggleFullScreen,
    exitFullScreen: () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };
};
