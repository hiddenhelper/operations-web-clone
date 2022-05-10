import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getBadge_1, getProject_1, getVisitorProject_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import { BadgeModel } from '../../../../../../../models';
import { BadgeStatus } from '../../../../../../../models/badge';
import { noop } from '../../../../../../../../utils/generalUtils';

import VisitorBadgeModal, { IVisitorBadgeModalProps } from './VisitorBadgeModal';

describe('VisitorBadgeModal', () => {
  let props: IVisitorBadgeModalProps;

  beforeEach(() => {
    props = {
      project: getProject_1(),
      badgeVisitor: getVisitorProject_1(),
      badgeMap: { [getVisitorProject_1().id]: getBadge_1() },
      badgeLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
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
      closeModal: jest.fn(),
      clearBadge: jest.fn(),
      fetchBadge: jest.fn(),
      revokeBadge: jest.fn(),
      printVisitorBadge: jest.fn(),
      updateBadge: jest.fn(),
      clearUpdateBadgeLoading: jest.fn(),
    };
  });

  it('should render fallback', () => {
    props.badgeMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should print', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    act(() => {
      fireEvent.click(wrapper.getByTestId('print-btn'));
    });
    expect(props.printVisitorBadge).toHaveBeenCalled();
  });

  it('should set badge id', () => {
    props.badgeVisitor = { ...getVisitorProject_1(), availability: BadgeModel.VisitorAvailability.PENDING, status: BadgeStatus.DEACTIVATE };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <VisitorBadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.change(wrapper.getByTestId('badge-tagid'), {
        persist: noop,
        target: { value: '123918723547' },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.updateBadge).toHaveBeenCalled();
  });
});
