import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';

import {
  getProject_1,
  getVisitorProject_1,
  getVisitorProject_2,
  getVisitorProject_3,
  getVisitorProject_4,
  getVisitorProject_6,
} from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import VisitorsTab, { IVisitorsTabProps } from './VisitorsTab';

describe('VisitorsTab', () => {
  let props: IVisitorsTabProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      isFcAdmin: true,
      queryParams: {} as any,
      currentProject: getProject_1(),
      visitorCount: 1,
      visitorMap: {
        [getProject_1().id]: {
          [getVisitorProject_1().id]: getVisitorProject_1(),
          [getVisitorProject_3().id]: getVisitorProject_3(),
          [getVisitorProject_4().id]: getVisitorProject_4(),
          [getVisitorProject_6().id]: getVisitorProject_6(),
        },
      },
      ctaDisabled: false,
      drawer: { open: false, id: null },
      projectListElement: null,
      projectBadgeVisitorLoading: undefined,
      saveBadgeVisitorLoading: {
        isLoading: true,
        hasError: false,
        error: null,
      },
      updateBadgeDataLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      badgeVisitorEntityLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      updateLoading: undefined,
      setDrawer: jest.fn(),
      onPageChange: jest.fn(),
      unassignBadgeVisitor: jest.fn(),
      saveBadgeVisitor: jest.fn(),
      clearProjectMap: jest.fn(),
      fetchProjectBadgeVisitorList: jest.fn(),
      fetchBadgeVisitorEntityList: jest.fn(),
      clearSaveBadgeLoading: jest.fn(),
      setQueryParams: jest.fn(),
    };
  });

  it('should render empty', () => {
    props.visitorMap = {};
    props.projectBadgeVisitorLoading = {
      isLoading: false,
      hasError: false,
      error: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.projectBadgeVisitorLoading = {
      isLoading: true,
      hasError: false,
      error: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render', () => {
    props.updateLoading = {
      isLoading: false,
      hasError: false,
      error: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetchBadgeVisitorEntityList', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchBadgeVisitorEntityList).toHaveBeenCalled();
  });

  it('should hide create badges when not FcAdmin', () => {
    props.isFcAdmin = false;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should create badge visitors', () => {
    props.saveBadgeVisitorLoading = undefined;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('open-create-badge-modal-btn'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-number'), {
        persist: () => {
          /* istanbul ignore next */
        },
        target: { value: 10 },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.saveBadgeVisitor).toHaveBeenCalledWith(getProject_1().id, 10);

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-close-btn'));
    });
  });

  it('should open visitor badge modal', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('open-visitor-badge-modal')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-close'));
    });
  });

  it('should open assign visitor badge modal', () => {
    (props.visitorMap = { [getProject_1().id]: { [getVisitorProject_2().id]: getVisitorProject_2() } }),
      (props.drawer = { open: true, id: getVisitorProject_2().id });
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('open-visitor-badge-modal'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('assign-badgevisitor-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('form-dialog-close')[1]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should unassign', () => {
    props.drawer = { open: true, id: getVisitorProject_1().id };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('visitor-list-row')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('unassign-badgevisitor-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.unassignBadgeVisitor).toHaveBeenCalled();
  });

  it('should fetchProjectBadgeVisitorList', () => {
    props.updateBadgeDataLoading = { open: true, id: getVisitorProject_1().id };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('visitor-list-row')[0]);
    });

    expect(props.fetchProjectBadgeVisitorList).toHaveBeenCalled();
  });

  it('should avoid assign when Synchronizing', () => {
    props.drawer = { open: true, id: getVisitorProject_6().id };
    const { container, getByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(getByTestId('assign-badgevisitor-btn').classList).toContain('Mui-disabled');
    expect(container).toMatchSnapshot();
  });

  it('should save', () => {
    props.saveBadgeVisitorLoading = { isLoading: false, hasError: false, error: null };
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.clearSaveBadgeLoading).toHaveBeenCalled();
    expect(props.fetchProjectBadgeVisitorList).toHaveBeenCalled();
  });

  it('should change entity filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('All Entities'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Client'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.setDrawer).toHaveBeenCalled();
  });
});
