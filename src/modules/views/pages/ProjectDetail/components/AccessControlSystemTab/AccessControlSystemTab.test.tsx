import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import { getProject_1, getAccessControlSystemDevice_1, getAccessControlSystemDevice_2, getAccessControlSystemDevice_3 } from '../../../../../../test/entities';
import { getAdminInitialState } from '../../../../../../test/rootState';
import AccessControlSystemTab, { IAccessControlSystemTab } from './AccessControlSystemTab';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('AccessControlSystemTab', () => {
  let props: IAccessControlSystemTab;

  beforeEach(() => {
    props = {
      queryParams: { page: 1, limit: 30 },
      currentProject: getProject_1(),
      accessControlSystemMap: {
        [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1(),
        [getAccessControlSystemDevice_2().id]: getAccessControlSystemDevice_2(),
        [getAccessControlSystemDevice_3().id]: getAccessControlSystemDevice_3(),
      },
      accessControlSystemCount: 1,
      projectAccessControlSystem: null,
      unassignAccessControlSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      accessControlSystemSummaryLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      loadAccessControlSystemModalLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      accessControlSystemProjectLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      accessControlSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      updateProjectAccessControlSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      accessControlSystemAssignProjectLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      assignAccessControlSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      assignLoading: undefined,
      ctaDisabled: false,
      drawer: { open: false, id: null },
      modalMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() },
      modalCount: null,
      isModalOpen: false,
      projectListElement: { offsetHeight: 10 },
      setDrawer: jest.fn(),
      onPageChange: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      fetchProjectAccessControlSystem: jest.fn(),
      fetchAccessControlSystemList: jest.fn(),
      fetchAccessControlSystemSummary: jest.fn(),
      assignAccessControlSystem: jest.fn(),
      updateAccessControlSystem: jest.fn(),
      unAssignAccessControlSystem: jest.fn(),
      clearLoading: jest.fn(),
      fetchProjectAccessControlSystemList: jest.fn(),
      setQueryParams: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
  });

  it('should fetchProjectAccessControlSystemList', () => {
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectAccessControlSystemList).toHaveBeenCalled();
  });

  it('should render clear and fetchProjectAccessControlSystemList', () => {
    props.assignAccessControlSystemLoading = undefined;
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.closeModal).toHaveBeenCalled();
    expect(props.clearLoading).toHaveBeenCalled();
    expect(props.fetchProjectAccessControlSystemList).toHaveBeenCalled();
  });

  it('should render empty', () => {
    props.accessControlSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('There are no ACS assigned')).toBeTruthy();
  });

  it('should render', () => {
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [{ location: getAccessControlSystemDevice_1().location, accessControlSystems: [getAccessControlSystemDevice_1().id] }],
    };
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should list handhelds at the end', () => {
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [
        { location: getAccessControlSystemDevice_1().location, accessControlSystems: [getAccessControlSystemDevice_1().id] },
        { location: { id: 'testLoc', name: 'testLoc' }, accessControlSystems: [getAccessControlSystemDevice_1().id] },
        { location: null, accessControlSystems: [getAccessControlSystemDevice_2().id] },
      ],
    };
    const { container, getByTestId } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(getByTestId('no-location-item-wrapper')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render with empty location items', () => {
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [{ location: null, accessControlSystems: [getAccessControlSystemDevice_2().id] }],
    };
    const { container, getByTestId } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('no-location-item-wrapper')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.accessControlSystemLoading = { isLoading: true, hasError: false, error: null };
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show drawer loading', () => {
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [{ location: getAccessControlSystemDevice_1().location, accessControlSystems: [getAccessControlSystemDevice_1().id] }],
    };
    props.accessControlSystemSummaryLoading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('acs-item')[0]);
    });

    expect(wrapper.getByText('Loading...')).toBeTruthy();
  });

  it('should show drawer info with name for projects ACSs', () => {
    props.drawer = { open: true, id: getAccessControlSystemDevice_3().id };
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [{ location: getAccessControlSystemDevice_3().location, accessControlSystems: [getAccessControlSystemDevice_3().id] }],
    };
    props.isModalOpen = true;
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('acs-item')[0]);
    });

    expect(wrapper.getAllByText(getAccessControlSystemDevice_3().deviceName).length).toBe(2);
  });

  it('should show edition modal', () => {
    props.drawer = { open: true, id: getAccessControlSystemDevice_1().id };
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [{ location: getAccessControlSystemDevice_1().location, accessControlSystems: [getAccessControlSystemDevice_1().id] }],
    };
    props.isModalOpen = true;
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('acs-item')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('acs-edition-modal-open-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-close'));
    });

    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should unassign', () => {
    props.drawer = { open: true, id: getAccessControlSystemDevice_1().id };
    props.currentProject = {
      ...getProject_1(),
      acsIdListByLocation: [{ location: getAccessControlSystemDevice_1().location, accessControlSystems: [getAccessControlSystemDevice_1().id] }],
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('acs-item')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('unassign-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.unAssignAccessControlSystem).toHaveBeenCalledWith(getProject_1().id, getAccessControlSystemDevice_1().id);
  });

  it('should closeModal', () => {
    props.assignLoading = {
      isLoading: false,
      hasError: false,
      error: null,
    };
    props.isModalOpen = true;
    const { getByTestId } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(getByTestId('form-dialog-close'));
    });

    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should change acs type filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('All ACS'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Handheld'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <AccessControlSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.setDrawer).toHaveBeenCalled();
  });
});
