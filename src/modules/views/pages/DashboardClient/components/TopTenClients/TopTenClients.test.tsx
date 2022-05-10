import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { getInitialState } from '../../../../../../test/rootState';
import { getClientTopTenStatistics_1 } from '../../../../../../test/entities';

import TopTenClients, { ITopTenClientsProps } from './TopTenClients';

describe('TopTenClients Component', () => {
  let wrapper: RenderResult;
  let props: ITopTenClientsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      clientTopTenWidget: getClientTopTenStatistics_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchClientTopTen: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenClients {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchClientTopTen', () => {
    props.clientTopTenWidget = null;
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenClients {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchClientTopTen).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenClients {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should navigate', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenClients {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('navigate-btn')[0]);
    });

    expect(props.navigate).toHaveBeenCalled();
  });
});
