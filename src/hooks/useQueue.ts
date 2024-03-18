import * as React from 'react';

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState(initialValue);

  const add = (element) => {
    setQueue((q) => [...q, element]);
  };

  const remove = () => {
    let removedElement;
    setQueue((prev) => {
      const [firstElement, ...rest] = prev;
      removedElement = firstElement;
      return rest;
    });

    return removedElement;
  };

  const clear = () => {
    setQueue([]);
  };

  return {
    add,
    remove,
    clear,
    first: queue.length === 0 ? null : queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue,
  };
}
