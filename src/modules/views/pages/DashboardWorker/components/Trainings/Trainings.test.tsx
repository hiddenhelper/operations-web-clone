import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getProjectClientsWidget_1 } from '../../../../../../test/entities';
import WorkerTrainigsWidget, { IWorkerTrainigsWidgetProps } from './Trainings';

describe('WorkerTrainigsWidget Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IWorkerTrainigsWidgetProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      pieStatisticsMap: { workersTrainings: getProjectClientsWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersTrainings: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkerTrainigsWidget {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersTrainings', () => {
    props.pieStatisticsMap = {};
    render(
      <MemoryRouter>
        <WorkerTrainigsWidget {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersTrainings).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <WorkerTrainigsWidget {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
