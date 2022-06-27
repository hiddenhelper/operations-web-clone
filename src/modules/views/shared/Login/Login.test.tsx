import React from 'react';
import { render, RenderResult, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Login, { ILoginProps } from './Login';

describe('Login Component', () => {
  let wrapper: RenderResult;
  let props: ILoginProps;

  beforeEach(() => {
    props = {
      login: jest.fn(),
      loadingStatus: undefined,
    };
  });

  it.skip('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it.skip('should render error message when Error is defined', () => {
    props.loadingStatus = { isLoading: false, hasError: true, error: 'error message' };
    wrapper = render(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set email and password and login', () => {
    const email = 'valid@email.com';
    const password = 'password';
    wrapper = render(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );

    const emailInput = wrapper.getByTestId('login-email');
    const passwordInput = wrapper.getByTestId('login-password');

    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.blur(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.blur(passwordInput, { target: { value: password } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('login-btn'));
    });

    expect(props.login).toBeCalledWith(email, password);
  });

  it('should show error and prevent login on missing fields', async () => {
    wrapper = render(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );

    const email = wrapper.getByTestId('login-email-wrapper');
    const password = wrapper.getByTestId('login-password-wrapper');

    await act(async () => {
      fireEvent.click(wrapper.getByTestId('login-btn'));
    });

    expect(props.login).not.toHaveBeenCalled();
    expect(email.querySelector('.Mui-error')).not.toBeNull();
    expect(password.querySelector('.Mui-error')).not.toBeNull();
  });
});
