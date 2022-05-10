import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router';

import ResultWithAddress from './ResultWithAddress';
import { ResourceModel, SearchModel } from 'modules/models';
import { getAddress_1 } from 'test/entities';

describe('ResultWithAddress', () => {
  let props: { onClick: () => void; item: SearchModel.IResponse };

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      item: {
        id: '3',
        name: 'Project Name',
        status: ResourceModel.Status.ACTIVE,
        address: getAddress_1(),
        entityType: SearchModel.SearchType.Project,
      },
    };
  });

  it('should render without address', () => {
    props.item.address = undefined;
    const { getByText } = render(
      <MemoryRouter>
        <ResultWithAddress {...props} />
      </MemoryRouter>
    );
    getByText(props.item.name);
  });

  it('should render with full address for projects', () => {
    props.item.address.stateName = 'Texas';
    const { getByText } = render(
      <MemoryRouter>
        <ResultWithAddress {...props} />
      </MemoryRouter>
    );
    getByText(props.item.name);
    const fullAddress = `${props.item.address.line1}, ${props.item.address.city}, ${props.item.address.stateName}`;
    getByText(fullAddress);
  });

  it('should render with city and state name for clients', () => {
    props.item.entityType = SearchModel.SearchType.Company;
    props.item.address.stateName = 'Texas';
    const { getByText } = render(
      <MemoryRouter>
        <ResultWithAddress {...props} />
      </MemoryRouter>
    );
    getByText(props.item.name);
    const stateAndCityName = `${props.item.address.city}, ${props.item.address.stateName}`;
    getByText(stateAndCityName);
  });

  it('should redirect to client detail page con click', async () => {
    props.item = {
      id: '3',
      name: 'Client Name',
      status: ResourceModel.Status.ACTIVE,
      address: getAddress_1(),
      entityType: SearchModel.SearchType.Company,
    };
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ResultWithAddress {...props} />
      </Router>
    );

    await act(async () => {
      await fireEvent.click(getByText(props.item.name));
    });

    expect(history.location.pathname).toBe(`/clients/detail/${props.item.id}`);
  });

  it('should redirect to project detail page con click', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ResultWithAddress {...props} />
      </Router>
    );

    await act(async () => {
      await fireEvent.click(getByText(props.item.name));
    });

    expect(history.location.pathname).toBe(`/projects/detail/${props.item.id}`);
  });
});
