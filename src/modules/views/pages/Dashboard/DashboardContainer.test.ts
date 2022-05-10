import { mapDispatchToProps, mapStateToProps } from './DashboardContainer';
import { getInitialState } from '../../../../test/rootState';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('DashboardContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      newBadges: getInitialState().statistics.newBadges,
      grossRevenue: getInitialState().statistics.grossRevenue,
      workersActivity: getInitialState().statistics.workersActivity,
      newBadgesLoading: undefined,
      grossRevenueLoading: undefined,
      workersActivityLoading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchNewBadges: expect.any(Function),
      fetchWorkersActivity: expect.any(Function),
      fetchGrossRevenue: expect.any(Function),
      clearStatistics: expect.any(Function),
    });
  });

  it('should dispatch fetchNewBadges start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchNewBadges();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchNewBadgesStart());
  });

  it('should dispatch fetchWorkersActivity start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersActivity();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersActivityStart());
  });

  it('should dispatch fetchGrossRevenue start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchGrossRevenue();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchGrossRevenueStart());
  });

  it('should dispatch fetchClientStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearStatistics());
  });
});
