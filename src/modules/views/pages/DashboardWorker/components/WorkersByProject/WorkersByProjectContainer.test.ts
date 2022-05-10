import { mapDispatchToProps, mapStateToProps } from './WorkersByProjectContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('WorkersByProjectContainer', () => {
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
      fetchWorkersByProject: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByProject('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByProjectStart('key', {}));
  });
});
