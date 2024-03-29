import * as React from 'react';

export default function useMouse() {
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const handleMouseMove = (e) => {
      setState((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        setState((prev) => ({
          ...prev,
          elementPositionX: rect.x,
          elementPositionY: rect.y,
          elementX: e.clientX - rect.x,
          elementY: e.clientY - rect.y,
        }));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return [state, ref];
}
