import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import ProjectsRevenue, { IProjectsRevenueProps } from './ProjectsRevenue';

import { UserModel } from '../../../../models';
import { getGrossRevenueWidgetStatistics_1 } from '../../../../../test/entities';

describe('ProjectsRevenue Component', () => {
  let wrapper: RenderResult;
  let props: IProjectsRevenueProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      isFcaUser: true,
      isAdmin: true,
      queryParams: { stateCode: '', period: 0 },
      grossRevenueWidgetStatistics: getGrossRevenueWidgetStatistics_1(),
      grossRevenueWidgetLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchGrossRevenueWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <ProjectsRevenue {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should grossRevenueWidgetStatistics', () => {
    props.grossRevenueWidgetStatistics = null;
    render(
      <MemoryRouter>
        <ProjectsRevenue {...props} />
      </MemoryRouter>
    );
    expect(props.fetchGrossRevenueWidget).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.grossRevenueWidgetLoading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <ProjectsRevenue {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
