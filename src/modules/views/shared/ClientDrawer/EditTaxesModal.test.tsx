import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import EditTaxedModal, { IEditTaxesProps } from './EditTaxesModal';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { MemoryRouter } from 'react-router';

jest.useFakeTimers();

describe('EditTaxesModal', () => {
  let props: IEditTaxesProps;

  beforeEach(() => {
    props = {
      taxCondition: true,
      loading: false,
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <EditTaxedModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should update tax condition', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <EditTaxedModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.mouseDown(wrapper.getByText('Exempt'));
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[1]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Save'));
    });

    expect(props.onConfirm).toHaveBeenCalled();
  });
});
