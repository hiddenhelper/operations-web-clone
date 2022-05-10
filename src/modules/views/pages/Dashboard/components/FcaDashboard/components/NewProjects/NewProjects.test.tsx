import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NewProjects, { INewProjectsProps } from './NewProjects';

import { getProjectWidgetStatistics_1 } from '../../../../../../../../test/entities';

describe('NewProjects Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: INewProjectsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      linePieStatisticsMap: { mainNewProjects: getProjectWidgetStatistics_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchProjectWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewProjects {...props} />
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
        <NewProjects {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchProjectWidget', () => {
    props.linePieStatisticsMap = {};
    render(
      <MemoryRouter>
        <NewProjects {...props} />
      </MemoryRouter>
    );
    expect(props.fetchProjectWidget).toHaveBeenCalled();
  });
});
