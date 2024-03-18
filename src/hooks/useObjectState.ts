import * as React from 'react';

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export default function useObjectState(initialValue) {
  const [objState, setObjState] = React.useState(initialValue);

  const handleUpdate = (arg) => {
    if (typeof arg === 'function') {
      setObjState((s) => {
        const newState = arg(s);

        if (isPlainObject(newState)) {
          return {
            ...s,
            ...newState,
          };
        }
      });
    }

    if (isPlainObject(arg)) {
      setObjState((prev) => ({
        ...prev,
        ...arg,
      }));
    }
  };

  return [objState, handleUpdate];
}
