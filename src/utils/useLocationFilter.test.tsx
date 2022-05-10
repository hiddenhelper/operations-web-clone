import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../test/rootState';

import { useLocationFilter } from './useLocationFilter';
import { generalState } from '../modules/state-mgmt/general';
import { getCountry_1, getCountry_2, getCountry_3, getCountry_4 } from '../test/entities';

describe('useLocationFilter', () => {
  let setQueryParams = jest.fn();
  let store = createMockStore({
    ...getInitialState(),
    general: {
      ...getInitialState().general,
      countryList: [getCountry_1(), getCountry_2(), getCountry_3(), getCountry_4()],
    },
  });

  it('should dispatch fetchCountryListStart', () => {
    generalState.actions.fetchCountryListStart = jest.fn();
    renderHook(() => useLocationFilter({ queryParams: { stateCode: 'CA' }, setQueryParams }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(generalState.actions.fetchCountryListStart).toHaveBeenCalled();
  });

  it('should contain country by its countryCode', () => {
    const { result } = renderHook(() => useLocationFilter({ queryParams: { countryCode: 'PR' }, setQueryParams }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current[1]).toEqual('Puerto Rico');
  });

  it('should contain a state list with countries based on store countryList', () => {
    const { result } = renderHook(() => useLocationFilter({ queryParams: { stateCode: 'CA' }, setQueryParams }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current[0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'UNITEDSTATES',
          name: getCountry_1().name,
        }),
        expect.objectContaining({
          id: 'MEXICO',
          name: getCountry_2().name,
        }),
        expect.objectContaining({
          id: 'PUERTORICO',
          name: getCountry_3().name,
        }),
        expect.objectContaining({
          id: 'CANADA',
          name: getCountry_4().name,
        }),
      ])
    );
    expect(result.current[1]).toEqual('California');
  });

  it('should change location with stateCode', () => {
    const { result } = renderHook(() => useLocationFilter({ queryParams: { stateCode: 'CA' }, setQueryParams }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    act(() => {
      result.current[2]('MX');
    });
    expect(setQueryParams).toHaveBeenCalledWith({
      countryCode: undefined,
      stateCode: 'MX',
    });
  });

  it('should change location with countryCode', () => {
    const { result } = renderHook(() => useLocationFilter({ queryParams: { stateCode: 'CA' }, setQueryParams }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    act(() => {
      result.current[2]('PUERTORICO');
    });
    expect(setQueryParams).toHaveBeenCalledWith({
      countryCode: 'PR',
      stateCode: undefined,
    });
  });
});
