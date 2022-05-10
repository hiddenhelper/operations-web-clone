import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getClient_1, getProject_1, getUser_1, getUser_2 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import UsersTab, { IUsersTabProps } from './UsersTab';

describe('UsersTab', () => {
  let props: IUsersTabProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      queryParams: { page: 1, limit: 15 },
      isFcAdmin: true,
      userMap: {
        [getProject_1().id]: {
          [getUser_1().id]: getUser_1(),
          [getUser_2().id]: { ...getUser_2(), id: 'user-id-2' },
        },
      },
      clientMap: {
        [getProject_1().id]: {
          [getClient_1().id]: getClient_1() as any,
        },
      },
      userCount: 16,
      isModalOpen: true,
      ctaDisabled: false,
      userLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      assignUserLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      openModal: jest.fn(),
      closeModal: jest.fn(),
      onPageChange: jest.fn(),
      fetchUserList: jest.fn(),
      clearUserMap: jest.fn(),
      setQueryParams: jest.fn(),
      fetchProjectClientList: jest.fn(),
    };
  });

  it('should fetchUserList', () => {
    props.userMap = {};
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchUserList).toHaveBeenCalled();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render empty', () => {
    props.userMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.userLoading = { isLoading: true, hasError: false, error: null };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should unmount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearUserMap).toMatchSnapshot();
  });

  it('should change user page', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageItem = getByText('2');

    act(() => {
      fireEvent.click(pageItem);
    });

    act(() => {
      fireEvent.click(pageItem);
    });

    expect(props.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should change client filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <UsersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByText('All Clients')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Robert C. Martin'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });
});
