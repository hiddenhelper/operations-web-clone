import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../../test/entities';
import WorkersByProject, { IWorkersByProjectProps } from './WorkersByProject';

describe('WorkersByProject Component', () => {
  let wrapper: RenderResult;
  let props: IWorkersByProjectProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { workersByProject: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersByProject: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByProject {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersByProject', () => {
    props.topTenStatisticsMap = {};
    render(
      <MemoryRouter>
        <WorkersByProject {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersByProject).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <WorkersByProject {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
