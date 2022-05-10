import { mapDispatchToProps, mapStateToProps } from './NewActiveProjectsContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('NewActiveProjectsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      locationWidget: getInitialState().statistics.locationStatistics,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchActiveProjects: expect.any(Function),
    });
  });

  it('should dispatch fetchActiveProjects start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchActiveProjects({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchActiveProjectsStart({}));
  });
});
