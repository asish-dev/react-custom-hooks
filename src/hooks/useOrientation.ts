import * as React from 'react';

export default function useOrientation() {
  const [orientation, setOrientation] = React.useState({
    angle: 0,
    type: 'UNKNOWN',
  });

  React.useLayoutEffect(() => {
    const handleChange = () => {
      const { angle, type } = window.screen.orientation;

      setOrientation({ angle, type });
    };

    const handleFallbackOrientationChange = () => {
      setOrientation({
        type: 'UNKNOWN',
        angle: window.orientation,
      });
    };

    if (window.screen?.orientation) {
      handleChange();
      window.screen.orientation.addEventListener('change', handleChange);
    } else {
      handleFallbackOrientationChange();
      window.addEventListener(
        'orientationchange',
        handleFallbackOrientationChange
      );
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleChange);
      } else {
        window.removeEventListener(
          'orientationchange',
          handleFallbackOrientationChange
        );
      }
    };
  }, []);

  return orientation;
}
