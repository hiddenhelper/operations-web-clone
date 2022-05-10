import { mapDispatchToProps, mapStateToProps } from './NewAssignedWorkersContainer';
import { getInitialState } from '../../../../../../../../test/rootState';
import { statisticsState } from '../../../../../../../state-mgmt/statistics';

describe('NewAssignedWorkersContainer', () => {
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
      fetchWorkersWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersWidget('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchNewAssignedWorkersWidgetStatisticsStart('key', {}));
  });
});
