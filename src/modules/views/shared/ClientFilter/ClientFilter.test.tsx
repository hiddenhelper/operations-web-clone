import React from 'react';
import { MemoryRouter } from 'react-router';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import ClientFilter, { IClientFilterProps } from './ClientFilter';
import { getClient_1, getProject_1 } from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';

describe('ClientFilter', () => {
  let props: IClientFilterProps;

  beforeEach(() => {
    props = {
      queryParams: { page: 1, limit: 30 },
      clientMap: {
        [getClient_1().id]: getClient_1() as any,
      },
      projectId: getProject_1().id,
      isFcAdmin: true,
      setQueryParams: jest.fn(),
      fetchClientList: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientFilter {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchClientList).toHaveBeenCalled();
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render default', () => {
    props.clientMap = undefined;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientFilter {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change client filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientFilter {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByText('All Clients')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Robert C. Martin'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });
});
