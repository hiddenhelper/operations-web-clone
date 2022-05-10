import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ClientDrawer, { IClientDrawerProps } from './ClientDrawer';
import { getClient_1 } from '../../../../test/entities';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { Provider } from 'react-redux';

describe('ClientDrawer', () => {
  let props: IClientDrawerProps;

  beforeEach(() => {
    props = {
      isOpen: true,
      isLoading: false,
      deleteLoading: undefined,
      client: getClient_1(),
      mwbeList: [],
      clientListElement: null,
      buttonText: 'Edit',
      buttonTestId: 'drawerClientButton',
      showPrimaryButton: true,
      showSecondaryButton: true,
      onClose: jest.fn(),
      onDelete: jest.fn(),
      handleButtonClick: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render tax exempt', () => {
    props.showTaxExempt = true;
    props.client = { ...getClient_1(), isTaxExempt: true };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.isLoading = true;
    props.deleteLoading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Loading...'));
  });
});
