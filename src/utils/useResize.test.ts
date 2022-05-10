import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { useResize } from './useResize';

describe('useResize', () => {
  it('should resize', () => {
    const {
      result: {
        current: { screen },
      },
    } = renderHook(() => useResize());

    expect({ screen }).toEqual({
      screen: {
        innerHeight: 768,
        innerWidth: 1024,
      },
    });

    act(() => {
      (window as any).innerWidth = 500;
      (window as any).innerHeight = 500;
      fireEvent(window, new Event('resize'));
    });
  });
});
