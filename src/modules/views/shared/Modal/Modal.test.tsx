import React from 'react';
import { render } from '@testing-library/react';

import Modal, { IModalProps } from './Modal';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { Provider } from 'react-redux';

describe('Modal Component', () => {
  let props: IModalProps;

  beforeEach(() => {
    props = {
      show: true,
      render: () => <>Content</>,
    };
  });

  it('should render', () => {
    const { baseElement } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Modal {...props} />
      </Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
