import { mapDispatchToProps, mapStateToProps } from './WorkersByTradesNonMinorityContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('WorkersByTradesNonMinorityContainer', () => {
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
      fetchWorkersByTradesNonMinority: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByTradesNonMinority start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByTradesNonMinority('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByTradesNonMinorityStart('key', {}));
  });
});
