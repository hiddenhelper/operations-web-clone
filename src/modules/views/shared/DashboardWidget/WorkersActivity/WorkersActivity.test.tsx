import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getProjectWorkersActivityStatistics_1 } from '../../../../../test/entities';
import WorkersActivity, { IWorkersActivityProps } from './WorkersActivity';

describe('WorkersActivity Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IWorkersActivityProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      linePieStatisticsMap: { projectWorkersActivity: getProjectWorkersActivityStatistics_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersActivity: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <WorkersActivity {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersActivity', () => {
    props.workerActivityWidget = null;
    render(
      <MemoryRouter>
        <WorkersActivity {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersActivity).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <WorkersActivity {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
