import { mapDispatchToProps, mapStateToProps } from './WorkersActivityContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('WorkersActivityContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      linePieStatisticsMap: getInitialState().statistics.linePieStatisticsMap,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkersActivity: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersActivity start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersActivity('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectWorkersActivityStart('key', {}));
  });
});
