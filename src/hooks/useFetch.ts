import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...initialState };
    case 'fetched':
      return { ...initialState, data: action.payload };
    case 'error':
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch(url, options) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cacheRef = React.useRef({});

  const onFetch = React.useEffectEvent((url) => {
    return fetch(url, options);
  });

  React.useEffect(() => {
    if (typeof url !== 'string') return;

    let ignore = false;

    const fetchData = async () => {
      if (cacheRef.current[url]) {
        dispatch({ type: 'fetched', payload: cacheRef.current[url] });
        return;
      }

      dispatch({ type: 'loading' });
      try {
        const res = await onFetch(url);
        const resJson = await res.json();
        cacheRef.current[url] = resJson;

        if (ignore === false) dispatch({ type: 'fetched', payload: resJson });
      } catch (err) {
        if (ignore === false) dispatch({ type: 'error', payload: err });
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}
