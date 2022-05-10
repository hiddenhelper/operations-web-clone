import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';

import FcaDashboard, { IFcaDashboardProps } from './FcaDashboard';

import { getInitialState } from '../../../../../../test/rootState';

jest.useFakeTimers();

describe('FcaDashboard', () => {
  let wrapper: RenderResult;
  let props: IFcaDashboardProps;

  beforeEach(() => {
    props = {
      queryParams: { stateCode: '', period: 1 },
      setQueryParams: jest.fn(),
      onPeriodChange: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <FcaDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change state filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <FcaDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({ countryCode: undefined, period: 1, stateCode: 'AZ' });
  });

  it('should change period filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <FcaDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterPeriodBtn = wrapper.getAllByTestId('button-filter-open')[1];

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.onPeriodChange).toHaveBeenCalledWith(2);
  });
});
