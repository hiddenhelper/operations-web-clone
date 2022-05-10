import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getProjectClientsWidget_1 } from '../../../../../../test/entities';
import Clients, { IClientsProps } from './Clients';

describe('Clients Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IClientsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      pieStatisticsMap: { projectClients: getProjectClientsWidget_1() },
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
        <Clients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchClientWidget', () => {
    props.pieStatisticsMap = {};
    render(
      <MemoryRouter>
        <Clients {...props} />
      </MemoryRouter>
    );
    expect(props.fetchClientWidget).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <Clients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
