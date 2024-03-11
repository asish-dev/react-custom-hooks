import * as React from 'react';

const useToggle = (initialValue: boolean = true) => {
  const [val, setVal] = React.useState(Boolean(initialValue));

  const handleToggle = React.useCallback((newValue: any) => {
    if (typeof newValue === 'boolean') {
      setVal(newValue);
      return;
    }

    setVal((v) => !v);
  }, []);

  return [val, handleToggle];
};

export default useToggle;
