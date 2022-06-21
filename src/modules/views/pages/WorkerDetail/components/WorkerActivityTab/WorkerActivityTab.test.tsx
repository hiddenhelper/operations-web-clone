import React from 'react';

import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import WorkerActivityTab, { IWorkerActivityTabProps } from './WorkerActivityTab';
import { getWorker_1, getWorkerProject_1, getWorkerActivity_1 } from '../../../../../../test/entities';

describe('WorkerActivityTab', () => {
  let props: IWorkerActivityTabProps;

  beforeEach(() => {
    props = {
      projectMap: { [getWorker_1().id]: { [getWorkerProject_1().id]: getWorkerProject_1() } },
      queryParams: {},
      worker: getWorker_1(),
      workerActivityList: [getWorkerActivity_1()],
      fetchWorkerActivity: jest.fn(),
      fetchWorkerProjectList: jest.fn(),
      onPageChange: jest.fn(),
      onFilterPeriodChange: jest.fn(),
      onFilterProjectChange: jest.fn(),
      workerActivityCount: 1,
    };
  });

  it.skip('should render', () => {
    const { container } = render(
      <MemoryRouter>
        <WorkerActivityTab {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render empty list', () => {
    props.workerActivityList = [];
    const { container } = render(
      <MemoryRouter>
        <WorkerActivityTab {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
