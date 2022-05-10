import { mapDispatchToProps, mapStateToProps } from './ProjectsRevenueContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('ProjectsRevenueContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      grossRevenueWidgetStatistics: getInitialState().statistics.grossRevenueWidgetStatistics,
      grossRevenueWidgetLoading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchGrossRevenueWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchGrossRevenueWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchGrossRevenueWidget({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchGrossRevenueWidgetStatisticsStart({}));
  });
});
