import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { useHistory } from 'react-router-dom';

import Dashboard, { IDashboardProps } from './Dashboard';

import { getTodayWidgetStatistiscs_1, getTodayWidgetStatistiscs_2, getTodayWidgetStatistiscs_3 } from '../../../../test/entities';
import { getInitialState, getAdminInitialState, getClientAdminInitialState } from '../../../../test/rootState';
import { UserModel } from '../../../models';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
  useLocation: jest.fn().mockReturnValue({ pathname: 'path', search: '' }),
}));

jest.useFakeTimers();

describe.skip('Dashboard Component', () => {
  let wrapper: RenderResult;
  let props: IDashboardProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      isFcaUser: true,
      isAdmin: true,
      currentUserPermissions: [],
      newBadges: getTodayWidgetStatistiscs_1(),
      grossRevenue: getTodayWidgetStatistiscs_2(),
      workersActivity: getTodayWidgetStatistiscs_3(),
      newBadgesLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      grossRevenueLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      workersActivityLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchNewBadges: jest.fn(),
      fetchWorkersActivity: jest.fn(),
      fetchGrossRevenue: jest.fn(),
      clearStatistics: jest.fn(),
    };
  });

  it.skip('should render FcaDashboard', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <Dashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should render ClientDashboard', () => {
    wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState()) as any}>
        <MemoryRouter>
          <Dashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchNewBadges', () => {
    props.newBadges = null;
    props.grossRevenue = null;
    props.workersActivity = null;
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Dashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchNewBadges).toHaveBeenCalled();
    expect(props.fetchWorkersActivity).toHaveBeenCalled();
    expect(props.fetchGrossRevenue).toHaveBeenCalled();
  });

  it('should render loading new badges', () => {
    props.newBadgesLoading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Dashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.getByTestId('statistics-widget-skeleton'));
  });

  it('should render no new badges', () => {
    props.newBadges = { newBadgesAmount: 0, lastBadgeCreation: getTodayWidgetStatistiscs_1().lastBadgeCreation };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Dashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.getByText('No activity today'));
  });

  it('should clear statistics', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Dashboard {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearStatistics).toHaveBeenCalled();
  });

  it.skip('should change state filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <Dashboard {...props} />
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

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?stateCode="AZ"&period=1&timeZoneOffset="-08:00"');
  });

  it.skip('should change period filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <Dashboard {...props} />
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
    expect(push).toHaveBeenCalledWith('path?stateCode=""&period=2&timeZoneOffset="-08:00"');
  });
});
