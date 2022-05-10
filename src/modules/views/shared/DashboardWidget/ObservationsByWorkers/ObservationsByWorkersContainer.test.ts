import { mapDispatchToProps, mapStateToProps } from './ObservationsByWorkersContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('NewBadgesByLocationContainer', () => {
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
      fetchWorkersObservations: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersObservations start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersObservations('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersObservationsStart('key', {}));
  });
});
