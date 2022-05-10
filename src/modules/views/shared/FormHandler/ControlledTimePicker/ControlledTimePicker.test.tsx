import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import ControlledTimePicker, { IControlledTimePickerProps } from './ControlledTimePicker';

jest.mock('@material-ui/pickers', () => ({
  MuiPickersUtilsProvider: ({ children }) => children,
  KeyboardTimePicker: ({ onChange, value }) => {
    return (
      <div>
        <input data-testid="datepicker-item" value={value} onChange={onChange} />
      </div>
    );
  },
}));

describe('ControlledTimePicker', () => {
  let props: IControlledTimePickerProps;

  beforeEach(() => {
    props = {
      name: 'date-picker',
      value: '2020/10/10',
      variant: 'standard',
      error: false,
      onChange: jest.fn(),
    };
  });

  it('should render', () => {
    props.iconPosition = 'end';
    const wrapper = render(<ControlledTimePicker {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should onChange', () => {
    const wrapper = render(<ControlledTimePicker {...props} />);

    act(() => {
      fireEvent.change(wrapper.getByTestId('datepicker-item'), { target: { value: '2020/10/12' } });
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
