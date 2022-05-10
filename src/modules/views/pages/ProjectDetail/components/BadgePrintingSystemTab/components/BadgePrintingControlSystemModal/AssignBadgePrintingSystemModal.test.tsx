import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getProject_1, getBadgePrinterSystem_2, getBadgePrinterSystem_1 } from '../../../../../../../../test/entities';
import AssignBadgePrintingSystemModal, { IAssignBadgePrintingSystemModalProps } from './AssignBadgePrintingSystemModal';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../../../test/rootState';
import { Provider } from 'react-redux';

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

describe('AssignBadgePrintingSystemModal', () => {
  let props: IAssignBadgePrintingSystemModalProps;

  beforeEach(() => {
    props = {
      id: getProject_1().id,
      count: 16,
      badgePrintingSystemMap: {
        [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1(),
        [getBadgePrinterSystem_2().id]: getBadgePrinterSystem_2(),
        ['3']: { ...getBadgePrinterSystem_2(), id: '3' },
      },
      assignLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      loading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      fetchBadgePrintingSystemList: jest.fn(),
      assignBadgePrintingSystem: jest.fn(),
      closeModal: jest.fn(),
    };
  });

  it('should fetchBadgePrintingSystemList', () => {
    props.badgePrintingSystemMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchBadgePrintingSystemList).toHaveBeenCalledWith({
      limit: 6,
      query: '',
      page: 1,
      lastPage: 1,
      available: true,
    });
  });

  it('should render', () => {
    const { baseElement } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.loading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should search', () => {
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
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

    expect(props.fetchBadgePrintingSystemList).toHaveBeenCalledWith({
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
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    expect(checkboxItem.classList).toContain('Mui-checked');

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    expect(checkboxItem.classList).not.toContain('Mui-checked');
  });

  it('should change page', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
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

    expect(props.fetchBadgePrintingSystemList).toHaveBeenCalledWith({
      limit: 6,
      page: 2,
      lastPage: 1,
      query: '',
      available: true,
    });
  });

  it('should submit', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const assignBtnConfirm = getByTestId('assign-btn-confirm');
    const checkboxItem = getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignBadgePrintingSystem).toHaveBeenCalledWith(getProject_1().id, [{ badgePrintingSystemId: '3', date: undefined }]);
  });

  it('should show selected', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxItemOne = getAllByTestId('multiple-checkbox')[1];
    const checkboxItemTwo = getAllByTestId('multiple-checkbox')[2];
    const showSelectedBtn = getByTestId('filter-show-selected');
    const showAllBtn = getByTestId('filter-show-all');

    act(() => {
      fireEvent.click(checkboxItemOne.querySelector('input'));
    });

    act(() => {
      fireEvent.click(checkboxItemTwo.querySelector('input'));
    });

    fireEvent.click(showSelectedBtn);

    expect(getAllByTestId('assign-list-row')).toHaveLength(2);

    fireEvent.click(showAllBtn);

    expect(props.fetchBadgePrintingSystemList).toHaveBeenCalled();
  });

  it('should search with show selected filter', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByTestId('search-filter');
    const checkboxItemOne = getAllByTestId('multiple-checkbox')[0];
    const checkboxItemTwo = getAllByTestId('multiple-checkbox')[1];
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
        target: { value: getBadgePrinterSystem_2().printer.serialNumber },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getAllByTestId('assign-list-row')).toHaveLength(1);
  });

  it('should render not found', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignBadgePrintingSystemModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByTestId('search-filter');
    const checkboxItemOne = getAllByTestId('multiple-checkbox')[0];
    const checkboxItemTwo = getAllByTestId('multiple-checkbox')[1];
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
});
