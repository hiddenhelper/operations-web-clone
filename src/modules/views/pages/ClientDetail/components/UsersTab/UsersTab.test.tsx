import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { render } from '@testing-library/react';

import UsersTab, { IUsersTabProps } from './UsersTab';
import { getClient_1, getUser_1 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';

describe.skip('UsersTab', () => {
  let props: IUsersTabProps;

  beforeEach(() => {
    props = {
      userCount: 1,
      userMap: {
        [getClient_1().id]: {
          [getUser_1().id]: { ...getUser_1() },
        },
      },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      queryParams: { page: 1, limit: 30 },
      clientId: getClient_1().id,
      onPageChange: jest.fn(),
      fetchUserList: jest.fn(),
    };
  });

  it.skip('should render empty', () => {
    props.userMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('There are no Users assigned'));
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetchUserList', () => {
    props.userMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchUserList).toHaveBeenCalled();
  });
});
