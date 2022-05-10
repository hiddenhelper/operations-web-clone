import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { render, fireEvent, act } from '@testing-library/react';

import { UserModel } from '../../../../../../../models';
import {
  getProject_1,
  getClientProjectHirearchy_1,
  getClientProjectHirearchy_2,
  getClientProjectHirearchy_3,
  getClientProjectHirearchy_4,
} from '../../../../../../../../test/entities';
import { getInitialState, getAdminInitialState } from '../../../../../../../../test/rootState';
import HirearchyView, { IHirearchyViewProps } from './HirearchyView';

describe('HirearchyView', () => {
  let props: IHirearchyViewProps;

  beforeEach(() => {
    props = {
      projectId: getProject_1().id,
      hirearchyMap: {
        [getClientProjectHirearchy_1().id]: getClientProjectHirearchy_1(),
        [getClientProjectHirearchy_2().id]: getClientProjectHirearchy_2(),
        [getClientProjectHirearchy_3().id]: getClientProjectHirearchy_3(),
        [getClientProjectHirearchy_4().id]: getClientProjectHirearchy_4(),
      },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      assignClientLoading: undefined,
      fetchProjectClientHirearchyList: jest.fn(),
      closeModal: jest.fn(),
    };
  });

  it('should fetchProjectClientHirearchyList', () => {
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <HirearchyView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectClientHirearchyList).toHaveBeenCalledWith(props.projectId);
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <HirearchyView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <HirearchyView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should close modal', () => {
    props.assignClientLoading = { isLoading: false, hasError: false, error: null };
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <HirearchyView {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.closeModal).toHaveBeenCalled();
    expect(props.fetchProjectClientHirearchyList).toHaveBeenCalled();
  });

  it('should render children nodes', () => {
    const { container, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <HirearchyView {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(getAllByTestId('open-hirearchy-child-list')[0]);
    });

    expect(container).toMatchSnapshot();
  });
});
