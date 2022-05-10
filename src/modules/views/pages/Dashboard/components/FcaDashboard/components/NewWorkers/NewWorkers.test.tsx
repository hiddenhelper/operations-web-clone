import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NewWorkers, { INewWorkersProps } from './NewWorkers';

import { getWorkersActivityWidgetStatistics_1 } from '../../../../../../../../test/entities';

describe('NewWorkers Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: INewWorkersProps;

  beforeEach(() => {
    props = {
      queryParams: { stateCode: '', period: 0 },
      linePieStatisticsMap: { mainNewWorkers: getWorkersActivityWidgetStatistics_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersActivityWidget: jest.fn(),
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

  it('should fetchWorkersActivityWidget', () => {
    props.linePieStatisticsMap = {};
    render(
      <MemoryRouter>
        <NewWorkers {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersActivityWidget).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <NewWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
