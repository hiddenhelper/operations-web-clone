import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { useScroll } from './useScroll';

describe('useScroll', () => {
  it('should toggleClass false', () => {
    const {
      result: {
        current: { toggleClass },
      },
    } = renderHook(() =>
      useScroll({
        scrollPosition: 100,
      })
    );
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 101 } });
    });
    expect({ toggleClass }).toEqual({
      toggleClass: false,
    });
  });

  it('should toggleClass true', () => {
    const { result } = renderHook(() =>
      useScroll({
        scrollPosition: 100,
      })
    );
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 120 } });
    });
    expect(result.current.toggleClass).toEqual(true);
  });
});
