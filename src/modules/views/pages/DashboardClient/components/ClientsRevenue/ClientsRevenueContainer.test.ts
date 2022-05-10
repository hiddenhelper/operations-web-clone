import { mapDispatchToProps, mapStateToProps } from './ClientsRevenueContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('ClientsRevenueContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      grossRevenueWidgetStatistics: getInitialState().statistics.grossRevenueWidgetStatistics,
      grossRevenueWidgetLoading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchClientRevenueWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchClientRevenueWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientRevenueWidget({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchClientRevenueWidgetStatisticsStart({}));
  });
});
