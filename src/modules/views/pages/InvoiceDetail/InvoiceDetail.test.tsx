import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render } from '@testing-library/react';

import { getInitialState } from '../../../../test/rootState';

import InvoiceDetail, { IInvoiceDetailProps } from './InvoiceDetail';

jest.useFakeTimers();

describe('InvoiceDetail', () => {
  let props: IInvoiceDetailProps;

  beforeEach(() => {
    props = {
      navigate: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <InvoiceDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
