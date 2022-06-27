import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import ResetPassword, { IResetPasswordProps } from './ResetPassword';

describe('Reset Password', () => {
  let wrapper: RenderResult;
  let props: IResetPasswordProps;

  beforeEach(() => {
    props = {
      loadingStatus: undefined,
      confirmResetPassword: jest.fn(),
      clearLoading: jest.fn(),
    };
  });

  it.skip('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it.skip('should render loading', () => {
    props.loadingStatus = { isLoading: true, hasError: false, error: null };

    wrapper = render(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should clear loading on unmount', () => {
    wrapper = render(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    );

    wrapper.unmount();

    expect(props.clearLoading).toHaveBeenCalled();
  });

  it.skip('should render success', () => {
    props.loadingStatus = { isLoading: false, hasError: false, error: null };

    wrapper = render(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should send reset password confirm', () => {
    wrapper = render(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    );

    const passwordInput = wrapper.getByTestId('password');
    const confirmPasswordInput = wrapper.getByTestId('confirm-password');
    const submitBtn = wrapper.getByTestId('reset-pwd-btn');

    act(() => {
      fireEvent.change(passwordInput, { target: { name: 'password', value: 'Test*1234' } });
    });

    act(() => {
      fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'Test*1234' } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(props.confirmResetPassword).toHaveBeenCalled();
  });

  it.skip('should validate on blur', () => {
    wrapper = render(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    );

    const passwordInput = wrapper.getByTestId('password');
    const confirmPasswordInput = wrapper.getByTestId('confirm-password');

    act(() => {
      fireEvent.change(passwordInput, { target: { name: 'password', value: '123' } });
    });

    act(() => {
      fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'Test' } });
    });

    act(() => {
      fireEvent.blur(confirmPasswordInput);
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
