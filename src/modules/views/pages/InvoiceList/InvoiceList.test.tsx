import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { act, fireEvent, render } from '@testing-library/react';

import { getClient_1, getDefaultLoading, getInvoice_1, getInvoice_2, getProject_1, getProjectInvoiceServiceList_1 } from '../../../../test/entities';
import { getAdminInitialState, getInitialState } from '../../../../test/rootState';

import { InvoiceModel, UserModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import InvoiceList, { IInvoiceListProps } from './InvoiceList';

jest.useFakeTimers();

describe('InvoiceList', () => {
  let props: IInvoiceListProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      invoiceMap: {
        [getInvoice_1().id]: getInvoice_1(),
        [getInvoice_2().id]: getInvoice_2(),
      },
      invoiceStatistics: {
        paid: 1,
        unpaid: 5,
        revenue: 123,
      },
      saveInvoiceLoading: getDefaultLoading(),
      editInvoiceLoading: getDefaultLoading(),
      fetchInvoiceLoading: getDefaultLoading(),
      invoiceStatisticsLoading: getDefaultLoading(),
      payInvoiceLoading: getDefaultLoading(),
      saveInvoice: jest.fn(),
      editInvoice: jest.fn(),
      fetchInvoiceList: jest.fn(),
      fetchInvoiceStatistics: jest.fn(),
      clearInvoiceMap: jest.fn(),
      clearInvoiceStatistics: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render without invoices', () => {
    props = {
      ...props,
      invoiceMap: {},
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render no FcAdmin', () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetch invoice statistics', () => {
    props.invoiceStatistics = null;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetch invoice list on edit', () => {
    props.saveInvoiceLoading = undefined;
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchInvoiceList).toHaveBeenCalled();
  });

  it('should fetchInvoiceList', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchInvoiceList).toHaveBeenCalled();
  });

  it('should unmount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearInvoiceMap).toHaveBeenCalled();
  });

  it('should refresh when pay invoice has error', () => {
    props.payInvoiceLoading = {
      hasError: true,
      isLoading: false,
      error: 'some error',
    };
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchInvoiceList).toHaveBeenCalled();
  });

  it('should open invoice modal', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const createInvoiceButton = wrapper.getByTestId('create-invoice-btn');

    fireEvent.click(createInvoiceButton);

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

  it('should change filter option', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterOptList = wrapper.getAllByTestId('filter-status-opt')[1];

    act(() => {
      filterOptList.click();
    });

    let isPresentActiveFilter = Object.values(filterOptList.classList).filter(item => item.indexOf('activeFilter') > 0);
    expect(isPresentActiveFilter).toHaveLength(1);

    act(() => {
      wrapper.getAllByTestId('filter-status-opt')[0].click();
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should save invoice', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        uiRelationMap: {
          'invoice-project-id': { searchResult: [getProject_1()] },
          'invoice-company-id': { searchResult: [getClient_1()] },
        },
      },
      invoice: {
        ...getInitialState().invoice,
        serviceList: getProjectInvoiceServiceList_1(),
      },
      auth: {
        role: UserModel.Role.FCA_ADMIN,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const createInvoiceButton = wrapper.getByTestId('create-invoice-btn');

    fireEvent.click(createInvoiceButton);

    const modalConfirmBtn = wrapper.getByTestId('modal-confirm-btn');

    act(() => {
      fireEvent.click(modalConfirmBtn);
    });

    const projectSelectInput = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(projectSelectInput, { target: { value: 'Project' } });
    });

    act(() => {
      fireEvent.mouseDown(projectSelectInput);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const clientSelectInput = wrapper.getAllByTestId('autocomplete-wrapper')[1].querySelector('input');

    act(() => {
      fireEvent.change(clientSelectInput, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(clientSelectInput);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const notesInput = wrapper.getByTestId('invoice-notes');
    const addEntityBtn = wrapper.getByTestId('add-item-button');

    act(() => {
      fireEvent.change(notesInput, { target: { name: 'notes', value: 'test' } });
    });

    act(() => {
      fireEvent.click(addEntityBtn);
    });

    const invoiceServiceInput = wrapper.getAllByText('Select Option');

    act(() => {
      fireEvent.mouseDown(invoiceServiceInput[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Handheld Equipment'));
    });

    const detailInput = wrapper.getAllByTestId('service-detail');

    act(() => {
      fireEvent.change(detailInput[0], { target: { name: 'detail', value: 'test' } });
    });

    const amountInput = wrapper.getAllByTestId('service-amount');

    act(() => {
      fireEvent.change(amountInput[0], { target: { name: 'amount', value: 30 } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.saveInvoice).toHaveBeenCalled();
  });

  it('should save invoice as draft', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        uiRelationMap: {
          'invoice-project-id': { searchResult: [getProject_1()] },
          'invoice-company-id': { searchResult: [getClient_1()] },
        },
      },
      invoice: {
        ...getInitialState().invoice,
        serviceList: getProjectInvoiceServiceList_1(),
      },
      auth: {
        role: UserModel.Role.FCA_ADMIN,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const createInvoiceButton = wrapper.getByTestId('create-invoice-btn');

    fireEvent.click(createInvoiceButton);

    const modalConfirmBtn = wrapper.getByTestId('modal-confirm-btn');

    act(() => {
      fireEvent.click(modalConfirmBtn);
    });

    const projectSelectInput = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(projectSelectInput, { target: { value: 'Project' } });
    });

    act(() => {
      fireEvent.mouseDown(projectSelectInput);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const clientSelectInput = wrapper.getAllByTestId('autocomplete-wrapper')[1].querySelector('input');

    act(() => {
      fireEvent.change(clientSelectInput, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(clientSelectInput);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const notesInput = wrapper.getByTestId('invoice-notes');

    act(() => {
      fireEvent.change(notesInput, { target: { name: 'notes', value: 'test' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const detailInput = wrapper.getAllByTestId('service-detail');

    act(() => {
      fireEvent.change(detailInput[0], { target: { name: 'detail', value: 'test' } });
    });

    const amountInput = wrapper.getAllByTestId('service-amount');

    act(() => {
      fireEvent.change(amountInput[0], { target: { name: 'amount', value: 30 } });
    });

    act(() => {
      fireEvent.change(detailInput[0], { target: { name: 'detail', value: 'test' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-secondary'));
    });

    expect(props.saveInvoice).toHaveBeenCalled();
  });

  it.skip('should change period filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterPeriodBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[0]);
    });

    expect(props.fetchInvoiceList).toHaveBeenCalledWith({
      pageSize: 15,
      pageNumber: 1,
      isPaid: false,
      period: '',
      sortType: 'descending',
      // timeZoneOffset: '-07:00',
    });
  });

  it('should edit invoice', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        uiRelationMap: {
          'invoice-project-id': { searchResult: [getProject_1()] },
          'invoice-company-id': { searchResult: [getClient_1()] },
        },
        loadingMap: {
          [GENERAL.LOADING_KEY.FETCH_INVOICE_LIST]: getDefaultLoading(),
        },
      },
      invoice: {
        ...getInitialState().invoice,
        invoiceMap: {
          [getInvoice_1().id]: {
            ...getInvoice_1(),
            items: [getInvoice_1().items[0]],
            company: getInvoice_1().billingCompany,
            status: InvoiceModel.InvoiceStatus.DRAFT,
          },
          [getInvoice_2().id]: getInvoice_2(),
        },
        serviceList: getProjectInvoiceServiceList_1(),
      },
      auth: {
        role: UserModel.Role.FCA_ADMIN,
      },
    };
    props.invoiceMap = {
      [getInvoice_1().id]: {
        ...getInvoice_1(),
        items: [getInvoice_1().items[0]],
        company: getInvoice_1().billingCompany,
        status: InvoiceModel.InvoiceStatus.DRAFT,
      },
      [getInvoice_2().id]: getInvoice_2(),
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Edit'));
    });

    const notesInput = wrapper.getByTestId('invoice-notes');

    act(() => {
      fireEvent.change(notesInput, { target: { name: 'notes', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.editInvoice).toHaveBeenCalled();
  });

  it('should show edit loading', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
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
        role: UserModel.Role.FCA_ADMIN,
      },
    };
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
      [getInvoice_2().id]: getInvoice_2(),
    };
    props.fetchInvoiceLoading = { isLoading: true, hasError: false, error: null };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Edit'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should open edit draft invoice', () => {
    const stateWithData = {
      ...getInitialState(),
      general: {
        ...getInitialState().general,
        uiRelationMap: {
          'invoice-project-id': { searchResult: [getProject_1()] },
          'invoice-company-id': { searchResult: [getClient_1()] },
        },
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
        role: UserModel.Role.FCA_ADMIN,
      },
    };
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
      [getInvoice_2().id]: getInvoice_2(),
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData) as any}>
        <MemoryRouter>
          <InvoiceList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceInfoBtn = wrapper.getAllByTestId('open-invoice-information');

    act(() => {
      fireEvent.click(invoiceInfoBtn[0]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
