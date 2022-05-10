import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import { act, fireEvent, render } from '@testing-library/react';

import { UserModel, WorkerModel } from '../../../models';
import { getInitialState, getAdminInitialState } from '../../../../test/rootState';
import { getWorker_1, getWorkerStatistics_1, getClient_1 } from '../../../../test/entities';

import WorkerList, { IWorkerListProps } from './WorkerList';

jest.useFakeTimers();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
  useLocation: jest.fn().mockReturnValue({ pathname: 'path', search: '' }),
}));

describe('WorkerList', () => {
  let props: IWorkerListProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      workerMap: {
        [getWorker_1().id]: getWorker_1(),
        ['2']: {
          ...getWorker_1(),
          id: '2',
          address: null,
          trades: [],
          otherTrade: null,
        },
      },
      workersCount: 1,
      workerStatistics: getWorkerStatistics_1(),
      listLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      statisticsLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      clientSearchLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      workerLoading: undefined,
      uiRelationMap: {},
      fetchWorkerList: jest.fn(),
      fetchWorkerStatistics: jest.fn(),
      fetchWorkerSummary: jest.fn(),
      clearWorkerMap: jest.fn(),
      clearWorkerStatistics: jest.fn(),
      searchCompanies: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.listLoading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading widgets', () => {
    props.statisticsLoading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should navigate to invite worker', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const inviteWorkerButton = wrapper.getByTestId('invite-worker-btn');

    fireEvent.click(inviteWorkerButton);

    expect(props.navigate).toHaveBeenCalledWith('/workers/wizard/new');
  });

  it('should change page', () => {
    props.workersCount = 17;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    expect(props.fetchWorkerList).toHaveBeenCalledWith({
      limit: 15,
      page: 1,
      status: WorkerModel.WorkerStatusFilter.MIGRATED,
    });
  });

  it('should navigate to worker details', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const workerButton = wrapper.getAllByTestId('worker-list-row-open-button')[1];

    expect(workerButton.href).toContain(`/workers/detail/${getWorker_1().id}`);

    await act(async () => {
      await fireEvent.click(workerButton);
    });

    // TODO (expect correct redirection)
  });

  it('should fetch worker statistics', () => {
    props.workerStatistics = null;
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchWorkerStatistics).toHaveBeenCalled();
  });

  it('should change filter option', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterOptList = wrapper.getAllByTestId('filter-status-opt');
    expect(filterOptList.length).toBe(3);

    act(() => {
      filterOptList[2].click();
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith(`path?status=${WorkerModel.WorkerStatusFilter.ACTIVE}&page=1&limit=15`);
  });

  it('should change state filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith(`path?status=${WorkerModel.WorkerStatusFilter.MIGRATED}&page=1&limit=15&stateCode="AZ"`);
  });

  it('should change client filter', () => {
    props.uiRelationMap = {
      clientWorker: {
        searchResult: [getClient_1()],
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <WorkerList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[1];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.searchCompanies).toHaveBeenCalledWith({ nameContains: 'Robert' });

    act(() => {
      fireEvent.click(wrapper.getByText('Robert C. Martin'));
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith(`path?status=${WorkerModel.WorkerStatusFilter.MIGRATED}&page=1&limit=15&companyId="${getClient_1().id}"`);
  });
});
