import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getBadge_1, getBadge_3 } from '../../../../../test/entities';
import { getInitialState } from '../../../../../test/rootState';

import { BadgeModel } from '../../../../models';
import { noop } from '../../../../../utils/generalUtils';

import BadgeModal, { IBadgeSummaryModalProps } from './BadgeSummaryModal';

describe.skip('BadgeSummaryModal', () => {
  let props: IBadgeSummaryModalProps;

  beforeEach(() => {
    props = {
      title: 'title',
      currentBadge: getBadge_1(),
      modal: {
        open: false,
        status: 0,
        callback: null,
      },
      badgeModalContent: {},
      badgeStatusOptionList: [
        { key: BadgeModel.BadgeStatus.ACTIVE, title: 'Active', callback: jest.fn() },
        { key: BadgeModel.BadgeStatus.DEACTIVATE, title: 'Deactivate', callback: jest.fn() },
      ],
      isDeactivated: false,
      isBadgePending: false,
      showBadgeType: true,
      badgeLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      printLoading: undefined,
      isVisitor: false,
      updateLoading: undefined,
      updateBadgeDataLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      clearUpdateLoading: jest.fn(),
      clearUpdateBadgeLoading: jest.fn(),
      closeModal: jest.fn(),
      clearBadge: jest.fn(),
      onModalClose: jest.fn(),
      onModalConfirm: jest.fn(),
      updateBadge: jest.fn(),
      onResetModal: jest.fn(),
      onPrint: jest.fn(),
    };
  });

  it('should loading', () => {
    props.badgeLoading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading error', () => {
    props.updateLoading = {
      isLoading: true,
      hasError: true,
      error: { errors: { tagId: ['In use'] } },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should print loading', () => {
    props.printLoading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render badge tab', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render secondary values', () => {
    props.currentBadge = getBadge_3();
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render expired', () => {
    props.currentBadge = { ...getBadge_1(), status: BadgeModel.BadgeStatus.EXPIRED };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render history tab', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const historyTab = wrapper.getAllByTestId('badge-modal-tab-opt')[1];

    act(() => {
      fireEvent.click(historyTab);
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should activate', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('controlled-radio-button')[1]);
    });

    const exiprationDateInput = wrapper.getByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(exiprationDateInput.querySelector('input'), {
        persist: noop,
        target: { name: 'expirationDate', value: 'Tue, Aug 11, 2020' },
      });
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal', () => {
    props.modal = { open: true, id: '' };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('popover-button'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('modal-close-btn'));
    });

    expect(props.onModalClose).toHaveBeenCalled();
  });

  it('should confirm', () => {
    props.modal = { open: true, status: BadgeModel.BadgeStatus.DEACTIVATE, id: '' };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

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

    expect(props.onModalConfirm).toHaveBeenCalledWith('reason', expect.any(Object));
  });

  it('should close on confirm', () => {
    props.updateLoading = {
      isLoading: false,
      hasError: false,
      error: undefined,
    };
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.clearUpdateLoading).toHaveBeenCalledWith();
    expect(props.clearBadge).toHaveBeenCalledWith();
  });

  it('should submit', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('controlled-radio-button')[1]);
    });

    const exiprationDateInput = wrapper.getByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(exiprationDateInput.querySelector('input'), { persist: () => {}, target: { name: 'expirationDate', value: 'Tue, Aug 11, 2020' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.updateBadge).toHaveBeenCalled();
  });

  it('should discard', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('controlled-radio-button')[1]);
    });

    const exiprationDateInput = wrapper.getByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(exiprationDateInput.querySelector('input'), { persist: () => {}, target: { name: 'expirationDate', value: 'Tue, Aug 11, 2020' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-discard'));
    });
  });

  it('should show date validation', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('controlled-radio-button')[1]);
    });

    const exiprationDateInput = wrapper.getByTestId('keyboard-date-picker');

    act(() => {
      fireEvent.change(exiprationDateInput.querySelector('input'), { persist: () => {}, target: { name: 'expirationDate', value: '' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(wrapper.getByText('Please enter Expiration Date')).toBeTruthy();
    expect(props.updateBadge).not.toHaveBeenCalled();
  });

  it('should load with changes after action', () => {
    props.currentBadgeForm = {
      hasChanges: true,
      expirationDate: 'Tue, Aug 11, 2020',
      badgeType: 0,
      hasExpiration: 1,
    };

    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should disable action when Synchronizing', () => {
    props.currentBadge = { ...getBadge_1(), isSynchronizing: true };

    const { container, getByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(getByTestId('popover-button').classList).toContain('Mui-disabled');
    expect(container).toMatchSnapshot();
  });
});
