import React from 'react';
import { render } from '@testing-library/react';

import NewModal, { IModalProps } from './NewModal';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { Provider } from 'react-redux';

describe('Modal Component', () => {
  let props: IModalProps;

  beforeEach(() => {
    props = {
      show: true,
    };
  });

  it('should render with children elements', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <NewModal {...props}>
          <div data-testid="children-element">Children Element</div>
        </NewModal>
      </Provider>
    );
    expect(wrapper.getByTestId('children-element')).not.toBeUndefined();
  });

  it('should render with title', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <NewModal {...props} title="A title">
          <div data-testid="children-element">Children Element</div>
        </NewModal>
      </Provider>
    );
    expect(wrapper.getByTestId('modal-title')).not.toBeUndefined();
  });
});
