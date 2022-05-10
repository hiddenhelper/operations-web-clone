import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../test/entities';
import WorkersByTradesNonMinority, { IWorkersByTradesNonMinorityProps } from './WorkersByTradesNonMinority';

describe('WorkersByTradesNonMinority Component', () => {
  let wrapper: RenderResult;
  let props: IWorkersByTradesNonMinorityProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { workersByTradesNonMinority: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersByTradesNonMinority: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByTradesNonMinority {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersByTradesNonMinority', () => {
    props.topTenStatisticsMap = {};
    render(
      <MemoryRouter>
        <WorkersByTradesNonMinority {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersByTradesNonMinority).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <WorkersByTradesNonMinority {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
