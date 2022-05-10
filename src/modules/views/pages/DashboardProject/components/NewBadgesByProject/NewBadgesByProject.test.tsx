import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByProjectWidget_1 } from '../../../../../../test/entities';
import NewBadgesByProject, { INewBadgesByProjectProps } from './NewBadgesByProject';

describe('NewBadgesByProject Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: INewBadgesByProjectProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { projectNewBadgesByProject: getBadgeByProjectWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchBadgeProject: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewBadgesByProject {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchBadgeProject', () => {
    props.badgeProjectWidget = null;
    render(
      <MemoryRouter>
        <NewBadgesByProject {...props} />
      </MemoryRouter>
    );
    expect(props.fetchBadgeProject).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <NewBadgesByProject {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
