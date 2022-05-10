import { mapDispatchToProps, mapStateToProps } from './WorkersByJobDataContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('WorkersByJobDataContainer', () => {
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
      fetchWorkersByJobDataStart: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByJobDataStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByJobDataStart('key', {}, 0);
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByJobDataStart('key', {}, 0));
  });
});
