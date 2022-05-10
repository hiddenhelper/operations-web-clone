import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../../test/entities';
import WorkersByJobdata, { IWorkersByJobdataProps } from './WorkersByJobData';

describe('WorkersByJobdata Component', () => {
  let wrapper: RenderResult;
  let props: IWorkersByJobdataProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { workersByJobdata: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersByJobDataStart: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByJobdata {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersByJobDataStart', () => {
    props.topTenStatisticsMap = {};
    render(
      <MemoryRouter>
        <WorkersByJobdata {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersByJobDataStart).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <WorkersByJobdata {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change filter', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByJobdata {...props} />
      </MemoryRouter>
    );

    const filterPeriodBtn = wrapper.getByTestId('button-filter-open');

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.fetchWorkersByJobDataStart).toHaveBeenCalledWith('workersByJobdata', { period: 0, stateCode: '' }, 1);
  });
});
