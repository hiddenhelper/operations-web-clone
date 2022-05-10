import { mapDispatchToProps, mapStateToProps } from './UsersTabContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { userState } from '../../../../../state-mgmt/user';

describe('ProjectsTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userMap: getInitialState().user.userClientMap,
      userCount: getInitialState().user.count,
      loading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchUserList: expect.any(Function),
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchUserList: expect.any(Function),
    });
  });

  it('should dispatch fetchUserList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchUserList('id', 1, 5);
    expect(dispatch).toBeCalledWith(userState.actions.fetchClientUserListStart('id', 1, 5));
  });
});
