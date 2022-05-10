import { mapDispatchToProps, mapStateToProps } from './NewBadgesByLocationContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

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
      fetchBadgeLocation: expect.any(Function),
    });
  });

  it('should dispatch fetchBadgeLocation start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgeLocation('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchBadgeLocationStart('key', {}));
  });
});
