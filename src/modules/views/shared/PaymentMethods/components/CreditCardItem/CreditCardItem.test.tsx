import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getClientAdminInitialState } from '../../../../../../test/rootState';
import { MemoryRouter } from 'react-router';
import CreditCardItem, { ICreditCardItemProps } from './CreditCardItem';
import { getPaymentMethod_1, getPaymentMethod_3 } from '../../../../../../test/entities';

describe('Credit Card Item', () => {
  let props: ICreditCardItemProps;

  beforeEach(() => {
    props = {
      isSelected: false,
      paymentMethod: getPaymentMethod_1(),
      setSelected: jest.fn(),
      deleteCard: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <CreditCardItem {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should render compact', () => {
    props.compact = true;
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <CreditCardItem {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should render selected', () => {
    props.isSelected = true;
    props.compact = true;
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <CreditCardItem {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should render default brand', () => {
    props.paymentMethod = getPaymentMethod_3();
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <CreditCardItem {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should select payment', () => {
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <CreditCardItem {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('card-item'));
    });

    expect(props.setSelected).toHaveBeenCalled();
  });

  it('should trigger delete payment', () => {
    props.admin = true;
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <CreditCardItem {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('credit-card-item-delete'));
    });

    expect(props.deleteCard).toHaveBeenCalled();
  });
});
