import { mapDispatchToProps, mapStateToProps } from './WorkersByClientContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('WorkersByClientContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      topTenStatisticsMap: getInitialState().statistics.topTenStatisticsMap,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkersByClient: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByClient('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByClientStart('key', {}));
  });
});
