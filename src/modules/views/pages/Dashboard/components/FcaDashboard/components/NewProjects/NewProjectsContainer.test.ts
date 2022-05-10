import { mapDispatchToProps, mapStateToProps } from './NewProjectsContainer';
import { getInitialState } from '../../../../../../../../test/rootState';
import { statisticsState } from '../../../../../../../state-mgmt/statistics';

describe('NewProjectsContainer', () => {
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
      fetchProjectWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectWidget('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectWidgetStatisticsStart('key', {}));
  });
});
