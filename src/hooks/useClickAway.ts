import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useClickAway(callback) {
  const ref = React.useRef(null);

  const onClick = React.useEffectEvent(callback);

  React.useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClick();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, []);

  return ref;
}
