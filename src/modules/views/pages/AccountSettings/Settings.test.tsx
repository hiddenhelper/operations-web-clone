import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { UserModel } from '../../../models';
import { getUploadFile_1, getUser_1 } from '../../../../test/entities';
import Settings, { ISettingsProps } from './Settings';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { Provider } from 'react-redux';

describe.skip('Settings', () => {
  let props: ISettingsProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      user: getUser_1(),
      clearChangePasswordLoading: jest.fn(),
      fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } },
      getAccountData: jest.fn(),
      status: { isConnected: false },
      getStatusProcore: jest.fn(),
      connectProcore: jest.fn(),
      disconnectProcore: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <Settings {...props} />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should change filter option', () => {
    const { container, getAllByTestId } = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <Settings {...props} />
        </Provider>
      </MemoryRouter>
    );

    const filterOptList = getAllByTestId('filter-status-opt')[1];

    act(() => {
      filterOptList.click();
    });

    const isPresentActiveFilter = Object.values(filterOptList.classList).filter(item => item.indexOf('activeFilter') > 0);

    expect(isPresentActiveFilter).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
  it.skip('should render tabs', () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    const wrapper = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <Settings {...props} />
        </Provider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('filter-status-opt')[2]);
    });
    expect(wrapper.container).toMatchSnapshot();

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('filter-status-opt')[0]);
    });
    expect(wrapper.container).toMatchSnapshot();

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('filter-status-opt')[1]);
    });
    expect(wrapper.container).toMatchSnapshot();
  });
});
