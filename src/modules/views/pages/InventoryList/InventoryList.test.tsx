import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, act, fireEvent } from '@testing-library/react';
import { Link } from 'react-router-dom';

import { getInitialState } from '../../../../test/rootState';
import { UserModel } from '../../../models';
import InventoryList, { IInventoryListProps } from './InventoryList';
import { getAccessControlSystemDevice_1, getInventoryStatistics_1 } from '../../../../test/entities';

describe('InventoryList', () => {
  let props: IInventoryListProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      inventoryStatistics: getInventoryStatistics_1(),
      statisticsLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchInventoryStatistics: jest.fn(),
      clearInventoryStatistics: jest.fn(),
    };
  });

  it('should render access control system tab', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter initialEntries={['?type=access-control-system']}>
          <InventoryList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render badge printing system tab', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter initialEntries={['?type=badge-printing-system']}>
          <InventoryList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterInput = wrapper.getAllByTestId('filter-status-opt');

    act(() => {
      fireEvent.click(filterInput[1]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should open drawer', async () => {
    const wrapper = render(
      <Provider
        store={createMockStore({
          ...getInitialState(),
          accessControlSystem: {
            accessControlSystemCount: 17,
            accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() },
          },
          general: {
            loadingMap: {
              fetchAccessControlSystemList: {
                isLoading: false,
              },
            },
          },
        })}
      >
        <MemoryRouter>
          <Link to={{ pathname: '/inventory', state: { success: true } }} data-testid="link-to-another" />
          <InventoryList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const inventoryRowOne = wrapper.getAllByTestId('device-list-row')[0];

    await act(async () => {
      await fireEvent.click(inventoryRowOne);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should close drawer on navigate away', () => {
    const wrapper = render(
      <Provider
        store={createMockStore({
          ...getInitialState(),
          accessControlSystem: {
            accessControlSystemCount: 17,
            accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() },
          },
          general: {
            loadingMap: {
              fetchAccessControlSystemList: {
                isLoading: false,
              },
            },
          },
        })}
      >
        <MemoryRouter>
          <Link to={{ pathname: '/inventory', state: { success: true } }} data-testid="link-to-another" />
          <InventoryList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const inventoryRowOne = wrapper.getAllByTestId('device-list-row')[0];
    const inventoryDrawerDetail = wrapper.getByTestId('acs-drawer-detail');

    act(() => {
      fireEvent.click(inventoryRowOne);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });

    expect(inventoryDrawerDetail.classList).toContain('closed');
  });

  it('should fetch inventory statistics', () => {
    props.inventoryStatistics = null;
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InventoryList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchInventoryStatistics).toHaveBeenCalled();
  });
});
