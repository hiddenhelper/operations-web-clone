import { getInitialState } from '../../../../test/rootState';
import { mapDispatchToProps, mapStateToProps } from './InventoryListContainer';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('InventoryListContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      inventoryStatistics: getInitialState().statistics.inventoryStatistics,
      statisticsLoading: undefined,
    });
  });

  it('should dispatch fetchInventoryStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInventoryStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchInventoryStatisticsStart());
  });

  it('should dispatch clearWorkerStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearInventoryStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearInventoryStatistics());
  });
});
