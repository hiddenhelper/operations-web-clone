import { mapDispatchToProps, mapStateToProps } from './TrainingsContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('TrainingsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      pieStatisticsMap: getInitialState().statistics.pieStatisticsMap,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkersTrainings: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersTrainings start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersTrainings('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersTrainingsStart('key', {}));
  });
});
