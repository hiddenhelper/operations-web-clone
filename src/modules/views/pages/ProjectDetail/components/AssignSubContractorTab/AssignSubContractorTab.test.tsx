import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getProject_1 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';

import AssignSubContractorTab, { IAssignSubContractorTabProps } from './AssignSubContractorTab';

describe('AssignSubContractorTab', () => {
  let props: IAssignSubContractorTabProps;

  beforeEach(() => {
    props = {
      currentProject: getProject_1(),
      queryParams: { page: 1, limit: 15 },
      isModalOpen: true,
      ctaDisabled: false,
      drawer: { open: false, id: null },
      setDrawer: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      onPageChange: jest.fn(),
      clearClientMap: jest.fn(),
      setQueryParams: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignSubContractorTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should open modal', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignSubContractorTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    act(() => {
      fireEvent.click(wrapper.getByTestId('opensubcontractor-modal-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should unmount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignSubContractorTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearClientMap).toMatchSnapshot();
  });

  it('should change view type', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignSubContractorTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('hierarchy-view-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('list-view-btn'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change role filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignSubContractorTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('All Roles'));
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });

  it('should change location filter', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AssignSubContractorTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[1];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    expect(props.setQueryParams).toHaveBeenCalled();
  });
});
