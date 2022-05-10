import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../../../test/rootState';

import {
  getProject_1,
  getAccessControlSystemDevice_1,
  getAccessControlSystemDevice_2,
  getProjectAccessControlSystem_1,
  getProjectAccessControlSystem_2,
  getAccessControlSystemDevice_4,
} from '../../../../../../../../test/entities';
import { AccessControlSystemType } from '../../../../../../../models/accessControlSystem';
import AssignAccessControlSystem, { IAssignAccessControlSystemModalProps } from './AssignAccessControlSystemModal';
import { noop } from '../../../../../../../../utils/generalUtils';

jest.useFakeTimers();
jest.mock('../../../../../../shared/MenuPopover', () => {
  return (() => ({ menuOptionList }) => {
    return (
      <div>
        <button onClick={menuOptionList[0].callback} data-testid="filter-show-all">
          Show {menuOptionList[0].title}
        </button>
        <button onClick={menuOptionList[1].callback} data-testid="filter-show-selected">
          Show {menuOptionList[1].title}
        </button>
      </div>
    );
  })();
});

describe('AssignAccessControlSystemModal', () => {
  let props: IAssignAccessControlSystemModalProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      projectLocations: [{ id: 'locationId', name: 'locationName' }],
      acsId: null,
      isEditable: false,
      count: 16,
      projectAccessControlSystem: null,
      accessControlSystemMap: {
        [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1(),
        [getAccessControlSystemDevice_2().id]: getAccessControlSystemDevice_2(),
        [getAccessControlSystemDevice_4().id]: getAccessControlSystemDevice_4(),
        ['3']: { ...getAccessControlSystemDevice_1(), id: '3', serialNumber: 'WQABBE3129 - 8317', type: AccessControlSystemType.HANDHELD },
      },
      modalMap: {
        [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1(),
        [getAccessControlSystemDevice_2().id]: getAccessControlSystemDevice_2(),
        [getAccessControlSystemDevice_4().id]: getAccessControlSystemDevice_4(),
        ['3']: { ...getAccessControlSystemDevice_1(), id: '3', serialNumber: 'WQABBE3129 - 8317', type: AccessControlSystemType.HANDHELD },
      },
      loading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      assignLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      accessControlSystemAssignProjectLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      unassignAccessControlSystemAssignProjectLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      updateProjectAccessControlSystemLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      fetchProjectAccessControlSystem: jest.fn(),
      fetchAccessControlSystemList: jest.fn(),
      assignAccessControlSystem: jest.fn(),
      updateAccessControlSystem: jest.fn(),
      fetchAccessControlSystemSummary: jest.fn(),
      closeModal: jest.fn(),
      clearLoading: jest.fn(),
    };
  });

  it('should fetchAccessControlSystemList', () => {
    props.accessControlSystemMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchAccessControlSystemList).toHaveBeenCalledWith({
      limit: 6,
      query: '',
      page: 1,
      lastPage: 1,
      available: true,
    });
  });

  it('should render assign step', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render device step', () => {
    props.isEditable = true;
    props.projectAccessControlSystem = getProjectAccessControlSystem_2();
    props.projectLocations = [{ id: props.projectAccessControlSystem.location.id, name: 'Location Name' }];
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render assign step loading', () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render device step loading', () => {
    props.isEditable = true;
    props.accessControlSystemAssignProjectLoading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    props.projectAccessControlSystem = getProjectAccessControlSystem_2();
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should search', () => {
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByTestId('search-filter');

    act(() => {
      fireEvent.change(searchInput, {
        persist: () => {
          /* */
        },
        target: { value: 'search' },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.fetchAccessControlSystemList).toHaveBeenCalledWith({
      limit: 6,
      page: 1,
      lastPage: 1,
      query: 'search',
      available: true,
    });
  });

  it('should select item', () => {
    const { getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItem = getAllByTestId('acs-radio-item')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    expect(checkboxItem.classList).toContain('Mui-checked');
  });

  it('should change page', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageItem = getByText('2');

    act(() => {
      fireEvent.click(pageItem);
    });

    act(() => {
      fireEvent.click(pageItem);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.fetchAccessControlSystemList).toHaveBeenCalledWith({
      limit: 6,
      page: 2,
      lastPage: 1,
      query: '',
      available: true,
    });
  });

  it('should assignAccessControlSystem', () => {
    const { getByTestId, getByText, getAllByText, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItem = getAllByTestId('acs-radio-item')[1];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(getByText('Next Step'));
    });

    expect(props.fetchAccessControlSystemSummary).toHaveBeenCalled();

    act(() => {
      fireEvent.change(getByTestId('device-name'), { persist: noop, target: { name: 'deviceName', value: 'ACS Name' } });
    });

    act(() => {
      fireEvent.change(getByTestId('reader-1-hostaddress'), { persist: noop, target: { name: 'hostAddress', value: 'host address' } });
    });

    act(() => {
      fireEvent.change(getByTestId('reader-1-telnet-connection-port'), { persist: noop, target: { name: 'telnetConnectionPort', value: 'telnet port' } });
    });

    act(() => {
      fireEvent.change(getByTestId('reader-2-hostaddress'), { persist: noop, target: { name: 'hostAddress', value: 'host address 2' } });
    });

    act(() => {
      fireEvent.change(getByTestId('reader-2-telnet-connection-port'), { persist: noop, target: { name: 'telnetConnectionPort', value: 'telnet port 2' } });
    });

    act(() => {
      fireEvent.mouseDown(getByText('Select Option'));
    });

    act(() => {
      fireEvent.click(getAllByText('BiDirectional By Spec')[1]);
    });

    const locationSelect = getByTestId('location-select');

    act(() => {
      fireEvent.change(locationSelect, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.click(getAllByTestId('controlled-radio-button')[0]);
    });

    act(() => {
      fireEvent.click(getByText('Assign'));
    });

    expect(props.assignAccessControlSystem).toHaveBeenCalled();
  });

  it('should assignAccessControlSystem of type Handheld', () => {
    const { getByTestId, getByText, getAllByText, getAllByTestId, baseElement } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItem = getAllByTestId('acs-radio-item')[2];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(getByText('Next Step'));
    });

    expect(props.fetchAccessControlSystemSummary).toHaveBeenCalled();

    act(() => {
      fireEvent.change(getByTestId('device-name'), { persist: noop, target: { name: 'deviceName', value: 'ACS Name' } });
    });

    act(() => {
      fireEvent.click(getByText('Assign'));
    });

    expect(props.assignAccessControlSystem).toHaveBeenCalled();
  });

  it('should updateAccessControlSystem', () => {
    props.isEditable = true;
    props.projectAccessControlSystem = getProjectAccessControlSystem_1();
    const { getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.change(getByTestId('device-name'), { persist: noop, target: { name: 'deviceName', value: 'ACS Name' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.change(getByTestId('reader-1-hostaddress'), { persist: noop, target: { name: 'hostAddress', value: 'host address' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.change(getByTestId('reader-1-telnet-connection-port'), { persist: noop, target: { name: 'telnetConnectionPort', value: 'telnet port' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.mouseDown(getByText('Select Option'));
    });

    act(() => {
      fireEvent.click(getByText('Entrance'));
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(getByText('Save'));
    });

    expect(props.updateAccessControlSystem).toHaveBeenCalled();
  });

  it('should fetchProjectAccessControlSystem', () => {
    props.isEditable = true;
    props.acsId = getAccessControlSystemDevice_1().id;
    props.projectAccessControlSystem = getProjectAccessControlSystem_1();
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchProjectAccessControlSystem).toHaveBeenCalled();
  });

  it('should discard changes', () => {
    props.isEditable = true;
    props.projectAccessControlSystem = getProjectAccessControlSystem_1();
    const { getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.change(getByTestId('device-name'), { persist: noop, target: { name: 'deviceName', value: 'ACS Name' } });
    });

    act(() => {
      fireEvent.change(getByTestId('reader-1-hostaddress'), { persist: noop, target: { name: 'hostAddress', value: 'host address' } });
    });

    act(() => {
      fireEvent.change(getByTestId('reader-1-telnet-connection-port'), { persist: noop, target: { name: 'telnetConnectionPort', value: 'telnet port' } });
    });

    act(() => {
      fireEvent.click(getByText('Discard Changes'));
    });
  });

  it('should search with show selected filter', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByTestId('search-filter');
    const checkboxItemOne = getAllByTestId('acs-radio-item')[0];
    const showSelectedBtn = getByTestId('filter-show-selected');
    const showAllBtn = getByTestId('filter-show-all');

    act(() => {
      fireEvent.click(checkboxItemOne.querySelector('input'));
    });

    fireEvent.click(showSelectedBtn);

    act(() => {
      fireEvent.change(searchInput, {
        persist: () => {
          /* */
        },
        target: { value: '8317' },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getAllByTestId('assign-list-row')).toHaveLength(1);

    act(() => {
      fireEvent.click(showAllBtn);
    });
  });

  it('should render not found', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByTestId('search-filter');
    const checkboxItemOne = getAllByTestId('acs-radio-item')[0];
    const checkboxItemTwo = getAllByTestId('acs-radio-item')[1];
    const showSelectedBtn = getByTestId('filter-show-selected');

    act(() => {
      fireEvent.click(checkboxItemOne.querySelector('input'));
    });

    act(() => {
      fireEvent.click(checkboxItemTwo.querySelector('input'));
    });

    fireEvent.click(showSelectedBtn);

    act(() => {
      fireEvent.change(searchInput, {
        persist: () => {
          /* */
        },
        target: { value: 'something' },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getByTestId('not-found')).toBeTruthy();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    wrapper.unmount();

    expect(props.clearLoading).toHaveBeenCalled();
  });

  it('should change type filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignAccessControlSystem {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('All ACS'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Open Portal'));
    });

    expect(props.fetchAccessControlSystemList).toHaveBeenCalled();
  });
});
