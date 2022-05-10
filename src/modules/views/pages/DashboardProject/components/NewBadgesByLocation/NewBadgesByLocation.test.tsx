import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../../test/entities';
import NewBadgesByLocation, { INewBadgesByLocationProps } from './NewBadgesByLocation';

describe('NewBadgesByLocation Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: INewBadgesByLocationProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { projectNewBadgesByLocation: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchBadgeLocation: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewBadgesByLocation {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchBadgeLocation', () => {
    props.badgeLoactionWidget = null;
    render(
      <MemoryRouter>
        <NewBadgesByLocation {...props} />
      </MemoryRouter>
    );
    expect(props.fetchBadgeLocation).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <NewBadgesByLocation {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
