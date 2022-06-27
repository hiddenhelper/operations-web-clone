import React from 'react';
import { render, RenderResult, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import ForgotPassword, { IForgotPasswordProps } from './ForgotPassword';

describe('Forgot Password Component', () => {
  let wrapper: RenderResult;
  let props: IForgotPasswordProps;

  beforeEach(() => {
    props = {
      loadingStatus: undefined,
      resetPassword: jest.fn(),
      clearLoading: jest.fn(),
    };
  });

  it.skip('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it.skip('should render loading', () => {
    props.loadingStatus = { isLoading: true, hasError: false, error: null };

    wrapper = render(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should clear loading on unmount', () => {
    wrapper = render(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>
    );

    wrapper.unmount();

    expect(props.clearLoading).toHaveBeenCalled();
  });

  it.skip('should render message', () => {
    props.loadingStatus = { isLoading: false, hasError: false, error: null };

    wrapper = render(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should send reset password request', () => {
    wrapper = render(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>
    );

    const emailInput = wrapper.getByTestId('email-input');
    const submitBtn = wrapper.getByTestId('reset-pwd-btn');

    act(() => {
      fireEvent.change(emailInput, { target: { name: 'email', value: 'test@email.com' } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(props.resetPassword).toHaveBeenCalled();
  });

  it.skip('should validate on blur', () => {
    wrapper = render(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>
    );

    const emailInput = wrapper.getByTestId('email-input');

    act(() => {
      fireEvent.change(emailInput, { target: { name: 'email', value: '' } });
    });

    act(() => {
      fireEvent.blur(emailInput);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
