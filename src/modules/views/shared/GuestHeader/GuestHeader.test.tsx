import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render } from '@testing-library/react';

import { getInitialState } from '../../../../test/rootState';
import { getClient_1, getUser_1 } from '../../../../test/entities';

import GuestHeader, { IGuestHeaderProps } from './GuestHeader';
import { MemoryRouter } from 'react-router-dom';
import { useHideScroll } from '../../../../utils/useHideScroll';

jest.mock('../../../../utils/useHideScroll', () => ({
  useHideScroll: jest.fn().mockImplementation(() => ({ isScrollHided: false, setHideScroll: jest.fn() })),
}));

describe('Header', () => {
  let props: IGuestHeaderProps;

  beforeEach(() => {
    props = {
      user: getUser_1(),
      logout: jest.fn(),
      clientMap: { [getClient_1().id]: getClient_1() },
      companyId: getClient_1().id,
      fetchClient: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <GuestHeader {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should fetchClient', () => {
    props.clientMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <GuestHeader {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchClient).toHaveBeenCalledWith(getClient_1().id);
  });

  it('should render without scroll', () => {
    (useHideScroll as any).mockImplementation(() => ({ isScrollHided: true, setHideScroll: jest.fn() }));
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <GuestHeader {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
