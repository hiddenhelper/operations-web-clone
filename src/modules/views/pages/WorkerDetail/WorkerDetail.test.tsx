import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';

import { getInitialState } from '../../../../test/rootState';
import { getWorker_1, getWorker_2, getWorkerProject_1 } from '../../../../test/entities';
import WorkerDetail, { IWorkerDetailProps } from './WorkerDetail';
import { GENERAL } from '../../../../constants';
import { UserModel } from '../../../models';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe.skip('WorkerDetail', () => {
  let props: IWorkerDetailProps;
  const WorkerDetailComponent = ({ store = getInitialState(), currentProps }) => (
    <Provider store={createMockStore(store)}>
      <MemoryRouter>
        <WorkerDetail {...currentProps} />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    props = {
      currentUserPermissions: [],
      workerMap: { [getWorker_1().id]: getWorker_1(), [getWorker_2().id]: getWorker_2() },
      workerLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorker: jest.fn(),
      clearWorkerMap: jest.fn(),
      clearLoadingMap: jest.fn(),
      clearWorkerActivityList: jest.fn(),
      clearWorkerObservationList: jest.fn(),
      navigate: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: '' }));
  });

  it('should fetchWorker', () => {
    props.workerMap = {};
    render(<WorkerDetailComponent currentProps={props} />);
    expect(props.fetchWorker).toHaveBeenCalledWith(getWorker_1().id);
  });

  it('should render projects tab', () => {
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render projects tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'projects' }));
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  // it('should render project list', () => {
  //   (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'projects' }));
  //   const { container, getByTestId } = render(
  //     <WorkerDetailComponent
  //       currentProps={props}
  //       store={{
  //         ...getInitialState(),
  //         project: { ...getInitialState().project, projectWorkerMap: { [getWorker_1().id]: { [getWorkerProject_1().id]: getWorkerProject_1() } } },
  //         general: {
  //           ...getInitialState().general,
  //           loadingMap: {
  //             ...getInitialState().general.loadingMap,
  //             [GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT]: { isLoading: false, hasError: false, error: null },
  //           },
  //         },
  //       }}
  //     />
  //   );

  //   const projectRow = getByTestId('project-list-row-open-button');

  //   act(() => {
  //     fireEvent.click(projectRow);
  //   });

  //   expect(container).toMatchSnapshot();
  // });

  it('should render empty project list', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'projects' }));
    const { container } = render(
      <Provider
        store={createMockStore({
          ...getInitialState(),
          project: { ...getInitialState().project, projectWorkerMap: {} },
          general: {
            ...getInitialState().general,
            loadingMap: { ...getInitialState().general.loadingMap, [GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT]: { isLoading: false } },
          },
        })}
      >
        <MemoryRouter>
          <WorkerDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render activity tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'activity' }));
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it.skip('should render certifications tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'certifications' }));
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it.skip('should render trainings tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'trainings' }));
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it.skip('should render observations tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'observations' }));
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it.skip('should render with id null', () => {
    (useParams as any).mockImplementation(() => ({ id: null, step: '' }));
    props.workerLoading = { isLoading: true, hasError: false, error: null };
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it.skip('should render information tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id, step: 'information' }));
    const { container } = render(<WorkerDetailComponent currentProps={props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render migrated worker banner an navigate to complete info on click', () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_2().id, step: 'information' }));
    const { getByTestId, getByText } = render(<WorkerDetailComponent currentProps={props} />);
    getByTestId('migrated-worker-banner');
    getByText('This is a migrated worker');
    fireEvent.click(getByText('Review Worker Information'));
    expect(props.navigate).toHaveBeenCalledWith(`/workers/wizard/${getWorker_2().id}`);
  });
});
