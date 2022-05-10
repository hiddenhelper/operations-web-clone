import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import BadgePrinterSystemDrawer, { IBadgePrintingSystemDrawerProps } from './BadgePrinterSystemDrawer';
import { getBadgePrinterSystem_1, getBadgePrinterSystem_2 } from '../../../../../../test/entities';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../test/rootState';
import { Provider } from 'react-redux';

describe('BadgePrinterSystemDrawer', () => {
  let props: IBadgePrintingSystemDrawerProps;

  beforeEach(() => {
    props = {
      isOpen: true,
      isLoading: false,
      deleteLoading: undefined,
      deviceListElement: null,
      device: getBadgePrinterSystem_1(),
      onClose: jest.fn(),
      onDelete: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <BadgePrinterSystemDrawer {...props} />
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
          <BadgePrinterSystemDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Loading...'));
  });

  it('should render alternative values', () => {
    props.device = getBadgePrinterSystem_2();
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <BadgePrinterSystemDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
