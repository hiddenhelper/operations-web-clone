import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByProjectWidget_1, getWorkerByDemographicDataWidget_1 } from '../../../../../../test/entities';
import WorkersByDemographicData, { IWorkersByDemographicDataProps } from './WorkersByDemographicData';

describe('WorkersByDemographicData Component', () => {
  let wrapper: RenderResult;
  let props: IWorkersByDemographicDataProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      pieStatisticsMap: { workersByDemographicData: getWorkerByDemographicDataWidget_1() },
      topTenStatisticsMap: { workersByDemographicData: getBadgeByProjectWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersByDemographicData: jest.fn(),
      fetchWorkersByEthnicity: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByDemographicData {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersByDemographicData', () => {
    props.pieStatisticsMap = {};
    render(
      <MemoryRouter>
        <WorkersByDemographicData {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersByDemographicData).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <WorkersByDemographicData {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change filter', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByDemographicData {...props} />
      </MemoryRouter>
    );

    const filterPeriodBtn = wrapper.getByTestId('button-filter-open');

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.fetchWorkersByDemographicData).toHaveBeenCalledWith('workersByDemographicData', { period: 0, stateCode: '' }, 2);
  });

  it('should fetchWorkersByEthnicity', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersByDemographicData {...props} />
      </MemoryRouter>
    );

    const filterPeriodBtn = wrapper.getByTestId('button-filter-open');

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[0]);
    });

    expect(props.fetchWorkersByEthnicity).toHaveBeenCalledWith('workersByDemographicData', { period: 0, stateCode: '' });
  });
});
