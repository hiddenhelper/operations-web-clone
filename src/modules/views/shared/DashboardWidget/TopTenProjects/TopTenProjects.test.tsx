import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { UserModel } from '../../../../models';
import { getInitialState } from '../../../../../test/rootState';
import { getProjectTopTenStatistics_1 } from '../../../../../test/entities';
import TopTenProjects, { ITopTenProjectsProps } from './TopTenProjects';

describe('TopTenProjects Component', () => {
  let wrapper: RenderResult;
  let props: ITopTenProjectsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      isFcaUser: true,
      isAdmin: true,
      queryParams: { stateCode: '', period: 0 },
      projectTopTenWidget: getProjectTopTenStatistics_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchProjectTopTen: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenProjects {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchProjectTopTen', () => {
    props.projectTopTenWidget = null;
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenProjects {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectTopTen).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <TopTenProjects {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
