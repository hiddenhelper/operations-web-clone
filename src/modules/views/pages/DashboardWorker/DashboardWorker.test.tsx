import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { useHistory } from 'react-router-dom';

import { getInitialState } from '../../../../test/rootState';
import DashboardWorker, { IDashboardWorkerProps } from './DashboardWorker';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
  useLocation: jest.fn().mockReturnValue({ pathname: 'path', search: '' }),
}));

jest.useFakeTimers();

describe('DashboardWorker Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IDashboardWorkerProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      clearStatistics: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <DashboardWorker {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should clear statistics', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <DashboardWorker {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearStatistics).toHaveBeenCalled();
  });

  it('should change state filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <DashboardWorker {...props} />
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

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?stateCode="AZ"&period=1');
  });

  it('should change period filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <DashboardWorker {...props} />
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

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?stateCode="AZ"&period=1');
  });
});
