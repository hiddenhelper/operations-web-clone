import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { IWorkersTabProps } from './WorkersTab';
import WorkersTab from './WorkersTab';

import { getClient_1, getProject_1, getUser_1, getUser_2, getWorker_1, getWorker_2 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';

describe('WorkersTab', () => {
  let props: IWorkersTabProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      isFcAdmin: true,
      workerCount: 1,
      modalCount: null,
      isModalOpen: false,
      queryParams: { page: 1, limit: 30 },
      currentProject: getProject_1(),
      clientMap: {
        [getProject_1().id]: {
          [getClient_1().id]: getClient_1() as any,
        },
      },
      workerProjectMap: {
        [getProject_1().id]: {
          [getWorker_1().id]: { ...getWorker_1(), workerProjectStatus: 0 },
          ['2']: { ...getWorker_1(), id: '2', projectsCount: 1, workerProjectStatus: 0 },
        },
      },
      workerMap: {},
      modalMap: { [getWorker_1().id]: getWorker_1() },
      projectWorkersLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      loadWorkerModalLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      summaryLoading: undefined,
      assignLoading: undefined,
      ctaDisabled: false,
      drawer: { open: false, id: null },
      setDrawer: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      onPageChange: jest.fn(),
      fetchWorkerList: jest.fn(),
      fetchWorkerSummary: jest.fn(),
      assignWorker: jest.fn(),
      fetchProjectWorkerList: jest.fn(),
      clearWorkerMap: jest.fn(),
      setQueryParams: jest.fn(),
      fetchProjectClientList: jest.fn(),
    };
  });

  it('should render empty', () => {
    props.workerProjectMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('There are no Workers assigned'));
  });

  it('should render loading', () => {
    props.projectWorkersLoading = { isLoading: true, hasError: false, error: null };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should assignLoading', () => {
    props.assignLoading = { isLoading: false, hasError: false, error: null };
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.closeModal).toHaveBeenCalled();
    expect(props.fetchProjectWorkerList).toHaveBeenCalled();
  });

  it('should fetchProjectWorkerList', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectWorkerList).toHaveBeenCalled();
  });

  it('should render', () => {
    props.currentProject = { ...getProject_1() };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with company', () => {
    props.workerProjectMap = {
      [getProject_1().id]: {
        [getWorker_2().id]: { ...getWorker_2(), workerProjectStatus: 0 },
      },
    };
    props.currentProject = { ...getProject_1() };
    const { container, getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const workerListRow = getByTestId('worker-list-row');

    act(() => {
      fireEvent.click(workerListRow);
    });

    expect(container).toMatchSnapshot();
  });

  it('should assign worker', () => {
    props.isModalOpen = true;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItem = wrapper.getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('assign-btn-confirm'));
    });

    expect(props.assignWorker).toHaveBeenCalledWith(getProject_1().id, [{ id: getWorker_1().id }]);

    act(() => {
      fireEvent.click(wrapper.getByTestId('assign-btn-close'));
    });

    expect(props.closeModal).toHaveBeenCalled();
  });
});
