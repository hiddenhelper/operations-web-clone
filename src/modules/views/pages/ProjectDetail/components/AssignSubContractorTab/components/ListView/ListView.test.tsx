import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getProject_1, getClientProject_1, getClientProject_2, getDefaultLoading, getMwbeType_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import ListView, { IListViewProps } from './ListView';
import { UserModel } from '../../../../../../../models';

jest.useFakeTimers();

describe('ListView', () => {
  let props: IListViewProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      queryParams: { page: 1, limit: 15 },
      mwbeList: getMwbeType_1(),
      clientMap: {
        [getProject_1().id]: {
          [getClientProject_1().id]: getClientProject_1(),
          [getClientProject_2().id]: getClientProject_2(),
        },
      },
      userRole: UserModel.Role.FCA_ADMIN,
      drawer: { open: false, id: null },
      clientCount: 16,
      assignClientLoading: getDefaultLoading(),
      clientLoading: getDefaultLoading(),
      projectClientSummaryLoading: getDefaultLoading(),
      taxConditionLoading: getDefaultLoading(),
      setDrawer: jest.fn(),
      closeModal: jest.fn(),
      onPageChange: jest.fn(),
      fetchProjectClientList: jest.fn(),
      fetchProjectClientSummary: jest.fn(),
      updateTaxCondition: jest.fn(),
      fetchMwbe: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ListView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.clientLoading = { isLoading: true, hasError: false, error: null };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ListView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should change clients page', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ListView {...props} />
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

    expect(props.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should update tax condition', () => {
    props.clientMap = {
      [getProject_1().id]: {
        [getClientProject_1().id]: { ...getClientProject_1(), isTaxExempt: true },
        [getClientProject_2().id]: { ...getClientProject_2(), isTaxExempt: true },
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ListView {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('project-client-row')[0]);
    });

    expect(props.fetchProjectClientSummary).toHaveBeenCalled();

    act(() => {
      fireEvent.click(wrapper.getByTestId('drawerEditTaxButton'));
    });

    act(() => {
      fireEvent.mouseDown(wrapper.getByText('Not Exempt'));
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[1]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Save'));
    });

    expect(props.updateTaxCondition).toHaveBeenCalled();
  });

  it('should render client info', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ListView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
