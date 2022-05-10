import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getProjectActiviesWidget_1 } from '../../../../../../test/entities';
import NewActiveClients, { INewActiveClientsProps } from './NewActiveClients';

describe('NewActiveClients Component', () => {
  let wrapper: RenderResult;
  let props: INewActiveClientsProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      locationWidget: getProjectActiviesWidget_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchActiveClients: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <NewActiveClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchActiveClients', () => {
    props.locationWidget = null;
    render(
      <MemoryRouter>
        <NewActiveClients {...props} />
      </MemoryRouter>
    );
    expect(props.fetchActiveClients).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <NewActiveClients {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
