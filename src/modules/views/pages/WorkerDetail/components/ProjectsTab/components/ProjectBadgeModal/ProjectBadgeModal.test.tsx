import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { BadgeModel, UserModel } from '../../../../../../../models';
import { getWorkerProject_1, getBadge_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import ProjectBadgeModal, { IProjectBadgeSummaryModalProps } from './ProjectBadgeModal';
import { noop } from '../../../../../../../../utils/generalUtils';
import { IPermission } from 'modules/models/user';

describe.skip('ProjectBadgeModal', () => {
  let props: IProjectBadgeSummaryModalProps;

  beforeEach(() => {
    props = {
      currentUserPermissions: [
        (UserModel.BadgesPermission.ACTIVATE as unknown) as IPermission,
        (UserModel.BadgesPermission.DEACTIVATE as unknown) as IPermission,
        (UserModel.BadgesPermission.REVOKE as unknown) as IPermission,
        (UserModel.BadgesPermission.VIEWACCESS as unknown) as IPermission,
      ],
      badgeMap: { [getWorkerProject_1().badgeId]: getBadge_1() },
      projectWorker: getWorkerProject_1(),
      badgeLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      printLoading: undefined,
      updateLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      updateBadgeDataLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      clearUpdateLoading: jest.fn(),
      clearUpdateBadgeLoading: jest.fn(),
      closeModal: jest.fn(),
      clearBadge: jest.fn(),
      fetchBadge: jest.fn(),
      printWorkerBadge: jest.fn(),
      activateBadge: jest.fn(),
      deactivateBadge: jest.fn(),
      revokeBadge: jest.fn(),
      updateBadge: jest.fn(),
    };
  });

  it('should render fallback', () => {
    props.badgeMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should activate', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Activate'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-tagid'), {
        persist: noop,
        target: { value: '123918723456' },
      });
    });

    expect(wrapper.getByText('Activate Badge?')).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.activateBadge).toHaveBeenCalled();
  });

  it('should validate tagId', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Activate'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-tagid'), {
        persist: noop,
        target: { value: '' },
      });
    });

    expect(wrapper.getByText('Activate Badge?')).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(wrapper.getByText('Please enter Tag Id.')).toBeTruthy();
    expect(props.activateBadge).not.toHaveBeenCalled();

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-tagid'), {
        persist: noop,
        target: { value: '123' },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(wrapper.getByText('Please enter a valid Tag Id.')).toBeTruthy();
  });

  it('should deactivate', () => {
    props.projectWorker = { ...getWorkerProject_1(), badgeStatus: BadgeModel.BadgeStatus.ACTIVE };

    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Deactivate'));
    });

    expect(wrapper.getByText('Deactivate Badge?')).toBeTruthy();

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-reason'), {
        persist: () => {
          /* tslint:disable:no-empty */
        },
        target: { value: 'reason' },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.deactivateBadge).toHaveBeenCalledWith(getBadge_1().id, 'reason');
  });

  it('should prevent deactivate', () => {
    props.projectWorker = { ...getWorkerProject_1(), badgeStatus: BadgeModel.BadgeStatus.REVOKED };

    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    expect(wrapper.queryByText('Deactivate')).toBeNull();
  });

  it('should revoke', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Revoke'));
    });

    expect(wrapper.getByText('Revoke Badge?')).toBeTruthy();

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-reason'), {
        persist: () => {
          /* tslint:disable:no-empty */
        },
        target: { value: 'reason' },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
    });

    expect(props.revokeBadge).toHaveBeenCalledWith(getBadge_1().id, 'reason');
  });

  it('should prevent reactivate', () => {
    props.isFcaUser = false;
    props.projectWorker = { ...getWorkerProject_1(), badgeStatus: BadgeModel.BadgeStatus.REVOKED };

    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    expect(wrapper.queryByText('Activate')).toBeNull();
  });

  it('should print', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('print-btn'));
    });

    expect(props.printWorkerBadge).toHaveBeenCalledWith(getWorkerProject_1().badgeId);
  });
});
