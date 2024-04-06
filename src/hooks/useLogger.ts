import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, ...rest) {
  const initialRenderRef = React.useRef(true);

  const logData = React.useEffectEvent((event) => {
    console.log(`${name} ${event}:`, rest);
  });

  React.useEffect(() => {
    if (initialRenderRef.current === false) logData('updated');
  });

  React.useEffect(() => {
    logData('mounted');
    initialRenderRef.current = false;

    return () => {
      logData('unmounted');
      initialRenderRef.current = true;
    };
  }, []);
}
