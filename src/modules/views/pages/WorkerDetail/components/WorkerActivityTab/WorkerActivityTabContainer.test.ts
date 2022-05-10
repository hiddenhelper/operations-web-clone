import { getInitialState } from '../../../../../../test/rootState';
import { mapStateToProps, mapDispatchToProps } from './WorkerActivityTabContainer';

describe('WorkerActivityTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectMap: getInitialState().project.projectWorkerMap,
      workerActivityList: getInitialState().worker.workerActivityList,
      workerActivityCount: getInitialState().worker.workerActivityCount,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkerActivity: expect.any(Function),
      fetchWorkerProjectList: expect.any(Function),
    });
  });
});
