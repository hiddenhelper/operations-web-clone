import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';

import { UserModel } from '../../../../../../../models';
import { getAdminInitialState, getInitialState } from '../../../../../../../../test/rootState';
import { getProject_1, getClient_1 } from '../../../../../../../../test/entities';
import { noop } from '../../../../../../../../utils/generalUtils';

import AssignSubContractorModal, { IAssignSubContractorModalProps } from './AssignSubContractorModal';

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

describe('AssignSubContractorModal', () => {
  let props: IAssignSubContractorModalProps;

  beforeEach(() => {
    props = {
      id: getProject_1().id,
      count: 16,
      userRole: UserModel.Role.FCA_ADMIN,
      userCompanyId: getClient_1().id,
      subContractorMap: {
        [getClient_1().id]: getClient_1(),
        ['1']: { ...getClient_1(), id: '1' },
        ['2']: { ...getClient_1(), id: '2', name: 'test name' },
        ['3']: {
          ...getClient_1(),
          id: '3',
          billingAddress: {
            city: 'New York',
            stateCode: 'FL',
            stateName: 'Florida',
            zipCode: '123',
            line1: 'Bigrok',
            line2: '',
            latitude: null,
            longitude: null,
          },
        },
      },
      uiRelationMap: {
        'project-client-id': {
          searchResult: [getClient_1()],
        },
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
      fetchSubContractorList: jest.fn(),
      assignSubcontractor: jest.fn(),
      searchCompanies: jest.fn(),
      clearRelationMap: jest.fn(),
      closeModal: jest.fn(),
    };
  });

  it('should fetchSubContractorList', () => {
    props.subContractorMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchSubContractorList).toHaveBeenCalledWith({
      isDeveloper: false,
      limit: 6,
      query: '',
      page: 1,
      lastPage: 1,
      excludeFromProjectId: getProject_1().id,
      status: 2,
    });
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.loading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearRelationMap).toHaveBeenCalled();
  });

  it('should search', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const searchInput = wrapper.getByTestId('search-filter');

    act(() => {
      fireEvent.change(searchInput, { persist: noop(), target: { value: 'search' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.fetchSubContractorList).toHaveBeenCalledWith({
      isDeveloper: false,
      limit: 6,
      page: 1,
      lastPage: 1,
      query: 'search',
      excludeFromProjectId: getProject_1().id,
      status: 2,
    });
  });

  it('should select item', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const checkboxItem = wrapper.getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    expect(checkboxItem.classList).toContain('Mui-checked');

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    expect(checkboxItem.classList).not.toContain('Mui-checked');
  });

  it('should prevent select empty client', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Invalid' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const nextBtn = wrapper.getByTestId('assign-btn-confirm');

    expect(nextBtn.disabled).toBeTruthy();
  });

  it('should reset', () => {
    props.uiRelationMap = {
      'project-client-id': {
        searchResult: [{ id: null, name: 'test' }],
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change page', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const pageItem = wrapper.getByText('2');

    act(() => {
      fireEvent.click(pageItem);
    });

    act(() => {
      fireEvent.click(pageItem);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.fetchSubContractorList).toHaveBeenCalledWith({
      isDeveloper: false,
      limit: 6,
      page: 2,
      lastPage: 1,
      excludeFromProjectId: getProject_1().id,
      status: 2,
    });
  });

  it('should submit', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');
    const assignBtnConfirm = wrapper.getByTestId('assign-btn-confirm');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const checkboxItem = wrapper.getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    const taxInput = wrapper.getAllByText('Select Option')[0];

    act(() => {
      fireEvent.mouseDown(taxInput);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Exempt'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignSubcontractor).toHaveBeenCalledWith(getProject_1().id, [{ id: '1', role: 2, isTaxExempt: true }], getClient_1().id);
  });

  it('should show selected', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const checkboxItemOne = wrapper.getAllByTestId('multiple-checkbox')[1];
    const checkboxItemTwo = wrapper.getAllByTestId('multiple-checkbox')[2];
    const showSelectedBtn = wrapper.getByTestId('filter-show-selected');
    const showAllBtn = wrapper.getByTestId('filter-show-all');

    act(() => {
      fireEvent.click(checkboxItemOne.querySelector('input'));
    });

    act(() => {
      fireEvent.click(checkboxItemTwo.querySelector('input'));
    });

    fireEvent.click(showSelectedBtn);

    expect(wrapper.getAllByTestId('assign-list-row')).toHaveLength(2);

    fireEvent.click(showAllBtn);

    act(() => {
      expect(props.fetchSubContractorList).toHaveBeenCalled();
    });
  });

  it('should search by name on show selected filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const searchInput = wrapper.getByTestId('search-filter');
    const checkboxItemOne = wrapper.getAllByTestId('multiple-checkbox')[0];
    const checkboxItemTwo = wrapper.getAllByTestId('multiple-checkbox')[1];
    const showSelectedBtn = wrapper.getByTestId('filter-show-selected');

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
        target: { value: 'test' },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(wrapper.getAllByTestId('assign-list-row')).toHaveLength(1);
  });

  it('should render not found', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const searchInput = wrapper.getByTestId('search-filter');
    const checkboxItemOne = wrapper.getAllByTestId('multiple-checkbox')[0];
    const checkboxItemTwo = wrapper.getAllByTestId('multiple-checkbox')[1];
    const showSelectedBtn = wrapper.getByTestId('filter-show-selected');

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

    expect(wrapper.getByTestId('not-found')).toBeTruthy();
  });

  it('should filter location', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('All Locations'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Alabama'));
    });

    expect(props.fetchSubContractorList).toHaveBeenCalled();
  });

  it('should select tax condition', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <AssignSubContractorModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');
    const assignBtnConfirm = wrapper.getByTestId('assign-btn-confirm');

    act(() => {
      fireEvent.change(input, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Next Step'));
    });

    const checkboxItem = wrapper.getAllByTestId('multiple-checkbox')[0];

    act(() => {
      fireEvent.click(checkboxItem.querySelector('input'));
    });

    const taxInput = wrapper.getAllByText('Select Option')[0];

    act(() => {
      fireEvent.mouseDown(taxInput);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Exempt'));
    });

    act(() => {
      fireEvent.click(assignBtnConfirm);
    });

    expect(props.assignSubcontractor).toHaveBeenCalledWith(getProject_1().id, [{ id: '1', role: 2, isTaxExempt: true }], getClient_1().id);
  });
});
