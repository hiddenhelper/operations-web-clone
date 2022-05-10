import React from 'react';
import { MemoryRouter } from 'react-router';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getClient_1, getProject_1, getWorker_1, getWorker_2 } from '../../../../../../test/entities';
import WorkerModal, { IWorkerModalProps } from './WorkerModal';
import { getInitialState } from '../../../../../../test/rootState';
import { InviteMethod, WorkerStatus } from 'modules/models/worker';

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

describe('WorkerModal', () => {
  let props: IWorkerModalProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      count: 16,
      isFcAdmin: true,
      loading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      assignLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      workerMap: {
        [getWorker_1().id]: getWorker_1(),
        ['2']: { ...getWorker_1(), id: '2', firstName: 'test2' },
        ['3']: { ...getWorker_1(), id: '3', firstName: 'test3' },
      },
      clientProjectMap: {
        [getProject_1().id]: {
          [getClient_1().id]: getClient_1() as any,
        },
      },
      closeModal: jest.fn(),
      fetchWorkerList: jest.fn(),
      assignWorker: jest.fn(),
      fetchProjectClientList: jest.fn(),
      assignWorkerProjectError: undefined,
    };
  });

  it('should render', () => {
    const { baseElement } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should fetchWorkerList', () => {
    props.workerMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchWorkerList).toHaveBeenCalledWith({
      id: getProject_1().id,
      limit: 6,
      query: '',
      page: 1,
      lastPage: 1,
    });
  });

  it('should render loading', () => {
    props.loading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should search', () => {
    props.loading = null;
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
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

    expect(props.fetchWorkerList).toHaveBeenCalledWith({
      id: getProject_1().id,
      limit: 6,
      page: 1,
      lastPage: 1,
      query: 'search',
    });
  });

  it('should select item', () => {
    const { getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
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

  it('should select migrated item', () => {
    props.workerMap = { ['4']: { ...getWorker_1(), id: '4', firstName: 'test4', invitationStatus: WorkerStatus.MIGRATED } };
    const { getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
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
          <WorkerModal {...props} />
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

    expect(props.fetchWorkerList).toHaveBeenCalledWith({
      id: getProject_1().id,
      limit: 6,
      page: 2,
      lastPage: 1,
      query: '',
    });
  });

  it('should submit', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const assignBtnConfirm = getByTestId('assign-btn-confirm');
    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.assignWorker).toHaveBeenCalledWith(getProject_1().id, [{ id: '2' }]);
  });

  it('should show selected', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
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

    act(() => {
      fireEvent.click(showSelectedBtn);
    });

    act(() => {
      expect(getAllByTestId('assign-list-row')).toHaveLength(2);
    });

    act(() => {
      fireEvent.click(showAllBtn);
    });

    act(() => {
      expect(props.fetchWorkerList).toHaveBeenCalled();
    });
  });

  it('should search with show selected filter', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByTestId('search-filter');
    const checkboxItemTwo = getAllByTestId('multiple-checkbox')[1];
    const checkboxItemThree = getAllByTestId('multiple-checkbox')[2];
    const showSelectedBtn = getByTestId('filter-show-selected');

    act(() => {
      fireEvent.click(checkboxItemThree.querySelector('input'));
    });

    act(() => {
      fireEvent.click(checkboxItemTwo.querySelector('input'));
    });

    act(() => {
      fireEvent.click(showSelectedBtn);
    });

    act(() => {
      fireEvent.change(searchInput, {
        persist: () => {
          /* */
        },
        target: { value: getWorker_1().firstName },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getAllByTestId('assign-list-row')).toHaveLength(1);
  });

  it('should render not found', () => {
    const { getByTestId, getAllByTestId, rerender } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
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

    act(() => {
      fireEvent.click(showSelectedBtn);
    });

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

    act(() => {
      props.loading = {
        isLoading: false,
        hasError: false,
        error: undefined,
      };
      rerender(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <WorkerModal {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(getByTestId('not-found')).toBeTruthy();
  });

  it('should have migrated workers and show error on local validations', () => {
    props.workerMap = { ['4']: { ...getWorker_1(), id: '4', firstName: 'test4', invitationStatus: WorkerStatus.MIGRATED, inviteMethod: InviteMethod.BOTH } };
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const assignBtnConfirm = getByTestId('assign-btn-confirm');
    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    const emailField = getByTestId('worker-email');
    const phoneField = getByTestId('mobile-worker-phone');

    act(() => {
      fireEvent.change(emailField, { target: { value: '' } });
    });

    act(() => {
      fireEvent.change(phoneField, { target: { value: '' } });
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignWorker).not.toHaveBeenCalled();

    act(() => {
      fireEvent.change(emailField, { target: { value: 'dd.co' } });
    });

    act(() => {
      fireEvent.change(phoneField, { target: { value: 2 } });
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignWorker).not.toHaveBeenCalled();

    act(() => {
      fireEvent.change(emailField, { target: { value: 'd@d.co' } });
    });

    act(() => {
      fireEvent.change(phoneField, { target: { value: '+16122222222' } });
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignWorker).toHaveBeenCalled();
  });

  it('should show error on mobile field if filled', () => {
    props.workerMap = { ['4']: { ...getWorker_1(), id: '4', firstName: 'test4', invitationStatus: WorkerStatus.MIGRATED, inviteMethod: InviteMethod.EMAIL } };
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const assignBtnConfirm = getByTestId('assign-btn-confirm');
    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    const emailField = getByTestId('worker-email');
    const phoneField = getByTestId('mobile-worker-phone');

    act(() => {
      fireEvent.change(emailField, { target: { value: 'd@d.co' } });
    });

    act(() => {
      fireEvent.change(phoneField, { target: { value: '+16122' } });
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignWorker).not.toHaveBeenCalled();
  });

  it('should show error on email field if filled', () => {
    props.workerMap = {
      ['4']: { ...getWorker_1(), id: '4', firstName: 'test4', invitationStatus: WorkerStatus.MIGRATED, inviteMethod: InviteMethod.MOBILE_PHONE },
    };
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const assignBtnConfirm = getByTestId('assign-btn-confirm');
    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    const emailField = getByTestId('worker-email');
    const phoneField = getByTestId('mobile-worker-phone');

    act(() => {
      fireEvent.change(emailField, { target: { value: 'dd.co' } });
    });

    act(() => {
      fireEvent.change(phoneField, { target: { value: '+16122222222' } });
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignWorker).not.toHaveBeenCalled();
  });

  it('should show backend validations', () => {
    props.workerMap = {
      ['4']: {
        ...getWorker_2(),
        id: '4',
        firstName: 'test4',
        invitationStatus: WorkerStatus.MIGRATED,
        inviteMethod: null,
        email: undefined,
        mobilePhoneNumber: undefined,
      },
    };
    props.assignWorkerProjectError = {
      isLoading: false,
      hasError: true,
      error: {
        title: '',
        status: 400,
        errors: {
          ['workerInvites[4].mobilePhoneNummber']: ['Mobile Phone Number is already in use.'],
        },
      },
    };
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkerModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const assignBtnConfirm = getByTestId('assign-btn-confirm');
    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    const emailField = getByTestId('worker-email');
    const phoneField = getByTestId('mobile-worker-phone');

    const selectInput = getAllByTestId('controlled-radio-button')[2];
    act(() => {
      fireEvent.click(selectInput);
    });

    act(() => {
      fireEvent.change(emailField, { target: { value: 'd@d.co' } });
    });

    act(() => {
      fireEvent.change(phoneField, { target: { value: '+16122222222' } });
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignWorker).toHaveBeenCalled();
  });
});
