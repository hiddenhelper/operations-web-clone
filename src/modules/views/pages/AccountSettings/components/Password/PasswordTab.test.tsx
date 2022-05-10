import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import PasswordTab, { IPasswordProps } from './PasswordTab';

describe('Profile', () => {
  let props: IPasswordProps;

  beforeEach(() => {
    props = {
      disabled: false,
      changePassword: jest.fn(),
      clearLoading: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(<PasswordTab {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    const wrapper = render(<PasswordTab {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with enabled inputs', () => {
    props.disabled = true;
    const wrapper = render(<PasswordTab {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render current password error', () => {
    props.loading = { isLoading: false, hasError: true, error: { errors: { PASSWORD_UPDATE_FAILED: ['Incorrect Current Password'] } } };
    const wrapper = render(<PasswordTab {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should show error validations', () => {
    const wrapper = render(<PasswordTab {...props} />);

    const saveButton = wrapper.getByTestId('next-changes-btn');

    fireEvent.click(saveButton);

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should discard changes', () => {
    const wrapper = render(<PasswordTab {...props} />);

    const currentPwd = wrapper.getByTestId('current-password');

    act(() => {
      fireEvent.change(currentPwd, { target: { name: 'currentPassword', value: 'Test123' } });
    });

    const discardButton = wrapper.getByTestId('discard-changes-btn');

    fireEvent.click(discardButton);

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should change password', () => {
    const wrapper = render(<PasswordTab {...props} />);

    const currentPwd = wrapper.getByTestId('current-password');
    const newPwd = wrapper.getByTestId('password');
    const confirmPwd = wrapper.getByTestId('confirm-password');

    act(() => {
      fireEvent.change(currentPwd, { target: { name: 'currentPassword', value: 'Test123' } });
    });

    act(() => {
      fireEvent.change(currentPwd, { target: { name: 'currentPassword', value: 'Test123' } });
    });

    act(() => {
      fireEvent.change(newPwd, { target: { name: 'newPassword', value: 'Test*123' } });
    });

    act(() => {
      fireEvent.change(confirmPwd, { target: { name: 'confirmPassword', value: 'Test*123' } });
    });

    act(() => {
      fireEvent.blur(confirmPwd);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('next-changes-btn'));
    });

    expect(props.changePassword).toHaveBeenCalled();
  });
});
