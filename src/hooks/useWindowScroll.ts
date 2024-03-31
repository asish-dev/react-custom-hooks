import * as React from 'react';

export default function useWindowScroll() {
  const [state, setState] = React.useState({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = React.useCallback((...args) => {
    if (typeof args[0] === 'object') {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error('Invalid arguments passed to scrollTo');
    }
  }, []);

  return [state, scrollTo];
}
