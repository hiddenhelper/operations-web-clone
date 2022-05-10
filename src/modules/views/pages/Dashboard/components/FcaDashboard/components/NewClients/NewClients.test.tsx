import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getClientWidgetStatistics_1 } from '../../../../../../../../test/entities';
import NewClients, { INewClientsProps } from './NewClients';

describe('NewClients Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: INewClientsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      pieStatisticsMap: { mainNewClients: getClientWidgetStatistics_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchClientWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchClientWidget', () => {
    props.pieStatisticsMap = {};
    render(
      <MemoryRouter>
        <NewClients {...props} />
      </MemoryRouter>
    );
    expect(props.fetchClientWidget).toHaveBeenCalled();
  });

  it('should render loading new clients', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <NewClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
