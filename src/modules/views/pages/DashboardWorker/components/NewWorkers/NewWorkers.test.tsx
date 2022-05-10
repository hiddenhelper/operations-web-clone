import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NewWorkers, { INewWorkersProps } from './NewWorkers';

import { getWorkersActivityWidgetStatistics_1 } from '../../../../../../test/entities';

describe('NewWorkers Component', () => {
  let wrapper: RenderResult;
  let props: INewWorkersProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      linePieStatisticsMap: { workersNewWorkers: getWorkersActivityWidgetStatistics_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersNewWorkers: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    wrapper = render(
      <MemoryRouter>
        <NewWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersNewWorkers', () => {
    props.linePieStatisticsMap = {};
    render(
      <MemoryRouter>
        <NewWorkers {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersNewWorkers).toHaveBeenCalled();
  });
});
