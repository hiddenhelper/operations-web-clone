import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { generalState } from 'modules/state-mgmt/general';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from 'test/rootState';
import { useHideScroll } from './useHideScroll';

describe('useHideScroll', () => {
  let store = createMockStore({
    ...getInitialState(),
  });

  it('Should not set overflow property on window object', () => {
    generalState.actions.fetchCountryListStart = jest.fn();
    const {
      result: {
        current: { setHideScroll },
      },
    } = renderHook(() => useHideScroll(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    act(() => {
      setHideScroll(true);
    });
    expect(window.document.documentElement.style.overflow).toEqual('');
  });

  it('Should set overflow hidden property on window object', () => {
    generalState.actions.fetchCountryListStart = jest.fn();
    const {
      result: {
        current: { setHideScroll },
      },
    } = renderHook(() => useHideScroll(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    act(() => {
      setHideScroll(true, 'hidden');
    });
    expect(window.document.documentElement.style.overflow).toEqual('hidden');
  });

  it('Should set overflow empty property on window object', () => {
    generalState.actions.fetchCountryListStart = jest.fn();
    const {
      result: {
        current: { setHideScroll },
      },
    } = renderHook(() => useHideScroll(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    act(() => {
      setHideScroll(false);
    });
    expect(window.document.documentElement.style.overflow).toEqual('');
  });
});
