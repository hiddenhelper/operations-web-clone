import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';

import { getClient_1, getNamedEntity_1, getWorker_1 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import { IWorkersTabProps } from './WorkersTab';

import WorkersTab from './WorkersTab';

jest.useFakeTimers();

describe.skip('WorkersTab', () => {
  let props: IWorkersTabProps;

  beforeEach(() => {
    props = {
      workerCount: 1,
      workerClientMap: {
        [getClient_1().id]: {
          [getWorker_1().id]: { ...getWorker_1() },
          ['2']: { ...getWorker_1(), id: '2', projectsCount: 1 },
        },
      },
      workerMap: {},
      uiRelationMap: {},
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      loadingSummary: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      queryParams: { page: 1, limit: 30 },
      currentClient: getClient_1(),
      drawer: false,
      setDrawer: jest.fn(),
      onPageChange: jest.fn(),
      setQueryParams: jest.fn(),
      fetchWorkerList: jest.fn(),
      fetchWorkerSummary: jest.fn(),
      clearWorkerMap: jest.fn(),
      searchProjectStart: jest.fn(),
      clearRelationMap: jest.fn(),
    };
  });

  it('should render empty', () => {
    props.workerClientMap = {};
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
    props.loading = { isLoading: true, hasError: false, error: null };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render', () => {
    const { container, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const workerListRow = getAllByTestId('worker-client-list-row')[0];

    act(() => {
      fireEvent.click(workerListRow);
    });

    expect(container).toMatchSnapshot();
  });

  it('should unmount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearWorkerMap).toHaveBeenCalled();
    expect(props.clearRelationMap).toHaveBeenCalled();
  });

  it('should fetchWorkerList', () => {
    props.workerClientMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchWorkerList).toHaveBeenCalled();
  });

  it('should show selectedProjectFilter', () => {
    props.uiRelationMap = {
      'project-by-worker-company': {
        searchResult: [getNamedEntity_1()],
      },
    };
    props.queryParams = {
      projectId: getNamedEntity_1().id,
      page: 1,
      limit: 15,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should change location filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getAllByTestId('autocomplete-filter-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({ limit: 30, page: 1, stateCode: 'AZ' });
  });

  it('should change project filter', () => {
    props.uiRelationMap = {
      'project-by-worker-company': {
        searchResult: [getNamedEntity_1()],
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <WorkersTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[1];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getAllByTestId('autocomplete-filter-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Named Entity' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.searchProjectStart).toHaveBeenCalledWith({ nameContains: 'Named Entity' }, 'project-by-worker-company');

    act(() => {
      fireEvent.click(wrapper.getByText('Named Entity'));
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({ limit: 30, page: 1, projectId: getNamedEntity_1().id });
  });
});
