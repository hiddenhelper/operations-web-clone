import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../../test/entities';
import ClientByTrades, { IClientByTradesProps } from './ClientsByTrades';

describe('ClientByTrades Component', () => {
  let wrapper: RenderResult;
  let props: IClientByTradesProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { clientsByTrades: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchClientsByTrades: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <ClientByTrades {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchClientsByTrades', () => {
    props.topTenStatisticsMap = {};
    render(
      <MemoryRouter>
        <ClientByTrades {...props} />
      </MemoryRouter>
    );
    expect(props.fetchClientsByTrades).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <ClientByTrades {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
