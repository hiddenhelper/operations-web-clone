import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent } from '@testing-library/react';

import { getInitialState } from '../../../../test/rootState';
import { getUser_1 } from '../../../../test/entities';
import { useHideScroll } from '../../../../utils/useHideScroll';

import { UserModel } from '../../../models';
import Header, { IHeaderProps } from './Header';

jest.mock('../../../../utils/useHideScroll', () => ({
  useHideScroll: jest.fn().mockImplementation(() => ({ isScrollHided: false, setHideScroll: jest.fn() })),
}));

describe('Header', () => {
  let props: IHeaderProps;

  beforeEach(() => {
    props = {
      user: getUser_1(),
      userRole: UserModel.Role.FCA_ADMIN,
      logout: jest.fn(),
      navigate: jest.fn(),
      handleDrawerToggle: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Header {...props} />
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should navigate to Account Settings', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Header {...props} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(wrapper.getByTestId('popover-button'));
    fireEvent.click(wrapper.getAllByTestId('popover-menu-button')[0]);

    expect(wrapper.getByTestId('popover-wrapper')).toMatchSnapshot();
    expect(props.navigate).toHaveBeenCalledWith('/account/settings');
  });

  it('should NOT navigate to Payment Settings', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Header {...props} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(wrapper.getByTestId('popover-button'));
    fireEvent.click(wrapper.getAllByTestId('popover-menu-button')[1]);

    expect(wrapper.getByTestId('popover-wrapper')).toMatchSnapshot();
    expect(props.navigate).not.toHaveBeenCalledWith('/payment/settings');
  });

  it('should navigate to Payment Settings when Client Admin', async () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Header {...props} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(wrapper.getByTestId('popover-button'));
    fireEvent.click(wrapper.getAllByTestId('popover-menu-button')[1]);

    expect(wrapper.getByTestId('popover-wrapper')).toMatchSnapshot();
    expect(props.navigate).toHaveBeenCalledWith('/payment/settings');
  });

  it('should render without scroll', () => {
    (useHideScroll as any).mockImplementation(() => ({ isScrollHided: true, setHideScroll: jest.fn() }));
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Header {...props} />
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
