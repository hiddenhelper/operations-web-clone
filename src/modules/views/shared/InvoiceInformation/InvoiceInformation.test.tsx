import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { getInvoice_1 } from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';

import InvoiceInformation, { IInvoiceInformationProps } from './InvoiceInformation';

describe('InvoiceList', () => {
  let props: IInvoiceInformationProps;

  beforeEach(() => {
    props = {
      invoiceId: getInvoice_1().id,
      invoiceMap: {
        [getInvoice_1().id]: getInvoice_1(),
      },
      loading: undefined,
      downloadLoading: undefined,
      onClose: jest.fn(),
      fetchInvoiceInformation: jest.fn(),
      downloadInvoice: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceInformation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render tax exempt', () => {
    props.invoiceMap = {
      [getInvoice_1().id]: { ...getInvoice_1(), company: { id: '1', name: 'test', isTaxExempt: true } },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceInformation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceInformation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should download', () => {
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(getByTestId('download-invoice'));
    });

    expect(props.downloadInvoice).toHaveBeenCalled();
  });
});
