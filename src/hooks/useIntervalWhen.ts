import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const id = React.useRef(null);

  const onInterval = React.useEffectEvent(cb);
  const immediate = React.useRef(startImmediately);

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(id.current);
  }, []);

  React.useEffect(() => {
    if (when) {
      id.current = window.setInterval(onInterval, ms);

      if (immediate.current) {
        onInterval();
        immediate.current = false;
      }

      return handleClearInterval;
    }
  }, [ms, when, handleClearInterval]);

  return handleClearInterval;
}
