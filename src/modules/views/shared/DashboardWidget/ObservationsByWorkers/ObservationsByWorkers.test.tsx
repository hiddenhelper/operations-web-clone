import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../test/entities';
import ObservationsByWorkers, { IObservationsByWorkersProps } from './ObservationsByWorkers';

describe('ObservationsByWorkers Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IObservationsByWorkersProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { observationsByWorkers: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersObservations: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <ObservationsByWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersObservations', () => {
    props.topTenStatisticsMap = {};
    render(
      <MemoryRouter>
        <ObservationsByWorkers {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersObservations).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <ObservationsByWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
