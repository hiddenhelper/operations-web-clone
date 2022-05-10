import { useCallback, useState, useLayoutEffect } from 'react';

export interface IUseScrollProps {
  scrollPosition: number;
}

export function useScroll({ scrollPosition }: IUseScrollProps) {
  const [toggleClass, setToggleClass] = useState(false);

  const onScroll = useCallback(() => {
    const shouldChange: boolean = window.scrollY > scrollPosition;
    /* istanbul ignore else */
    if (shouldChange !== toggleClass) setToggleClass(shouldChange);
  }, [toggleClass, scrollPosition]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  return { toggleClass };
}
