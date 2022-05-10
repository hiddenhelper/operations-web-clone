import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generalState } from '../modules/state-mgmt/general';
import { IRootState } from '../modules/state-mgmt/rootState';

export function useHideScroll() {
  const dispatch = useDispatch();
  const isScrollHided = useSelector((state: IRootState) => state.general.hideScroll);
  const scrollWidth = useMemo(() => window.innerWidth - document.documentElement.clientWidth, [window.innerWidth]); // eslint-disable-line

  const setHideScroll = useCallback(
    (hide: boolean, overflow?: string) => {
      if (hide) {
        if (overflow) {
          document.documentElement.style.overflow = overflow;
        }
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.paddingRight = '';
      }
      dispatch(generalState.actions.setHideScroll(hide));
    },
    [dispatch]
  );

  return { isScrollHided, scrollWidth, setHideScroll };
}
