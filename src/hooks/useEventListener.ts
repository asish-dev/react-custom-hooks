import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useEventListener(target, eventName, handler, options) {
  const onHandler = React.useEffectEvent(handler);

  React.useEffect(() => {
    const targetElement = target.current ?? target;

    if (!targetElement?.addEventListener) return;

    targetElement.addEventListener(eventName, onHandler, options);

    return () => {
      targetElement.removeEventListener(eventName, onHandler, options);
    };
  }, [target, eventName, options]);
}
