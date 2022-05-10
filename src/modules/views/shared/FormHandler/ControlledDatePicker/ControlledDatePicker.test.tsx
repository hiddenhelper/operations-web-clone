import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import ControlledDatePicker, { IControlledDatePickerProps } from './ControlledDatePicker';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../test/rootState';
import { Provider } from 'react-redux';

jest.mock('@material-ui/pickers', () => ({
  MuiPickersUtilsProvider: ({ children }) => children,
  KeyboardDatePicker: ({ onChange, value }) => {
    return (
      <div>
        <input data-testid="datepicker-item" value={value} onChange={onChange} />
      </div>
    );
  },
}));

describe('ControlledDatePicker', () => {
  let props: IControlledDatePickerProps;

  beforeEach(() => {
    props = {
      name: 'date-picker',
      value: '2020/10/10',
      variant: 'standard',
      onChange: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ControlledDatePicker {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render past dates of startDate disabled', () => {
    props.startDate = '2020/09/10';
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ControlledDatePicker {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  // it('should onChange', () => {
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <ControlledDatePicker {...props} />
  //     </Provider>
  //   );

  //   act(() => {
  //     fireEvent.change(wrapper.getByTestId('datepicker-item'), { target: { value: '2020/10/12' } });
  //   });

  //   expect(props.onChange).toHaveBeenCalled();
  // });
});
