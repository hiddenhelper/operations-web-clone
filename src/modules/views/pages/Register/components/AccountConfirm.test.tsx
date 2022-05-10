import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AccountConfirm from './AccountConfirm';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../test/rootState';
import { Provider } from 'react-redux';

describe('Account Confirm', () => {
  it('should render loading', () => {
    const props = {
      email: 'test',
      loadingStatus: {
        isLoading: true,
        hasError: false,
        error: null,
      },
      onCreateAccount: jest.fn(),
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccountConfirm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
