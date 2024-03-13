import * as React from "react";

export default function useDebounce(value: any, delay: number) {
  const [debounceValue, setDebounceValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
