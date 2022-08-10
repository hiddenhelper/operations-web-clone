import { push } from 'connected-react-router';

import { workerState } from '../../../state-mgmt/worker';
import { generalState } from '../../../state-mgmt/general';
import { getInitialState } from '../../../../test/rootState';
import { mapDispatchToProps, mapStateToProps } from './WorkerDetailContainer';

describe('WorkerDetailContainer', () => {
  const dispatch = jest.fn();
  let props;

  beforeEach(() => {
    props = mapDispatchToProps(dispatch);
  });

  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      workerMap: getInitialState().worker.workerMap,
      workerLoading: undefined,
      currentUserPermissions: getInitialState().auth.session?.permissions,
    });
  });

  it('should mapDispatchToProps', () => {
    expect(props).toEqual({
      navigate: expect.any(Function),
      fetchWorker: expect.any(Function),
      clearWorkerMap: expect.any(Function),
      clearLoadingMap: expect.any(Function),
      clearWorkerActivityList: expect.any(Function),
      clearWorkerObservationList: expect.any(Function),
    });
  });

  it('should dispatch fetchWorker start action', () => {
    const id = '1';
    props.fetchWorker(id);
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerStart(id));
  });

  it('should dispatch clearWorkerMap start action', () => {
    props.clearWorkerMap();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerMap());
  });

  it('should dispatch push action', () => {
    const path = 'path';
    props.navigate(path);
    expect(dispatch).toBeCalledWith(push(path));
  });

  it('should dispatch clearLoadingMap start action', () => {
    props.clearLoadingMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearLoadingMap());
  });

  it('should dispatch clearWorkerActivityList start action', () => {
    props.clearWorkerActivityList();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerActivityList());
  });

  it('should dispatch clearWorkerObservationList start action', () => {
    props.clearWorkerObservationList();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerObservationList());
  });
});
