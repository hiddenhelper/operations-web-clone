import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { useHistory } from 'react-router-dom';

import ClientDashboard, { IClientDashboardProps } from './ClientDashboard';

import { getInitialState } from '../../../../../../test/rootState';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
  useLocation: jest.fn().mockReturnValue({ pathname: 'path', search: '' }),
}));

jest.useFakeTimers();

describe('ClientDashboard', () => {
  let wrapper: RenderResult;
  let props: IClientDashboardProps;

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
          <ClientDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change project state filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ClientDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getAllByTestId('autocomplete-filter-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({ countryCode: undefined, period: 1, stateCode: 'AZ' });
  });

  it('should change project period filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ClientDashboard {...props} />
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

  it('should change worker state filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ClientDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[2];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getAllByTestId('autocomplete-filter-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?wPeriod=1&wStateCode="AZ"');
  });

  it('should change worker period filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ClientDashboard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterPeriodBtn = wrapper.getAllByTestId('button-filter-open')[3];

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[2]);
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?wPeriod=3');
  });
});
