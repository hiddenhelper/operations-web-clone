import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';

import { UserModel } from '../../../models';
import { getInitialState } from '../../../../test/rootState';
import { getAddress_1, getClient_1, getClient_2, getClient_5, getMwbeType_1, getUser_1 } from '../../../../test/entities';

import ClientList, { IClientListProps } from './ClientList';

describe('ClientList Component', () => {
  let props: IClientListProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      clientMap: { [getClient_1().id]: getClient_1(), [getClient_2().id]: getClient_2() },
      mwbeList: getMwbeType_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      listLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      deleteLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      clientCount: 1,
      statisticsLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      clientStatistics: { draft: 0, pendingApproval: 0, active: 0 },
      fetchClientList: jest.fn(),
      fetchMwbe: jest.fn(),
      fetchClientSummary: jest.fn(),
      fetchClientStatistics: jest.fn(),
      clearClientMap: jest.fn(),
      clearClientStatistics: jest.fn(),
      deleteClient: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it.skip('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it.skip('should open client detail', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRow = wrapper.getAllByTestId('client-list-row')[0];

    act(() => {
      fireEvent.click(clientRow);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.fetchClientSummary).toHaveBeenCalledWith(getClient_1().id);
  });

  it.skip('should navigate to client wizard', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRow = wrapper.getAllByTestId('client-list-row')[0];

    act(() => {
      fireEvent.click(clientRow);
    });

    const drawerButton = wrapper.getByTestId('drawerClientButton');

    act(() => {
      fireEvent.click(drawerButton);
    });

    expect(props.navigate).toHaveBeenCalledWith(`/clients/wizard/${getClient_1().id}`);
  });

  it.skip('should show client detail info', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    props.clientMap = {
      [getClient_5().id]: {
        ...getClient_5(),
        user: getUser_1(),
        mailingAddress: getAddress_1(),
        mailingAddressMatchesBillingAddress: false,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRow = wrapper.getAllByTestId('client-list-row')[0];

    act(() => {
      fireEvent.click(clientRow);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.fetchClientSummary).toHaveBeenCalledWith(getClient_5().id);
  });

  it.skip('should show client detail info without link on company name', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    props.clientMap = {
      [getClient_5().id]: {
        ...getClient_5(),
        user: getUser_1(),
        mailingAddress: getAddress_1(),
        mailingAddressMatchesBillingAddress: false,
        status: 4,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.queryByTestId('client-list-row-item-link')).toBe(null);
  });

  it.skip('should close client detail', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRow = wrapper.getAllByTestId('client-list-row')[0];
    const closeBtn = wrapper.getByTestId('drawer-close-btn');
    const clientDrawerDetail = wrapper.getByTestId('client-drawer-detail');

    act(() => {
      fireEvent.click(clientRow);
    });

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(clientDrawerDetail.classList).toContain('closed');
  });

  it.skip('should fetchMwbe on load', () => {
    props.clientMap[getClient_1().id] = {
      ...getClient_1(),
      mwbeTypeId: '',
    };
    props.mwbeList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchMwbe).toHaveBeenCalledWith();
  });

  it.skip('should clearClientMap on unmount', () => {
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearClientMap).toHaveBeenCalled();
  });

  it.skip('should change filter option', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterOptList = wrapper.getAllByTestId('filter-status-opt')[2];

    act(() => {
      filterOptList.click();
    });

    const isPresentActiveFilter = Object.values(filterOptList.classList).filter(item => item.indexOf('activeFilter') > 1);
    expect(isPresentActiveFilter).toHaveLength(1);
  });

  it.skip('should delete client', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRow = wrapper.getAllByTestId('client-list-row')[0];

    act(() => {
      fireEvent.click(clientRow);
    });

    const deleteButton = wrapper.getByTestId('deleteClientButton');

    act(() => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = wrapper.getByTestId('confirm-button');

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.deleteClient).toHaveBeenCalled();
  });

  it.skip('should delete last client in page', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    props.clientMap = { [getClient_1().id]: getClient_1() };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter initialEntries={['?page=2']}>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRow = wrapper.getAllByTestId('client-list-row')[0];

    act(() => {
      fireEvent.click(clientRow);
    });

    const deleteButton = wrapper.getByTestId('deleteClientButton');

    act(() => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = wrapper.getByTestId('confirm-button');

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.deleteClient).toHaveBeenCalled();
  });

  it.skip('should show loading list', () => {
    props.listLoading = { isLoading: true, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Loading...'));
  });

  it.skip('should change page', () => {
    props.listLoading = { isLoading: false, error: null, hasError: false };
    props.clientCount = 17;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    expect(props.fetchClientList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 2,
      companyStatuses: [0],
    });
  });

  it.skip('should close drawer when navigate away', () => {
    props.clientCount = 17;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRowOne = wrapper.getAllByTestId('client-list-row')[0];
    const pageBtn = wrapper.getByText('2');
    const clientDrawerDetail = wrapper.getByTestId('client-drawer-detail');

    act(() => {
      fireEvent.click(clientRowOne);
    });

    act(() => {
      pageBtn.click();
    });

    expect(clientDrawerDetail.classList).toContain('closed');
  });

  it.skip('should navigate create Client', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const createClientButton = wrapper.getByTestId('create-client-btn');

    fireEvent.click(createClientButton);

    expect(props.navigate).toHaveBeenCalledWith('/clients/wizard/new');
  });

  it.skip('should navigate invite Client', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const inviteClientButton = wrapper.getByText('Invite Client');

    fireEvent.click(inviteClientButton);

    expect(props.navigate).toHaveBeenCalledWith('/clients/invite/new');
  });

  it.skip('should fetchClientStatistics', () => {
    const fetchClientStatistics = jest.fn();

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientList {...props} fetchClientStatistics={fetchClientStatistics} clientStatistics={null} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();

    expect(fetchClientStatistics).toHaveBeenCalled();
  });
});
