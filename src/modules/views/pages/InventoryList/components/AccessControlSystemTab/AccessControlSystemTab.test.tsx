import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, act, fireEvent } from '@testing-library/react';
import AccessControlSystemTab, { IAccessControlSystemTabProps } from './AccessControlSystemTab';
import { getAccessControlSystemDevice_1, getAccessControlSystemDevice_2 } from '../../../../../../test/entities';
import { AccessControlSystemModel, DeviceModel } from '../../../../../models';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../test/rootState';
import { Provider } from 'react-redux';

jest.useFakeTimers();

jest.mock('moment', () => () => ({
  format: jest.fn().mockReturnValue('08/03/2015'),
}));

describe('AccessControlSystemTab', () => {
  let props: IAccessControlSystemTabProps;

  beforeEach(() => {
    props = {
      queryParams: { page: 1, limit: 30, deviceType: DeviceModel.DeviceType.ACCESS_CONTROL_SYSTEM },
      accessControlSystemMap: {
        [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1(),
        [getAccessControlSystemDevice_2().id]: getAccessControlSystemDevice_2(),
      },
      deviceCount: 1,
      isDrawerOpen: false,
      loading: undefined,
      summaryLoading: undefined,
      deleteLoading: undefined,
      deviceListElement: { current: null },
      onPageChange: jest.fn(),
      setDrawer: jest.fn(),
      fetchAccessControlSystemList: jest.fn(),
      fetchAccessControlSystemSummary: jest.fn(),
      deleteAccessControlSystem: jest.fn(),
      navigate: jest.fn(),
      setQueryParams: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    jest.runAllTimers();
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.loading = { isLoading: true, error: null, hasError: false };
    props.summaryLoading = { isLoading: true, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    jest.runAllTimers();
    expect(wrapper.getAllByText('Loading...')).toHaveLength(2);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should open device drawer', () => {
    props.loading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deviceRow = wrapper.getAllByTestId('device-list-row')[0];

    act(() => {
      fireEvent.click(deviceRow);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should close acs drawer', () => {
    props.loading = { isLoading: false, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const acsRow = wrapper.getAllByTestId('device-list-row')[0];
    const closeBtn = wrapper.getByTestId('drawer-close-btn');
    const acsDrawerDetail = wrapper.getByTestId('acs-drawer-detail');

    act(() => {
      fireEvent.click(acsRow);
    });

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(acsDrawerDetail.classList).toContain('closed');
  });

  it('should change page', () => {
    props.loading = { isLoading: false, error: null, hasError: false };
    props.deviceCount = 32;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    expect(props.fetchAccessControlSystemList).toHaveBeenCalledWith({
      limit: 30,
      page: 1,
      deviceType: 'access-control-system',
    });
  });

  // describe('should delete access control system', () => {
  //   it('with many items', () => {
  //     props.loading = { isLoading: false, error: null, hasError: false };
  //     props.deleteLoading = { isLoading: false, error: null, hasError: false };
  //     const wrapper = render(
  //       <Provider store={createMockStore(getInitialState()) as any}>
  //         <MemoryRouter>
  //           <AccessControlSystemTab {...props} />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const deviceRow = wrapper.getAllByTestId('device-list-row')[0];

  //     act(() => {
  //       fireEvent.click(deviceRow);
  //     });

  //     const deleteButton = wrapper.getByTestId('deleteAcsBtn');

  //     act(() => {
  //       fireEvent.click(deleteButton);
  //     });

  //     const confirmButton = wrapper.getByTestId('confirm-button');

  //     act(() => {
  //       fireEvent.click(confirmButton);
  //     });

  //     expect(wrapper.container).toMatchSnapshot();
  //     expect(props.deleteAccessControlSystem).toHaveBeenCalled();
  //   });

  //   it('with one item', () => {
  //     props.loading = { isLoading: false, error: null, hasError: false };
  //     props.deleteLoading = undefined;
  //     props.accessControlSystemMap = { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() };

  //     const wrapper = render(
  //       <Provider store={createMockStore(getInitialState()) as any}>
  //         <MemoryRouter initialEntries={['?page=2']}>
  //           <AccessControlSystemTab {...props} />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const deviceRow = wrapper.getAllByTestId('device-list-row')[0];

  //     act(() => {
  //       fireEvent.click(deviceRow);
  //     });

  //     const deleteButton = wrapper.getByTestId('deleteAcsBtn');

  //     act(() => {
  //       fireEvent.click(deleteButton);
  //     });

  //     const confirmButton = wrapper.getByTestId('confirm-button');

  //     act(() => {
  //       fireEvent.click(confirmButton);
  //     });

  //     props.accessControlSystemMap = {};
  //     props.deleteLoading = { isLoading: false, error: null, hasError: false };

  //     wrapper.rerender(
  //       <Provider store={createMockStore(getInitialState()) as any}>
  //         <MemoryRouter initialEntries={['?page=2']}>
  //           <AccessControlSystemTab {...props} />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     expect(wrapper.container).toMatchSnapshot();
  //     expect(props.deleteAccessControlSystem).toHaveBeenCalled();
  //   });
  // });

  // it('should delete last access control system in page', () => {
  //   props.loading = { isLoading: false, error: null, hasError: false };
  //   props.accessControlSystemMap = { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter initialEntries={['?page=2']}>
  //         <AccessControlSystemTab {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const deviceRow = wrapper.getAllByTestId('device-list-row')[0];

  //   act(() => {
  //     fireEvent.click(deviceRow);
  //   });

  //   const deleteButton = wrapper.getByTestId('deleteAcsBtn');

  //   act(() => {
  //     fireEvent.click(deleteButton);
  //   });

  //   const confirmButton = wrapper.getByTestId('confirm-button');

  //   act(() => {
  //     fireEvent.click(confirmButton);
  //   });

  //   expect(wrapper.container).toMatchSnapshot();
  //   expect(props.deleteAccessControlSystem).toHaveBeenCalled();
  // });

  // it('should cancel delete access control system', () => {
  //   props.loading = { isLoading: false, error: null, hasError: false };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <AccessControlSystemTab {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const deviceRow = wrapper.getAllByTestId('device-list-row')[0];

  //   act(() => {
  //     fireEvent.click(deviceRow);
  //   });

  //   const deleteButton = wrapper.getByTestId('deleteAcsBtn');

  //   act(() => {
  //     fireEvent.click(deleteButton);
  //   });

  //   const cancelButton = wrapper.getByTestId('cancel-button');

  //   act(() => {
  //     fireEvent.click(cancelButton);
  //   });

  //   expect(wrapper.container).toMatchSnapshot();
  //   expect(props.deleteAccessControlSystem).not.toHaveBeenCalled();
  // });

  // it('should navigate to create ACS device', () => {
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <AccessControlSystemTab {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const createACSButton = wrapper.getByTestId('create-acs-btn');

  //   fireEvent.click(createACSButton);

  //   expect(props.navigate).toHaveBeenCalledWith('/inventory/access-control-system/wizard/new');
  // });

  it('should change type filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const selectBtn = wrapper.getByText('All Types');

    act(() => {
      fireEvent.click(selectBtn);
    });

    const portalOptions = wrapper.getAllByText('Open Portal');

    act(() => {
      fireEvent.click(portalOptions[0]);
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({
      page: 1,
      limit: 30,
      deviceType: DeviceModel.DeviceType.ACCESS_CONTROL_SYSTEM,
      type: AccessControlSystemModel.AccessControlSystemType.PORTAL,
    });
  });

  it('should change status filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const selectBtn = wrapper.getByText('All Status');

    act(() => {
      fireEvent.click(selectBtn);
    });

    const availableOptions = wrapper.getAllByText('Available');

    act(() => {
      fireEvent.click(availableOptions[0]);
    });

    expect(props.setQueryParams).toHaveBeenCalledWith({
      page: 1,
      limit: 30,
      deviceType: DeviceModel.DeviceType.ACCESS_CONTROL_SYSTEM,
      available: true,
    });

    props.queryParams = { page: 1, limit: 30, deviceType: DeviceModel.DeviceType.ACCESS_CONTROL_SYSTEM, available: true };

    wrapper.rerender(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change status filter to all', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const selectBtn = wrapper.getByText('All Status');

    act(() => {
      fireEvent.click(selectBtn);
    });

    const availableOptions = wrapper.getAllByText('Available');

    act(() => {
      fireEvent.click(availableOptions[0]);
    });

    const availableOptionSelect = wrapper.getAllByText('Available');

    act(() => {
      fireEvent.click(availableOptionSelect[0]);
    });

    const selectBtnAll = wrapper.getByText('All Status');

    act(() => {
      fireEvent.click(selectBtnAll);
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });
});
