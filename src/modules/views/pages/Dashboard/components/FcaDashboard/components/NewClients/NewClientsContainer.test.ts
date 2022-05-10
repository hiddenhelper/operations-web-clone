import { mapDispatchToProps, mapStateToProps } from './NewClientsContainer';
import { getInitialState } from '../../../../../../../../test/rootState';
import { statisticsState } from '../../../../../../../state-mgmt/statistics';

describe('NewClientsContainer', () => {
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
      fetchClientWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchClientWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientWidget('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchClientWidgetStatisticsStart('key', {}));
  });
});
