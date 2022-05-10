import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getClientAdminInitialState } from '../../../../../../test/rootState';
import { MemoryRouter } from 'react-router';
import NewCreditCardItem from './NewCreditCardItem';

describe('New Credit Card Item', () => {
  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <NewCreditCardItem />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render credit card form', () => {
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <NewCreditCardItem />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('ADD NEW CREDIT CARD'));
    });

    expect(wrapper.container).toMatchSnapshot();

    act(() => {
      fireEvent.click(wrapper.getByTestId('close-credit-card-form'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
