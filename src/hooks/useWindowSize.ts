import * as React from 'react';

const subscribe = (callback) => {
  window.addEventListener('resize', callback);

  return () => {
    window.removeEventListener('resize', callback);
  };
};

let snapshot = {
  height: 0,
  width: 0,
};

const getSnapshot = () => {
  if (
    snapshot.height !== window.innerHeight ||
    snapshot.width !== window.innerWidth
  )
    snapshot = { height: window.innerHeight, width: window.innerWidth };
  return snapshot;
};

const getServerSnapshot = () => {
  throw Error('This is a client-only hook');
};
export default function useWindowSize() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
