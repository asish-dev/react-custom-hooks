import * as React from 'react';

export default function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (callback) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);

      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    const matchMedia = window.matchMedia(query);

    return matchMedia.matches;
  };

  const getServerSnapshot = () => {
    throw Error('useMediaQuery is a client-only hook');
  };
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
