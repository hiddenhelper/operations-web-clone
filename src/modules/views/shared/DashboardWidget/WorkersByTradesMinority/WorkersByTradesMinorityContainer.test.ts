import { mapDispatchToProps, mapStateToProps } from './WorkersByTradesMinorityContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('WorkersByTradesMinorityContainer', () => {
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
      fetchWorkersByTradesMinority: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByTradesMinority start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByTradesMinority('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByTradesMinorityStart('key', {}));
  });
});
