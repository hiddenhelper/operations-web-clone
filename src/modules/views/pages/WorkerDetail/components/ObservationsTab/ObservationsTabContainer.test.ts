import { getInitialState } from '../../../../../../test/rootState';
import { mapStateToProps, mapDispatchToProps } from './ObservationsTabContainer';
import { projectState } from '../../../../../state-mgmt/project';
import { workerState } from '../../../../../state-mgmt/worker';

describe('ObservationsTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectMap: getInitialState().project.projectWorkerMap,
      workerObservationList: getInitialState().worker.workerObservationList,
      workerObservationCount: getInitialState().worker.workerObservationCount,
      observationDetail: getInitialState().worker.observation,
      detailLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkerObservations: expect.any(Function),
      fetchWorkerProjectList: expect.any(Function),
      fetchObservationDetail: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkerObservations action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.fetchWorkerObservations('id', query);
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerObservationListStart('id', query));
  });

  it('should dispatch fetchWorkerProjectList action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.fetchWorkerProjectList('id', query);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchWorkerProjectListStart('id', query));
  });

  it('should dispatch fetchObservationDetail action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchObservationDetail('id');
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerObservationStart('id'));
  });
});
