import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router';

import WorkerResult from './WorkerResult';
import { SearchModel } from 'modules/models';

describe('WorkerResult', () => {
  let props: { onClick: () => void; worker: SearchModel.IWorker };

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      worker: {
        id: '3',
        name: 'Worker Name',
        status: undefined,
        entityType: SearchModel.SearchType.Worker,
        invitationStatus: 1,
      },
    };
  });

  it('should render', () => {
    const { getByText } = render(
      <MemoryRouter>
        <WorkerResult {...props} />
      </MemoryRouter>
    );
    getByText(props.worker.name);
  });

  it('should render company name', () => {
    props.worker.company = {
      id: 'someTestId',
      name: 'Some random string',
    };
    const { getByText } = render(
      <MemoryRouter>
        <WorkerResult {...props} />
      </MemoryRouter>
    );
    getByText(props.worker.name);
    getByText(props.worker.company.name);
  });

  it('should redirect to worker detail page con click', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <WorkerResult {...props} />
      </Router>
    );

    await act(async () => {
      await fireEvent.click(getByText(props.worker.name));
    });

    expect(history.location.pathname).toBe(`/workers/detail/${props.worker.id}`);
  });
});
