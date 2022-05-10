import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { getInitialState } from '../../../../../../test/rootState';

import CreditCardTab from './CreditCardTab';

describe('CreditCardTab', () => {
  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <CreditCardTab />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
