import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import ControlledInputPassword, { IControlledInputPasswordProps } from './ControlledInputPassword';

describe('Controlled Input Password', () => {
  let props: IControlledInputPasswordProps = {
    fieldName: 'password',
    label: 'Current Password',
    value: '',
    error: null,
    rules: {},
    placeholder: 'Current Password',
    dataTestId: 'input-password',
    onChangeHandler: jest.fn(),
    onBlurValidate: jest.fn(),
  };

  it('should render', () => {
    const wrapper = render(<ControlledInputPassword {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render value', () => {
    props.value = 'pwd';
    const wrapper = render(<ControlledInputPassword {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with errors', () => {
    props.error = 'error';
    const wrapper = render(<ControlledInputPassword {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should toggle visibility on and show password', () => {
    const wrapper = render(<ControlledInputPassword {...props} />);
    const input = wrapper.getByTestId('input-password');
    const visibilityButton = wrapper.getByTestId('toggle-visibility-button');

    act(() => {
      fireEvent.change(input, { target: { value: 'new password' } });
    });

    act(() => {
      fireEvent.click(visibilityButton);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should toggle visibility on and show password with value', () => {
    props.value = 'pwd';
    const wrapper = render(<ControlledInputPassword {...props} />);
    const input = wrapper.getByTestId('input-password');
    const visibilityButton = wrapper.getByTestId('toggle-visibility-button');

    act(() => {
      fireEvent.change(input, { target: { value: 'new password' } });
    });

    fireEvent.click(visibilityButton);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should toggle visibility on and show password without value', () => {
    props.value = '';
    const wrapper = render(<ControlledInputPassword {...props} />);
    const visibilityButton = wrapper.getByTestId('toggle-visibility-button');

    fireEvent.click(visibilityButton);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should toggle visibility off and delete password', () => {
    const wrapper = render(<ControlledInputPassword {...props} />);
    const input = wrapper.getByTestId('input-password');
    const visibilityButton = wrapper.getByTestId('toggle-visibility-button');

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    fireEvent.click(visibilityButton);
    fireEvent.mouseDown(visibilityButton);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
