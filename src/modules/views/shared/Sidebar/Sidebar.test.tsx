import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render } from '@testing-library/react';

import { UserModel } from '../../../models';
import { getAdminInitialState } from '../../../../test/rootState';

import Sidebar, { ISidebarProps } from './Sidebar';

describe('Sidebar', () => {
  let props: ISidebarProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      location: {
        pathname: '',
      },
    };
  });

  it.skip('should render inital route selected', () => {
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <Sidebar {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it.skip('should render clients tab selected', () => {
    props.location.pathname = '/clients';
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <Sidebar {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it.skip('should render admin tab selected', () => {
    props.location.pathname = '/admin';
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <Sidebar {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render ProcoreCompanies tab selected', () => {
    props.location.pathname = '/admin/root-account';
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <Sidebar {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
