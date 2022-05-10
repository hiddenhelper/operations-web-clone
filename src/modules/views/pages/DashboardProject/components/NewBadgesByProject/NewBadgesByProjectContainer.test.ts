import { mapDispatchToProps, mapStateToProps } from './NewBadgesByProjectContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('NewBadgesByProjectContainer', () => {
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
      fetchBadgeProject: expect.any(Function),
    });
  });

  it('should dispatch fetchBadgeProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgeProject('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchBadgeProjectStart('key', {}));
  });
});
