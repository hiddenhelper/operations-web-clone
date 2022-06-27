import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';

import { getInitialState } from '../../../../test/rootState';
import { noop } from '../../../../utils/generalUtils';

import Register, { IRegisterProps } from './Register';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ search: '?token=TEST-TOKEN' }),
}));

describe('Register Component', () => {
  let props: IRegisterProps;

  beforeEach(() => {
    props = {
      email: 'email@test.com',
      loadingCreateStatus: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      loadingTokenStatus: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      validateToken: jest.fn(),
      createAccount: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it('should render loader', () => {
    props.loadingCreateStatus = undefined;
    props.loadingTokenStatus = undefined;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Register {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should validate token', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Register {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.validateToken).toHaveBeenCalledWith('TEST-TOKEN');
  });

  it('should navigate when no token', () => {
    (useLocation as any).mockReturnValueOnce({ search: '' });
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Register {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.navigate).toHaveBeenCalledWith('/');
  });

  it.skip('should render expired', () => {
    props.loadingTokenStatus.hasError = true;
    props.loadingTokenStatus.error = 'expired';
    const { container, getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Register {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('expired-msg')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it.skip('should render success', () => {
    props.loadingCreateStatus.hasError = false;
    props.loadingCreateStatus.error = false;
    const { container, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Register {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByText('Your account was created successfully.')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  describe('account confirm', () => {
    beforeEach(() => {
      props.loadingCreateStatus = undefined;
    });

    it.skip('should render', () => {
      const { container } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <Register {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should create account', () => {
      const { getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <Register {...props} />
          </MemoryRouter>
        </Provider>
      );

      const signUpBtn = getByTestId('sign-up-btn');

      act(() => {
        fireEvent.change(getByTestId('password'), {
          persist: noop,
          target: { name: 'password', value: 'P4ssw0rd!#' },
        });
      });

      act(() => {
        fireEvent.change(getByTestId('confirm-password'), {
          persist: noop,
          target: { name: 'confirmPassword', value: 'P4ssw0rd!#' },
        });
      });

      act(() => {
        fireEvent.blur(getByTestId('password'));
      });

      act(() => {
        fireEvent.click(getByTestId('accept-terms'));
      });

      fireEvent.click(signUpBtn);

      expect(props.createAccount).toHaveBeenCalled();
    });

    it.skip('should render terms and conditions', () => {
      const { container, getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <Register {...props} />
          </MemoryRouter>
        </Provider>
      );

      act(() => {
        fireEvent.click(getByTestId('open-terms-and-conditions'));
      });

      expect(container).toMatchSnapshot();
    });

    it.skip('should render privacy policy', () => {
      const { container, getByTestId } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <Register {...props} />
          </MemoryRouter>
        </Provider>
      );

      act(() => {
        fireEvent.click(getByTestId('open-privacy-policy'));
      });

      expect(container).toMatchSnapshot();
    });

    it.skip('should render errors', () => {
      const { getByTestId, container } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <Register {...props} />
          </MemoryRouter>
        </Provider>
      );

      const signUpBtn = getByTestId('sign-up-btn');

      act(() => {
        fireEvent.change(getByTestId('password'), {
          persist: noop,
          target: { name: 'password', value: 'pass' },
        });
      });

      act(() => {
        fireEvent.blur(getByTestId('password'));
      });

      act(() => {
        fireEvent.change(getByTestId('confirm-password'), {
          persist: noop,
          target: { name: 'confirmPassword', value: '' },
        });
      });

      act(() => {
        fireEvent.blur(getByTestId('confirm-password'));
      });

      act(() => {
        fireEvent.click(getByTestId('accept-terms'));
      });

      fireEvent.click(signUpBtn);

      expect(container).toMatchSnapshot();
    });
  });
});
