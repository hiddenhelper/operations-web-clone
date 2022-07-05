import React from 'react';
import { render, act } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { getInitialState } from '../../../../test/rootState';

import { UserModel } from '../../../models';

import PaymentSettings, { IPaymentSettingsProps } from './PaymentSettings';

describe('PaymentSettings', () => {
  let props: IPaymentSettingsProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
    };
  });

  it.skip('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <PaymentSettings {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it.skip('should change filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <PaymentSettings {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterOptList = wrapper.getAllByTestId('filter-status-opt')[0];

    act(() => {
      filterOptList.click();
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
