import React from 'react';

import { MemoryRouter } from 'react-router';
import { render, act, fireEvent } from '@testing-library/react';

import ObservationsTab, { IObservationsTabProps } from './ObservationsTab';
import { getWorker_1, getWorkerProject_1, getWorkerObservation_1, getDefaultLoading } from '../../../../../../test/entities';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../test/rootState';
import { Provider } from 'react-redux';

describe.skip('ObservationsTab', () => {
  let props: IObservationsTabProps;

  beforeEach(() => {
    props = {
      projectMap: { [getWorker_1().id]: { [getWorkerProject_1().id]: getWorkerProject_1() } },
      queryParams: {},
      observationDetail: getWorkerObservation_1(),
      worker: getWorker_1(),
      detailLoading: getDefaultLoading(),
      workerObservationList: [getWorkerObservation_1()],
      workerObservationCount: 1,
      fetchWorkerObservations: jest.fn(),
      fetchWorkerProjectList: jest.fn(),
      onPageChange: jest.fn(),
      onFilterPeriodChange: jest.fn(),
      onFilterProjectChange: jest.fn(),
      fetchObservationDetail: jest.fn(),
    };
  });

  it.skip('should render', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <ObservationsTab {...props} />
        </Provider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render empty list', () => {
    props.workerObservationList = [];
    const { container } = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <ObservationsTab {...props} />
        </Provider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should open modal', () => {
    const wrapper = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <ObservationsTab {...props} />
        </Provider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('observation-row-type'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('detail-modal-close-btn'));
    });

    expect(props.fetchObservationDetail).toHaveBeenCalled();
  });

  it.skip('should show detail loading', () => {
    props.detailLoading = { ...getDefaultLoading(), isLoading: true };
    const wrapper = render(
      <MemoryRouter>
        <Provider store={createMockStore(getInitialState()) as any}>
          <ObservationsTab {...props} />
        </Provider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('observation-row-type'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
