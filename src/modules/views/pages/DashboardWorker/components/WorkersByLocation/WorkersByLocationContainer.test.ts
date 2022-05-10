import { mapDispatchToProps, mapStateToProps } from './WorkersByLocationContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('WorkersByLocationContainer', () => {
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
      fetchWorkersByLocation: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByLocation start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByLocation('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByLocationStart('key', {}));
  });
});
