import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import InvoiceTab, { IInvoicesTabProps } from './InvoicesTab';

import { getClientProject_1, getDefaultLoading, getInvoice_1, getInvoice_2, getProject_1, getProjectInvoiceServiceList_1 } from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';
import { GENERAL } from '../../../../constants';
import { InvoiceModel, ResourceModel, UserModel } from '../../../models';

describe.skip('InvoicesTab', () => {
  let props: IInvoicesTabProps;

  beforeEach(() => {
    props = {
      entity: getProject_1(),
      entityType: ResourceModel.Type.PROJECT,
      clientMap: {
        [getProject_1().id]: {
          [getClientProject_1().id]: getClientProject_1(),
        },
      },
      listLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      isCreateInvoiceDisabled: false,
      editInvoiceLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      saveInvoiceLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      confirmInvoiceLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      queryParams: {
        page: 1,
        limit: 2,
      },
      count: 2,
      invoiceMap: {
        [getInvoice_1().id]: getInvoice_1(),
        [getInvoice_2().id]: getInvoice_2(),
      },
      listElement: {},
      isFcAdmin: true,
      drawer: false,
      onPageChange: jest.fn(),
      fetchProjectInvoiceList: jest.fn(),
      fetchProjectClientList: jest.fn(),
      saveInvoice: jest.fn(),
      clearLoading: jest.fn(),
      clearConfirmLoading: jest.fn(),
      setDrawer: jest.fn(),
      navigate: jest.fn(),
      setQueryParams: jest.fn(),
      fetchStatistics: jest.fn(),
      fetchClientProjectList: jest.fn(),
    };
  });

  it.skip('should render empty', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        loadingMap: {
          [GENERAL.LOADING_KEY.FETCH_INVOICE_LIST]: getDefaultLoading(),
        },
      },
      invoice: {
        ...getInitialState().invoice,
        invoiceMap: {},
        serviceList: getProjectInvoiceServiceList_1(),
      },
      auth: {
        isFcaUser: true,
        isAdmin: true,
      },
    };
    props.invoiceMap = {};
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('There are no Invoices created'));
  });

  it.skip('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it.skip('should close modal', () => {
    props.saveInvoiceLoading = undefined;
    props.editInvoiceLoading = getDefaultLoading();
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetch invoice list on confirm', () => {
    props.saveInvoiceLoading = undefined;
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectInvoiceList).toHaveBeenCalled();
  });

  it.skip('should save invoice', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const openModalBtn = wrapper.getByTestId('open-invoice-modal-btn');

    act(() => {
      fireEvent.click(openModalBtn);
    });

    const modalConfirmBtn = wrapper.getByTestId('modal-confirm-btn');

    act(() => {
      fireEvent.click(modalConfirmBtn);
    });

    const modalCloseBtn = wrapper.getByTestId('modal-close-btn');

    act(() => {
      fireEvent.click(modalCloseBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should open invoice information', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        loadingMap: {
          [GENERAL.LOADING_KEY.FETCH_INVOICE_LIST]: getDefaultLoading(),
        },
      },
      invoice: {
        ...getInitialState().invoice,
        invoiceMap: {
          [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
          [getInvoice_2().id]: getInvoice_2(),
        },
        serviceList: getProjectInvoiceServiceList_1(),
      },
      auth: {
        isFcaUser: true,
        isAdmin: true,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceInfoBtn = wrapper.getAllByTestId('open-invoice-information');

    act(() => {
      fireEvent.click(invoiceInfoBtn[0]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should open invoice drawer', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        loadingMap: {
          [GENERAL.LOADING_KEY.FETCH_INVOICE_LIST]: getDefaultLoading(),
        },
      },
      invoice: {
        ...getInitialState().invoice,
        invoiceMap: {
          [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
          [getInvoice_2().id]: getInvoice_2(),
        },
        serviceList: getProjectInvoiceServiceList_1(),
      },
      auth: {
        isFcaUser: true,
        isAdmin: true,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceDrawerBtn = wrapper.getAllByTestId('invoice-list-row');

    act(() => {
      fireEvent.click(invoiceDrawerBtn[0]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change period filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('All Times'));
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should change client filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('All Clients'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Robert C. Martin'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.setDrawer).toHaveBeenCalled();
  });
});
