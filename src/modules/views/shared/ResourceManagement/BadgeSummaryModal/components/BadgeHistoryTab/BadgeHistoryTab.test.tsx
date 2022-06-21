import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getBadge_1, getBadgeHistory_1 } from '../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../test/rootState';

import BadgeModal, { IBadgeHistoryTabProps } from './BadgeHistoryTab';

describe('BadgeHistoryTab', () => {
  global.console.warn = () => {
    /** */
  };
  let props: IBadgeHistoryTabProps;

  beforeEach(() => {
    props = {
      badgeId: getBadge_1().id,
      historyList: [getBadgeHistory_1()],
      count: 1,
      loading: undefined,
      fetchBadgeHistory: jest.fn(),
      clearBadgeHistory: jest.fn(),
    };
  });

  it('should loading', () => {
    props.loading = {
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

  it.skip('should render', () => {
    props.loading = { isLoading: false, error: null, hasError: false };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should change page', () => {
    props.loading = { isLoading: false, error: null, hasError: false };
    props.count = 17;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    expect(props.fetchBadgeHistory).toHaveBeenCalledWith(getBadge_1().id, { limit: 15, page: 2 });
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearBadgeHistory).toHaveBeenCalled();
  });

  it('should render empty', () => {
    props.loading = { isLoading: false, error: null, hasError: false };
    props.historyList = [];
    props.count = 0;
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgeModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
