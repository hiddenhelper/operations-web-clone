import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';

import { getVisitorProject_1, getVisitorProject_4, getVisitorProject_5, getProjectCompany_1, getVisitorProject_3 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import AssignVisitorBadgeModal, { IAssignVisitorBadgeModal } from './AssignVisitorBadgeModal';

jest.useFakeTimers();

describe('AssignVisitorBadgeModal', () => {
  global.console.warn = () => {
    /** */
  };
  let props: IAssignVisitorBadgeModal;

  beforeEach(() => {
    props = {
      badgeVisitor: getVisitorProject_1(),
      entityList: [],
      uiRelationMap: {},
      clientListLoading: undefined,
      updateLoading: undefined,
      searchCompanies: jest.fn(),
      assignBadgeVisitor: jest.fn(),
      closeModal: jest.fn(),
      clearErrors: jest.fn(),
    };
  });

  it('should render', () => {
    props.clientListLoading = {
      isLoading: false,
      hasError: false,
      error: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render secondary values', () => {
    props.badgeVisitor = getVisitorProject_4();
    props.entityList = ['entity 1', 'entity 2'];
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.updateLoading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should close', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('Close'));
    });

    expect(props.closeModal).toHaveBeenCalled();
    expect(props.clearErrors).toHaveBeenCalled();
  });

  it('should assign', () => {
    props.uiRelationMap = {
      'project-badge-company-id': {
        searchResult: [getProjectCompany_1()],
      },
    };

    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');
    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(input, { target: { value: 'comp' } });
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
      fireEvent.mouseDown(wrapper.getByText('Regular'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('VIP'));
    });

    act(() => {
      fireEvent.change(dateInputs[0].querySelector('input'), { target: { name: 'validTo', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[1].querySelector('input'), { target: { name: 'validFrom', value: 'Tue, Aug 11, 2020' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.assignBadgeVisitor).toHaveBeenCalled();
  });

  it('should assign secondary values', () => {
    props.badgeVisitor = getVisitorProject_3();
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(dateInputs[0].querySelector('input'), { target: { name: 'validTo', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[1].querySelector('input'), { target: { name: 'validFrom', value: 'Tue, Aug 11, 2020' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.assignBadgeVisitor).toHaveBeenCalled();
  });

  it('should assign other', () => {
    props.entityList = ['entity 1', 'entity 2'];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.mouseDown(wrapper.getByText('Client'));
    });

    act(() => {
      fireEvent.click(wrapper.getAllByText('Other')[0]);
    });

    const input = wrapper.getByTestId('search-autocomplete').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'entity new no exist' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    expect(wrapper.getByText('Add entity new no exist')).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.getByText('Add entity new no exist'));
    });

    act(() => {
      fireEvent.change(dateInputs[0].querySelector('input'), { target: { name: 'validTo', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[1].querySelector('input'), { target: { name: 'validFrom', value: 'Tue, Aug 11, 2020' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.assignBadgeVisitor).toHaveBeenCalled();
  });

  it('should show validations', () => {
    props.uiRelationMap = {
      'project-badge-company-id': {
        searchResult: [{ ...getProjectCompany_1(), id: null }],
      },
    };
    props.badgeVisitor = getVisitorProject_5();
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'comp' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.blur(input);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.assignBadgeVisitor).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseDown(wrapper.getByText('Client'));
    });

    act(() => {
      fireEvent.click(wrapper.getAllByText('Other')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    act(() => {
      fireEvent.mouseDown(wrapper.getAllByText('Other')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByText('Client')[0]);
    });

    expect(props.assignBadgeVisitor).not.toHaveBeenCalled();
  });

  it('should discard', () => {
    props.uiRelationMap = {
      'project-badge-company-id': {
        searchResult: [{ ...getProjectCompany_1(), id: null }],
      },
    };
    props.badgeVisitor = getVisitorProject_5();
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignVisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(dateInputs[0].querySelector('input'), { target: { name: 'validTo', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[1].querySelector('input'), { target: { name: 'validFrom', value: 'Tue, Aug 11, 2020' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    const discardBtn = wrapper.getByTestId('form-dialog-discard');

    act(() => {
      fireEvent.click(discardBtn);
    });

    expect(props.clearErrors).toHaveBeenCalled();
  });
});
