import { push } from 'connected-react-router';
import { mapDispatchToProps, mapStateToProps } from './WorkerListContainer';
import { getInitialState } from '../../../../test/rootState';
import { workerState } from '../../../state-mgmt/worker';
import { statisticsState } from '../../../state-mgmt/statistics';
import { clientState } from '../../../state-mgmt/client';

describe('WorkerListContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      workerMap: getInitialState().worker.workerMap,
      workersCount: getInitialState().worker.count,
      workerStatistics: getInitialState().statistics.workerStatistics,
      uiRelationMap: getInitialState().general.uiRelationMap,
      listLoading: undefined,
      clientSearchLoading: undefined,
      statisticsLoading: undefined,
      workerLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkerList: expect.any(Function),
      fetchWorkerStatistics: expect.any(Function),
      fetchWorkerSummary: expect.any(Function),
      clearWorkerMap: expect.any(Function),
      clearWorkerStatistics: expect.any(Function),
      searchCompanies: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });

  it('should dispatch fetchWorkerStart action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerSummary('1');
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerStart('1'));
  });

  it('should dispatch fetchWorkerList action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerList({});
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerListStart({}));
  });

  it('should dispatch fetchWorkerStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkerStatisticsStart());
  });

  it('should dispatch clearWorkerMap action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearWorkerMap();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerMap());
  });

  it('should dispatch clearWorkerStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearWorkerStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearWorkerStatistics());
  });

  it('should dispatch searchCompanies action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.searchCompanies({});
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart({}, 'clientWorker'));
  });
});
