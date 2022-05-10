import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaymentMethods, { IPaymentMethodsProps } from './PaymentMethods';
import { getDefaultLoading, getPaymentMethodInUseResponse, getPaymentMethod_1, getPaymentMethod_2, getPaymentMethod_3 } from '../../../../test/entities';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { MemoryRouter } from 'react-router';

describe('PaymentMethods', () => {
  let props: IPaymentMethodsProps;

  beforeEach(() => {
    props = {
      compact: false,
      fetchPaymentLoading: getDefaultLoading(),
      paymentMethods: [getPaymentMethod_1()],
      selectedPaymentMethod: getPaymentMethod_1().paymentMethodId,
      createLoading: getDefaultLoading(),
      deleteLoading: getDefaultLoading(),
      setSelectedPaymentMethod: jest.fn(),
      fetchPaymentMethods: jest.fn(),
      deletePaymentMethod: jest.fn(),
      replaceAndDeletePaymentMethod: jest.fn(),
      clearLoading: jest.fn(),
    };
  });

  it('should fetch payment methods', () => {
    render(<PaymentMethods {...props} />);

    expect(props.fetchPaymentMethods).toHaveBeenCalled();
  });

  it('should show loading indicator for admin', () => {
    props.admin = true;
    props.fetchPaymentLoading.isLoading = true;
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchPaymentMethods).toHaveBeenCalled();
  });

  it('should render with specific classes for project details', () => {
    props.isProjectDetail = true;
    render(<PaymentMethods {...props} />);

    expect(props.fetchPaymentMethods).toHaveBeenCalled();
  });

  it('should render admin mode', async () => {
    props.admin = true;
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should not let the user delete the last card', async () => {
    props.admin = true;
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deleteBtn = await wrapper.findByTestId('credit-card-item-delete');
    fireEvent.click(deleteBtn);
    const text = await wrapper.getByText(`This Credit Card can't be deleted`);
    expect(text).toBeDefined();
    const confirmBtn = await wrapper.findByTestId('confirm-button');
    fireEvent.click(confirmBtn);
  });

  it('should let the user delete a credit card', async () => {
    props.admin = true;
    props.paymentMethods = [getPaymentMethod_1(), getPaymentMethod_2(), getPaymentMethod_3()];
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deleteBtn = await wrapper.getAllByTestId('credit-card-item-delete')[0];
    await fireEvent.click(deleteBtn);
    const confirmBtn = await wrapper.findByTestId('confirm-button');
    await fireEvent.click(confirmBtn);

    expect(await props.deletePaymentMethod).toHaveBeenLastCalledWith(getPaymentMethod_1().paymentMethodId);
  });

  it('should render admin mode with the modal to resolve conflict', async () => {
    props.admin = true;
    props.paymentMethods = [getPaymentMethod_1(), getPaymentMethod_2(), getPaymentMethod_3()];
    props.deleteLoading.error = getPaymentMethodInUseResponse();

    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );
    const text = await wrapper.getByText(`Delete Credit Card **** **** **** ${getPaymentMethod_1().lastFourDigits}?`);
    expect(text).toBeDefined();
    const selectCard = await wrapper.findByTestId('replace-credit-card-select');
    await fireEvent.change(selectCard, { target: { name: 'replace-credit-card-select', value: 'e043ed03-1008-492a-ac40-4736713ee77f' } });

    const confirmBtn = await wrapper.findByTestId('modal-confirm-btn');
    fireEvent.click(confirmBtn);
    expect(props.replaceAndDeletePaymentMethod).toHaveBeenCalledWith(getPaymentMethod_1().paymentMethodId, getPaymentMethod_2().paymentMethodId);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render admin mode with the modal and do not delete if user close the modal', async () => {
    props.admin = true;
    props.paymentMethods = [getPaymentMethod_1(), getPaymentMethod_2(), getPaymentMethod_3()];
    props.deleteLoading.error = getPaymentMethodInUseResponse();
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );
    const closeBtn = await wrapper.findByTestId('modal-close-btn');
    fireEvent.click(closeBtn);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render admin mode and no open the modal if the payment with error does not exist', async () => {
    props.admin = true;
    props.paymentMethods = [getPaymentMethod_2(), getPaymentMethod_3()];
    props.deleteLoading.error = getPaymentMethodInUseResponse();
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render the disclamer modal and let the user to close the modal', async () => {
    props.admin = true;
    props.paymentMethods = [getPaymentMethod_1(), getPaymentMethod_2(), getPaymentMethod_3()];
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deleteBtn = await wrapper.getAllByTestId('credit-card-item-delete')[0];
    await fireEvent.click(deleteBtn);
    const confirmBtn = await wrapper.findByTestId('cancel-button');
    await fireEvent.click(confirmBtn);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should display a card replacement if the payment method is already used in a project', async () => {
    props.admin = true;
    props.paymentMethods = [getPaymentMethod_1(), getPaymentMethod_2(), getPaymentMethod_3()];
    const wrapper = await render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <PaymentMethods {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deleteBtn = await wrapper.getAllByTestId('credit-card-item-delete')[1];
    await fireEvent.click(deleteBtn);
    const text = await wrapper.getByText(`Delete Credit Card **** **** **** ${getPaymentMethod_2().lastFourDigits}?`);
    expect(text).toBeDefined();
  });
});
