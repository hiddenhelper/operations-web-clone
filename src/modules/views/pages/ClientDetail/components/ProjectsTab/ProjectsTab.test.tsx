import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { render, act, fireEvent } from '@testing-library/react';

import ProjectsTab, { IProjectsTabProps } from './ProjectsTab';
import { getClient_1, getProject_1, getProject_4, getProject_5 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';

describe.skip('ProjectsTab', () => {
  let props: IProjectsTabProps;

  beforeEach(() => {
    props = {
      projectCount: 1,
      projectClientMap: {
        [getClient_1().id]: {
          [getProject_1().id]: getProject_1(),
          [getProject_5().id]: { ...getProject_5(), jobSiteAddress: { ...getProject_5().jobSiteAddress, stateName: 'state name' } },
        },
      },
      projectMap: {},
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      loadingSummary: undefined,
      queryParams: { page: 1, limit: 30 },
      clientId: getClient_1().id,
      drawer: false,
      setDrawer: jest.fn(),
      setQueryParams: jest.fn(),
      onPageChange: jest.fn(),
      fetchProjectList: jest.fn(),
      fetchProjectSummary: jest.fn(),
    };
  });

  it('should render empty', () => {
    props.projectClientMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('There are no Projects assigned'));
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render secondary values', () => {
    props.projectClientMap = {
      [getClient_1().id]: {
        [getProject_4().id]: { ...getProject_4(), startDate: null, endDate: null },
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetchProjectList', () => {
    props.projectMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectList).toHaveBeenCalledWith(getClient_1().id, { limit: 30, page: 1 });
  });

  it('should change role filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterRoleBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterRoleBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[2]);
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({ limit: 30, page: 1, role: 1 });
  });
});
