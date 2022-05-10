import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AccessControlSystemDrawer, { IDeviceDrawerProps } from './AccessControlSystemDrawer';
import { getAccessControlSystemDevice_1 } from '../../../../../../test/entities';
import { DeviceModel } from '../../../../../models';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../test/rootState';
import { Provider } from 'react-redux';

describe('AccessControlSystemDrawer', () => {
  let props: IDeviceDrawerProps;

  beforeEach(() => {
    props = {
      isOpen: true,
      isLoading: false,
      deleteLoading: undefined,
      deviceListElement: null,
      device: getAccessControlSystemDevice_1(),
      onClose: jest.fn(),
      onDelete: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.isLoading = true;
    props.deleteLoading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Loading...'));
  });

  it('should render alternative values', () => {
    props.device = {
      ...getAccessControlSystemDevice_1(),
      status: DeviceModel.DeviceStatus.AVAILABLE,
      reader1: {
        ...getAccessControlSystemDevice_1().reader1,
        lastMaintenanceDate: null,
        notes: null,
      },
      reader2: {
        ...getAccessControlSystemDevice_1().reader1,
        lastMaintenanceDate: null,
        notes: null,
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render alternative reader values', () => {
    props.device = {
      ...getAccessControlSystemDevice_1(),
      status: DeviceModel.DeviceStatus.AVAILABLE,
      reader1: {
        ...getAccessControlSystemDevice_1().reader1,
        lastMaintenanceDate: '2021-01-14T00:00:00-03:00',
        notes: 'acs reader 1',
      },
      reader2: {
        ...getAccessControlSystemDevice_1().reader1,
        lastMaintenanceDate: '2021-01-14T00:00:00-03:00',
        notes: 'acs reader 2',
        inServiceDate: null,
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
