import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useTimeout(cb, ms) {
  const id = React.useRef(null);
  const onTimeout = React.useEffectEvent(cb);

  const handleClearTimeout = React.useCallback(() => {
    window.clearTimeout(id.current);
  }, []);

  React.useEffect(() => {
    id.current = window.setTimeout(onTimeout, ms);

    return handleClearTimeout;
  }, [ms]);

  return handleClearTimeout;
}
