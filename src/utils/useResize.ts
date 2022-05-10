import { useCallback, useState, useLayoutEffect } from 'react';

interface IResizeState {
  innerWidth: number;
  innerHeight: number;
}

export function useResize() {
  const [screen, setScreen] = useState<IResizeState>({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  const updateSize = useCallback(() => setScreen({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }), [setScreen]);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);
  return { screen };
}
