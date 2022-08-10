import { mapDispatchToProps, mapStateToProps } from './TopTenProjectsContainer';
import { getInitialState } from '../../../../../test/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

describe('TopTenProjectsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectTopTenWidget: getInitialState().statistics.projectTopTenStatistics,
      loading: undefined,
      isFcaUser: getInitialState().auth.isFcaUser,
      isAdmin: getInitialState().auth.isAdmin,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProjectTopTen: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectTopTen start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectTopTen({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectTopTenStart({}));
  });
});
