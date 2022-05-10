import { mapDispatchToProps, mapStateToProps } from './NewWorkersContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('NewWorkersContainer', () => {
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
      fetchWorkersNewWorkers: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersNewWorkers start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersNewWorkers('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersNewWorkersStart('key', {}));
  });
});
