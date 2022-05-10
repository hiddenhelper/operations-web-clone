import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NewAssignedWorkers, { INewAssignedWorkersProps } from './NewAssignedWorkers';

import { getProjectWidgetStatistics_1 } from '../../../../../../../../test/entities';

describe('NewAssignedWorkers Component', () => {
  let wrapper: RenderResult;
  let props: INewAssignedWorkersProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      linePieStatisticsMap: { mainNewAssignedWorkers: getProjectWidgetStatistics_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewAssignedWorkers {...props} />
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
        <NewAssignedWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersWidget', () => {
    props.linePieStatisticsMap = {};
    render(
      <MemoryRouter>
        <NewAssignedWorkers {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersWidget).toHaveBeenCalled();
  });
});
