import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getProjectActiviesWidget_1 } from '../../../../../test/entities';
import NewActiveProjects, { INewActiveProjectsProps } from './NewActiveProjects';

describe('NewActiveProjects Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: INewActiveProjectsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      locationWidget: getProjectActiviesWidget_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchActiveProjects: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewActiveProjects {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchActiveProjects', () => {
    props.locationWidget = null;
    render(
      <MemoryRouter>
        <NewActiveProjects {...props} />
      </MemoryRouter>
    );
    expect(props.fetchActiveProjects).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <NewActiveProjects {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
