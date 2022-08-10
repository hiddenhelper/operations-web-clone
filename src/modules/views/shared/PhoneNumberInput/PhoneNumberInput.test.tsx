import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PhoneNumberInput, { IPhoneNumberInputProps } from './PhoneNumberInput';

describe.skip('PhoneNumberInput', () => {
  let props: IPhoneNumberInputProps;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      inputProps: {
        name: 'test-phone',
        'data-testid': 'test-phone-input',
        variant: 'outlined',
        error: undefined,
        required: false,
      },
      value: '123456',
    };
  });

  it('should render Phone Input Component', async () => {
    const wrapper = await render(<PhoneNumberInput {...props} />);
    const mobilePhoneInput: any = wrapper.getByTestId('test-phone-input');
    await fireEvent.change(mobilePhoneInput, { target: { name: 'test-phone', value: '123' } });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should add and remove focus class when the input is focused/blurred', async () => {
    const wrapper = await render(<PhoneNumberInput {...props} />);
    const mobilePhoneInput: any = wrapper.getByTestId('test-phone-input');
    await fireEvent.focus(mobilePhoneInput, { target: { name: 'test-phone', value: '123' } });
    expect(wrapper.container).toMatchSnapshot();
    await fireEvent.blur(mobilePhoneInput, { target: { name: 'test-phone', value: '123' } });
    expect(wrapper.container).toMatchSnapshot();
  });
});
