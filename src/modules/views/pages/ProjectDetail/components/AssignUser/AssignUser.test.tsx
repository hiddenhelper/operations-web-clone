import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';

import { UserModel } from '../../../../../models';
import { getProject_1, getUser_1, getClient_1 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';

import AssignUser, { IAssignUserProps } from './AssignUser';

jest.useFakeTimers();
jest.mock('../../../../shared/MenuPopover', () => {
  return (() => ({ menuOptionList }) => {
    return (
      <div>
        <button onClick={menuOptionList[0].callback} data-testid="filter-show-all">
          Show {menuOptionList[0].title}
        </button>
        <button onClick={menuOptionList[1].callback} data-testid="filter-show-selected">
          Show {menuOptionList[1].title}
        </button>
      </div>
    );
  })();
});

describe('AssignUser', () => {
  let props: IAssignUserProps;

  beforeEach(() => {
    props = {
      id: getProject_1().id,
      count: 16,
      isFcAdmin: true,
      currentUserRole: UserModel.Role.FCA_ADMIN,
      userCompanyId: getClient_1().id,
      userMap: {
        [getUser_1().id]: getUser_1(),
        ['1']: { ...getUser_1(), id: '1', firstName: 'test 1' },
        ['2']: { ...getUser_1(), id: '2', firstName: 'test 2' },
      },
      clientMap: {
        [getClient_1().id]: getClient_1(),
      },
      clientProjectMap: {
        [getProject_1().id]: {
          [getClient_1().id]: getClient_1() as any,
        },
      },
      userRoleList: [
        { id: '1', name: 'project role 1' },
        { id: '2', name: 'project role 2' },
      ],
      loading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      saveUserLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      assignLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      closeModal: jest.fn(),
      fetchUserProjectList: jest.fn(),
      fetchUserRoleList: jest.fn(),
      fetchClientList: jest.fn(),
      assignUser: jest.fn(),
      saveUser: jest.fn(),
      clearErrors: jest.fn(),
      fetchProjectClientList: jest.fn(),
    };
  });

  it('should fetchUserProjectList', () => {
    props.userMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignUser {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchUserProjectList).toHaveBeenCalledWith({
      limit: 6,
      query: '',
      page: 1,
      lastPage: 1,
      excludeFromProjectId: getProject_1().id,
    });
  });

  it('should fetchClientList', () => {
    props.clientMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignUser {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchClientList).toHaveBeenCalled();
  });

  describe('assign tab', () => {
    it('should render', () => {
      const { baseElement } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(baseElement).toMatchSnapshot();
    });

    it('should render loading', () => {
      props.loading.isLoading = true;
      const { container } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should search', () => {
      const { getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      const searchInput = getByTestId('search-filter');

      act(() => {
        fireEvent.change(searchInput, {
          persist: () => {
            /* */
          },
          target: { value: 'search' },
        });
      });

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(props.fetchUserProjectList).toHaveBeenCalledWith({
        limit: 6,
        page: 1,
        lastPage: 1,
        query: 'search',
        excludeFromProjectId: getProject_1().id,
      });
    });

    it('should select item', () => {
      const { getAllByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      const checkboxItem = getAllByTestId('multiple-checkbox')[0];

      act(() => {
        fireEvent.click(checkboxItem.querySelector('input'));
      });

      expect(checkboxItem.classList).toContain('Mui-checked');

      act(() => {
        fireEvent.click(checkboxItem.querySelector('input'));
      });

      expect(checkboxItem.classList).not.toContain('Mui-checked');
    });

    it('should change page', () => {
      const { getByText } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
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

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(props.fetchUserProjectList).toHaveBeenCalledWith({
        limit: 6,
        page: 2,
        lastPage: 1,
        query: '',
        excludeFromProjectId: getProject_1().id,
      });
    });

    it('should submit', () => {
      const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      const assignBtnConfirm = getByTestId('assign-btn-confirm');
      const checkboxItem = getAllByTestId('multiple-checkbox')[0];
      const userRoleSelect = getAllByText('Select Role')[0];

      act(() => {
        fireEvent.click(checkboxItem.querySelector('input'));
      });

      act(() => {
        fireEvent.mouseDown(userRoleSelect);
      });

      act(() => {
        fireEvent.click(getByText('project role 1'));
      });

      act(() => {
        fireEvent.click(assignBtnConfirm);
      });

      expect(props.assignUser).toHaveBeenCalledWith(getProject_1().id, [{ id: '1', roleId: '1' }]);
    });

    it('should show selected', () => {
      const { getByTestId, getAllByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      const checkboxItemOne = getAllByTestId('multiple-checkbox')[1];
      const checkboxItemTwo = getAllByTestId('multiple-checkbox')[2];
      const showSelectedBtn = getByTestId('filter-show-selected');
      const showAllBtn = getByTestId('filter-show-all');

      act(() => {
        fireEvent.click(checkboxItemOne.querySelector('input'));
      });

      act(() => {
        fireEvent.click(checkboxItemTwo.querySelector('input'));
      });

      fireEvent.click(showSelectedBtn);

      expect(getAllByTestId('assign-list-row')).toHaveLength(2);

      fireEvent.click(showAllBtn);

      expect(props.fetchUserProjectList).toHaveBeenCalled();
    });

    it('should search by name on show selected filter', () => {
      const { getByTestId, getAllByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      const searchInput = getByTestId('search-filter');
      const checkboxItemOne = getAllByTestId('multiple-checkbox')[0];
      const checkboxItemTwo = getAllByTestId('multiple-checkbox')[1];
      const showSelectedBtn = getByTestId('filter-show-selected');

      act(() => {
        fireEvent.click(checkboxItemOne.querySelector('input'));
      });

      act(() => {
        fireEvent.click(checkboxItemTwo.querySelector('input'));
      });

      fireEvent.click(showSelectedBtn);

      act(() => {
        fireEvent.change(searchInput, {
          persist: () => {
            /* */
          },
          target: { value: 'test 1' },
        });
      });

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getAllByTestId('assign-list-row')).toHaveLength(1);
    });

    it('should render not found', () => {
      const { getByTestId, getAllByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      const searchInput = getByTestId('search-filter');
      const checkboxItemOne = getAllByTestId('multiple-checkbox')[0];
      const checkboxItemTwo = getAllByTestId('multiple-checkbox')[1];
      const showSelectedBtn = getByTestId('filter-show-selected');

      act(() => {
        fireEvent.click(checkboxItemOne.querySelector('input'));
      });

      act(() => {
        fireEvent.click(checkboxItemTwo.querySelector('input'));
      });

      fireEvent.click(showSelectedBtn);

      act(() => {
        fireEvent.change(searchInput, {
          persist: () => {
            /* */
          },
          target: { value: 'something' },
        });
      });

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByTestId('not-found')).toBeTruthy();
    });
  });

  describe('create tab', () => {
    it('should render', () => {
      const { queryByTestId, getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      act(() => {
        fireEvent.click(getByTestId('tab-create-new-btn'));
      });

      expect(queryByTestId('search-filter')).toBeFalsy();

      act(() => {
        fireEvent.click(getByTestId('tab-assign-list-btn'));
      });

      expect(queryByTestId('search-filter')).toBeTruthy();
    });

    it('should render default', () => {
      props.saveUserLoading = undefined;

      const { queryByTestId, getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      act(() => {
        fireEvent.click(getByTestId('tab-create-new-btn'));
      });

      expect(queryByTestId('search-filter')).toBeFalsy();

      act(() => {
        fireEvent.click(getByTestId('tab-assign-list-btn'));
      });

      expect(queryByTestId('search-filter')).toBeTruthy();
    });

    it('should create user', async () => {
      const { getByTestId, getByText, debug } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      await act(async () => {
        await fireEvent.click(getByTestId('tab-create-new-btn'));
      });

      act(() => {
        fireEvent.change(getByTestId('user-first-name'), { target: { name: 'firstName', value: 'firstName' } });
      });
      act(() => {
        fireEvent.change(getByTestId('user-last-name'), { target: { name: 'lastName', value: 'lastName' } });
      });
      act(() => {
        fireEvent.change(getByTestId('user-email'), { target: { name: 'email', value: 'email@test.com' } });
      });
      act(() => {
        fireEvent.change(getByTestId('user-title'), { target: { name: 'title', value: 'title' } });
      });
      act(() => {
        fireEvent.change(getByTestId('mobile-user-phone'), { target: { name: 'mobilePhoneNumber', value: '+17323283234' } });
      });

      act(() => {
        fireEvent.mouseDown(getByText('Select Option'));
      });

      act(() => {
        fireEvent.click(getByText('Robert C. Martin'));
      });

      await act(async () => {
        await fireEvent.click(getByTestId('create-user-btn'));
      });

      expect(props.saveUser).toHaveBeenCalledWith(getClient_1().id, {
        companyId: null,
        email: 'email@test.com',
        firstName: 'firstName',
        id: undefined,
        invitationType: 0,
        lastName: 'lastName',
        mobilePhoneNumber: '+17323283234',
        officePhoneExtension: null,
        officePhoneNumber: null,
        preferredContactMethod: 0,
        title: 'title',
        assignClient: getClient_1().id,
      });
    });

    it('should show validation', () => {
      const { getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <AssignUser {...props} />
          </MemoryRouter>
        </Provider>
      );

      act(() => {
        fireEvent.click(getByTestId('tab-create-new-btn'));
      });

      act(() => {
        fireEvent.change(getByTestId('user-first-name'), { target: { name: 'firstName', value: 'firstName' } });
      });
      act(() => {
        fireEvent.change(getByTestId('user-last-name'), { target: { name: 'lastName', value: 'lastName' } });
      });
      act(() => {
        fireEvent.change(getByTestId('user-email'), { target: { name: 'email', value: 'email@test.com' } });
      });
      act(() => {
        fireEvent.change(getByTestId('user-title'), { target: { name: 'title', value: 'title' } });
      });
      act(() => {
        fireEvent.change(getByTestId('mobile-user-phone'), { target: { name: 'mobilePhoneNumber', value: '+1 (732) 328-3234' } });
      });

      act(() => {
        fireEvent.click(getByTestId('create-user-btn'));
      });

      expect(props.saveUser).not.toHaveBeenCalled();
    });
  });
});
