import { mapDispatchToProps, mapStateToProps } from './ClientsByTradesContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('ClientsByTradesContainer', () => {
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
      fetchClientsByTrades: expect.any(Function),
    });
  });

  it('should dispatch fetchClientsByTrades start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientsByTrades('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchClientsByTradesStart('key', {}));
  });
});
