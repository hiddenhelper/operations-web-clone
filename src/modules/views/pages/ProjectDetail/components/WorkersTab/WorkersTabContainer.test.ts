import { mapDispatchToProps, mapStateToProps } from './WorkersTabContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { workerState } from '../../../../../state-mgmt/worker';
import { projectState } from '../../../../../state-mgmt/project';
import { getProject_1 } from '../../../../../../test/entities';
import { clientState } from '../../../../../state-mgmt/client';

describe('WorkersTabContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      workerMap: getInitialState().worker.workerMap,
      workerProjectMap: getInitialState().worker.workerProjectMap,
      clientMap: getInitialState().client.clientProjectMap,
      workerCount: getInitialState().worker.count,
      modalCount: getInitialState().general.modalCount,
      modalMap: getInitialState().general.modalMap,
      projectWorkersLoading: undefined,
      loadWorkerModalLoading: undefined,
      assignLoading: undefined,
      summaryLoading: undefined,
      countryList: getInitialState().general.countryList,
      assignWorkerProjectError: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProjectWorkerList: expect.any(Function),
      fetchWorkerList: expect.any(Function),
      fetchWorkerSummary: expect.any(Function),
      assignWorker: expect.any(Function),
      fetchProjectClientList: expect.any(Function),
      clearWorkerMap: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectWorkerListStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectWorkerList(getProject_1().id, {});
    expect(dispatch).toBeCalledWith(workerState.actions.fetchProjectWorkerListStart(getProject_1().id, {}));
  });

  it('should dispatch fetchWorkerList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerList({});
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerProjectAssignListStart({}));
  });

  it('should dispatch fetchWorkerSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerSummary('id');
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerStart('id'));
  });

  it('should dispatch assignWorker start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.assignWorker('id', []);
    expect(dispatch).toBeCalledWith(projectState.actions.assignWorkerProjectStart('id', []));
  });

  it('should dispatch clearWorkerMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearWorkerMap();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerMap());
  });

  it('should dispatch fetchProjectClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectClientList('id', {});
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientListStart('id', {}));
  });
});
