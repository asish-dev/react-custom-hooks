import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb, ms) {
  const id = React.useRef(null);
  const onInterval = React.useEffectEvent(cb);

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(id.current);
  }, []);

  React.useEffect(() => {
    id.current = window.setInterval(onInterval, ms);
    return handleClearInterval;
  }, [ms, handleClearInterval]);

  return handleClearInterval;
}
