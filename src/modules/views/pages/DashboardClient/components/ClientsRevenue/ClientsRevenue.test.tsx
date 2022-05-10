import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getGrossRevenueWidgetStatistics_1 } from '../../../../../../test/entities';
import ClientsRevenue, { IClientsRevenueProps } from './ClientsRevenue';

describe('ClientsRevenue Component', () => {
  let wrapper: RenderResult;
  let props: IClientsRevenueProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      grossRevenueWidgetStatistics: getGrossRevenueWidgetStatistics_1(),
      grossRevenueWidgetLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchClientRevenueWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <ClientsRevenue {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should grossRevenueWidgetStatistics', () => {
    props.grossRevenueWidgetStatistics = null;
    render(
      <MemoryRouter>
        <ClientsRevenue {...props} />
      </MemoryRouter>
    );
    expect(props.fetchClientRevenueWidget).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.grossRevenueWidgetLoading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <ClientsRevenue {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
