import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { InvoiceModel, UserModel } from '../../../models';
import { getAdminInitialState, getInitialState } from '../../../../test/rootState';
import { getClient_1, getDefaultLoading, getInvoice_1, getInvoice_2, getProject_1, getProjectInvoiceServiceList_1 } from '../../../../test/entities';

import InvoiceTable, { IInvoiceTableProps } from './InvoiceTable';

describe('InvoiceTable', () => {
  let props: IInvoiceTableProps;

  beforeEach(() => {
    props = {
      invoiceMap: {
        [getInvoice_1().id]: getInvoice_1(),
        [getInvoice_2().id]: getInvoice_2(),
      },
      currentInvoice: getInvoice_1(),
      invoiceListRef: { current: null },
      invoiceCount: 2,
      queryParams: InvoiceModel.defaultInvoiceSearch,
      isDrawerOpen: false,
      listLoading: getDefaultLoading(),
      invoiceDetailLoading: getDefaultLoading(),
      deleteLoading: getDefaultLoading(),
      markAsPaidLoading: getDefaultLoading(),
      payLoading: getDefaultLoading(),
      voidLoading: getDefaultLoading(),
      confirmInvoiceLoading: getDefaultLoading(),
      userRole: UserModel.Role.FCA_ADMIN,
      projectId: getProject_1().id,
      setInvoiceId: jest.fn(),
      setInvoiceModal: jest.fn(),
      setDrawer: jest.fn(),
      fetchInvoice: jest.fn(),
      payInvoice: jest.fn(),
      deleteInvoice: jest.fn(),
      markAsVoidInvoice: jest.fn(),
      confirmInvoice: jest.fn(),
      markAsPaidInvoice: jest.fn(),
      fetchInvoiceSummary: jest.fn(),
      setQueryParams: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render payment column', () => {
    props.paymentColumnVisible = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render without project and client', () => {
    props = {
      ...props,
      clientColumnVisible: false,
      projectColumnVisible: false,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
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
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.listLoading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should change page', () => {
    props.invoiceCount = 17;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({
      isPaid: false,
      pageNumber: 2,
      pageSize: 15,
      period: '',
      sortType: 'descending',
    });
  });

  it('should navigate to client details', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const clientRowOne = wrapper.getAllByTestId('invoice-list-row-client-button')[0];

    expect(clientRowOne.href).toContain(`/clients/detail/${getClient_1().id}`);

    act(() => {
      fireEvent.click(clientRowOne);
    });

    // TODO: assert expected redirection
  });

  it('should navigate to project details', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRowOne = wrapper.getAllByTestId('invoice-list-row-project-button')[1];

    expect(projectRowOne.href).toContain(`/projects/detail/${getProject_1().id}`);

    act(() => {
      fireEvent.click(projectRowOne);
    });

    // TODO: assert expected redirection
  });

  it('should open invoice drawer', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceRow = wrapper.getAllByTestId('invoice-list-row');

    act(() => {
      fireEvent.click(invoiceRow[0]);
    });

    const closeBtn = wrapper.getByTestId('drawer-close-btn');

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(props.fetchInvoiceSummary).toHaveBeenCalled();
  });

  it('should delete invoice', () => {
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
      [getInvoice_2().id]: getInvoice_2(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Delete'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Yes, Delete'));
    });

    expect(props.deleteInvoice).toHaveBeenCalled();
  });

  it('should close confirm modal', () => {
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
      [getInvoice_2().id]: getInvoice_2(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Delete'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Close'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should mark as paid invoice', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Mark as Paid'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Yes, Mark as Paid'));
    });

    expect(props.markAsPaidInvoice).toHaveBeenCalled();
  });

  it('should pay invoice', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Pay'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Yes, Pay'));
    });

    expect(props.payInvoice).toHaveBeenCalled();
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
      },
      invoice: {
        ...getInitialState().invoice,
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
          <InvoiceTable {...props} />
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

    expect(props.setInvoiceModal).toHaveBeenCalled();
  });

  it('should open invoice information', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceInfoBtn = wrapper.getAllByTestId('open-invoice-information');

    act(() => {
      fireEvent.click(invoiceInfoBtn[0]);
    });

    const closeInfoBtn = wrapper.getByTestId('close-invoice-info');

    act(() => {
      fireEvent.click(closeInfoBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should close invoice information', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceInfoBtn = wrapper.getAllByTestId('open-invoice-information');

    act(() => {
      fireEvent.click(invoiceInfoBtn[0]);
    });

    wrapper.rerender(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} queryParams={{ ...props.queryParams, pageNumber: 1 }} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.queryByTestId('modal-dialog')).not.toBeTruthy();
  });

  it('should confirm invoice', () => {
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
      [getInvoice_2().id]: getInvoice_2(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });
    act(() => {
      fireEvent.click(wrapper.getByText('Confirm'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Yes, Confirm'));
    });

    expect(props.confirmInvoice).toHaveBeenCalled();
  });

  it('should hide buttons for Automatic invoice', () => {
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), type: InvoiceModel.InvoiceType.AUTOMATIC },
      [getInvoice_2().id]: { ...getInvoice_2(), type: InvoiceModel.InvoiceType.AUTOMATIC },
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });
    expect(wrapper.queryAllByText('Edit')).toHaveLength(0);
    expect(wrapper.queryAllByText('Delete')).toHaveLength(0);
    expect(wrapper.queryAllByText('Cancel')).toHaveLength(0);
    expect(wrapper.getByText('Pay')).toBeTruthy();
    expect(wrapper.getByText('Mark as Paid')).toBeTruthy();
  });

  it('should void invoice', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const actionButtons = wrapper.getAllByTestId('popover-button');

    act(() => {
      fireEvent.click(actionButtons[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Void'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Yes, Void'));
    });

    expect(props.markAsVoidInvoice).toHaveBeenCalled();
  });

  it('should open edit draft invoice', () => {
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), status: InvoiceModel.InvoiceStatus.DRAFT },
      [getInvoice_2().id]: getInvoice_2(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceTable {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceInfoBtn = wrapper.getAllByTestId('open-invoice-information');

    act(() => {
      fireEvent.click(invoiceInfoBtn[0]);
    });

    expect(props.setInvoiceModal).toHaveBeenCalled();
  });
});
