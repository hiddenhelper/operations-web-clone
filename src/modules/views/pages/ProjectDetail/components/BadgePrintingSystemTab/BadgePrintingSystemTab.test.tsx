import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import { getProject_1, getBadgePrinterSystem_1 } from '../../../../../../test/entities';
import { getAdminInitialState } from '../../../../../../test/rootState';
import BadgePrintingSystemTab, { IBadgePrintingSystemTabProps } from './BadgePrintingSystemTab';

jest.mock('@material-ui/pickers', () => ({
  MuiPickersUtilsProvider: ({ children }) => children,
  KeyboardDatePicker: ({ onChange, onOpen = () => /* tslint:disable:no-empty */ {}, onClose = () => /* tslint:disable:no-empty */ {}, value }) => {
    const onChangeHandler = event => {
      onOpen();
      onChange(event.target.value);
      onClose();
    };
    return (
      <div>
        <input data-testid="datepicker-item" value={value || ''} onChange={onChangeHandler} />
      </div>
    );
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('BadgePrintingSystemTab', () => {
  let props: IBadgePrintingSystemTabProps;

  beforeEach(() => {
    props = {
      queryParams: { page: 1, limit: 30 },
      currentProject: getProject_1(),
      badgePrintingSystemMap: { [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1() },
      badgePrintingSystemCount: 1,
      unassignBadgePrintingSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      badgePrintingSystemSummaryLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      loadBadgePrintingSystemModalLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      badgePrintingSystemProjectLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      assignBadgePrintingSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      badgePrintingSystemLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      ctaDisabled: false,
      drawer: { open: false, id: null },
      modalMap: { [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1() },
      modalCount: null,
      isModalOpen: false,
      projectListElement: { offsetHeight: 10 },
      setDrawer: jest.fn(),
      onPageChange: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      fetchBadgePrintingSystemList: jest.fn(),
      fetchBadgePrintingSystemSummary: jest.fn(),
      assignBadgePrintingSystem: jest.fn(),
      unAssignBadgePrintingSystem: jest.fn(),
      updateBadgePrintingSystemDate: jest.fn(),
      fetchProjectBadgePrintingSystemList: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
  });

  it('should render empty', () => {
    props.badgePrintingSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('There are no BPS assigned')).toBeTruthy();
  });

  it('should fetchProjectBadgePrintingSystemList', () => {
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectBadgePrintingSystemList).toHaveBeenCalled();
  });

  it('should render', () => {
    props.currentProject = { ...getProject_1(), bpsIdList: [getBadgePrinterSystem_1().id] };
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.badgePrintingSystemLoading = { isLoading: true, hasError: false, error: null };
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render without date', () => {
    props.currentProject = { ...getProject_1(), bpsIdList: [getBadgePrinterSystem_1().id] };
    props.badgePrintingSystemMap = { [getBadgePrinterSystem_1().id]: { ...getBadgePrinterSystem_1(), shippingDate: null } };
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should assign bps', () => {
    props.isModalOpen = true;
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItem = wrapper.getAllByTestId('multiple-checkbox')[0];
    // const input = wrapper.getAllByTestId('datepicker-item')[0];

    // act(() => {
    //   fireEvent.change(input, { target: { value: '2020/10/12' } });
    // });

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('assign-btn-confirm'));
    });

    // expect(props.assignBadgePrintingSystem).toHaveBeenCalledWith(getProject_1().id, [
    //   { badgePrintingSystemId: getBadgePrinterSystem_1().id, shippingDate: '2020/10/12' },
    // ]);

    act(() => {
      fireEvent.click(wrapper.getByTestId('assign-btn-close'));
    });

    expect(props.assignBadgePrintingSystem).toHaveBeenCalled();
  });

  it('should show drawer loading', () => {
    props.currentProject = { ...getProject_1(), bpsIdList: [getBadgePrinterSystem_1().id] };
    props.badgePrintingSystemSummaryLoading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('bps-list-row')[0]);
    });

    expect(wrapper.getByText('Loading...')).toBeTruthy();
  });

  // it('should show edition modal', () => {
  //   props.currentProject = { ...getProject_1(), bpsIdList: [getBadgePrinterSystem_1().id] };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getAdminInitialState())}>
  //       <MemoryRouter>
  //         <BadgePrintingSystemTab {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   act(() => {
  //     fireEvent.click(wrapper.getAllByTestId('bps-list-row')[0]);
  //   });

  //   act(() => {
  //     fireEvent.click(wrapper.getByTestId('bps-edition-modal-open-btn'));
  //   });

  //   expect(wrapper.getByTestId('confirm-modal-title')).toBeTruthy();

  //   const input = wrapper.getAllByTestId('datepicker-item')[0];

  //   act(() => {
  //     fireEvent.change(input, { target: { value: '2020/10/12' } });
  //   });

  //   act(() => {
  //     fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
  //   });

  //   expect(props.updateBadgePrintingSystemDate).toHaveBeenCalled();

  //   act(() => {
  //     fireEvent.click(wrapper.getByTestId('modal-close-btn'));
  //   });
  // });

  it('should unassign', () => {
    props.drawer = { open: true, id: getBadgePrinterSystem_1().id };
    props.currentProject = { ...getProject_1(), bpsIdList: [getBadgePrinterSystem_1().id] };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('bps-list-row')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('unassign-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.unAssignBadgePrintingSystem).toHaveBeenCalledWith(getProject_1().id, getBadgePrinterSystem_1().id);
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <BadgePrintingSystemTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.setDrawer).toHaveBeenCalled();
  });
});
