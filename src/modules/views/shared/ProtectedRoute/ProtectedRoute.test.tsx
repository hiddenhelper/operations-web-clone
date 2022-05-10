import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import ProtectedRoute, { IProtectedRouteProps } from './ProtectedRoute';
import { getInitialState } from '../../../../test/rootState';
import { UserModel } from '../../../models';
import { getClient_1, getUser_1 } from 'test/entities';

describe('ProtectedRoute Component', () => {
  global.console.error = () => {
    /** */
  };
  let Component: RenderResult;
  let props: IProtectedRouteProps;

  beforeEach(() => {
    props = {
      path: '/',
      exact: true,
      authenticated: true,
      roleList: [],
      currentUserRole: UserModel.Role.FCA_ADMIN,
      sessionChecked: false,
      render: () => Promise.resolve({ default: () => <p key="tst">hello</p> }),
      recoverSession: jest.fn(),
      location: { pathname: '/' },
      clientMap: {},
      companyId: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
      fetchClient: jest.fn(),
    };
    Component = render(
      <MemoryRouter>
        <ProtectedRoute {...props} />
      </MemoryRouter>
    );
  });

  it('should fetchClient', () => {
    props.clientMap = {};
    render(
      <MemoryRouter>
        <ProtectedRoute {...props} />
      </MemoryRouter>
    );
    expect(props.fetchClient).toHaveBeenCalledWith(getClient_1().id);
  });

  it('should render loading', () => {
    expect(Component.baseElement).toMatchSnapshot();
  });

  it('should render route', done => {
    setTimeout(() => {
      expect(Component.container).toMatchSnapshot();
      done();
    });
  });

  it('should render loader', () => {
    props.currentUserRole = null;
    Component = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProtectedRoute {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(Component.baseElement).toMatchSnapshot();
  });

  it('should render loading while checking session', done => {
    props.authenticated = false;
    props.sessionChecked = false;
    Component = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProtectedRoute {...props} />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => {
      expect(Component.baseElement).toMatchSnapshot();
      expect(props.recoverSession).toBeCalled();
      done();
    });
  });

  it('should render home redirect', done => {
    props.path = '/';
    props.exact = false;
    props.currentUserRole = UserModel.Role.REGULAR_USER;
    Component = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter initialEntries={['/']}>
          <ProtectedRoute {...props} />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => {
      expect(Component.baseElement).toMatchSnapshot();
      done();
    });
  });

  it('should render client onboarding redirect', done => {
    props.path = '/client-onboarding';
    props.exact = false;
    props.currentUserRole = UserModel.Role.CLIENT_ADMIN;
    Component = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter initialEntries={['/']}>
          <ProtectedRoute {...props} />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => {
      expect(Component.baseElement).toMatchSnapshot();
      done();
    });
  });

  it('should redirect "/" when roleList is invalid', done => {
    props.roleList = [];
    Component = render(
      <MemoryRouter>
        <ProtectedRoute {...props} />
      </MemoryRouter>
    );
    setTimeout(() => {
      expect(Component.baseElement).toMatchSnapshot();
      done();
    });
  });
});
