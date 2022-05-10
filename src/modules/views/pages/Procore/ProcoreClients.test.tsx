import React from 'react';
import { render } from '@testing-library/react';
import ProcoreClients, { IProcoreClientsProps } from './ProcoreClients';
import { MemoryRouter } from 'react-router';
import { ProcoreModel, UserModel } from '../../../models';

describe('ProjectsTab', () => {
  let props: IProcoreClientsProps;

  const companies: ProcoreModel.IProcoreClient[] = [
    {
      company: {
        id: '123',
        name: 'foo',
      },
      status: 1,
      createdAt: '25/01/2021 10:00',
      numberOfProjects: 4,
    },
  ];

  beforeEach(() => {
    props = {
      clients: companies,
      getProcoreClients: jest.fn(),
      loading: {
        isLoading: false,
        hasError: false,
        error: {},
      },
      userRole: UserModel.Role.FCA_ADMIN,
    };
  });

  it('should render empty', () => {
    const wrapper = render(
      <MemoryRouter>
        <ProcoreClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});

describe('empty list', () => {
  let props: IProcoreClientsProps;

  const companies = [];

  beforeEach(() => {
    props = {
      clients: companies,
      getProcoreClients: jest.fn(),
      loading: {
        isLoading: false,
        hasError: false,
        error: {},
      },
    };
  });

  it('should render empty', () => {
    const wrapper = render(
      <MemoryRouter>
        <ProcoreClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});

describe('show CLIENT_ADMIN user', () => {
  let props: IProcoreClientsProps;

  beforeEach(() => {
    props = {
      getProcoreClients: jest.fn(),
      loading: {
        isLoading: false,
        hasError: false,
        error: {},
      },
      userRole: UserModel.Role.CLIENT_ADMIN,
    };
  });

  it('should render empty', () => {
    const wrapper = render(
      <MemoryRouter>
        <ProcoreClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.getByText('There are no Companies assigned'));
  });
});
