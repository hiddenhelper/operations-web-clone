import { mapStateToProps, mapDispatchToProps } from './WorkersTabContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { workerState } from '../../../../../state-mgmt/worker';
import { projectState } from '../../../../../state-mgmt/project';
import { generalState } from '../../../../../state-mgmt/general';

describe('WorkersTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      workerMap: getInitialState().worker.workerMap,
      workerClientMap: getInitialState().worker.workerClientMap,
      workerCount: getInitialState().worker.count,
      uiRelationMap: getInitialState().general.uiRelationMap,
      loading: undefined,
      loadingSummary: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkerList: expect.any(Function),
      fetchWorkerSummary: expect.any(Function),
      searchProjectStart: expect.any(Function),
      clearWorkerMap: expect.any(Function),
      clearRelationMap: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkerList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerList('id', {});
    expect(dispatch).toBeCalledWith(workerState.actions.fetchClientWorkerListStart('id', {}));
  });

  it('should dispatch fetchWorker start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerSummary('id');
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerStart('id'));
  });

  it('should dispatch searchProjectStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.searchProjectStart({}, 'key');
    expect(dispatch).toBeCalledWith(projectState.actions.searchProjectStart({}, 'key'));
  });

  it('should dispatch clearWorkerMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearWorkerMap();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerMap());
  });

  it('should dispatch clearRelationMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearRelationMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearRelationMap());
  });
});
