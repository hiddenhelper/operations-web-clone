import { getInitialState } from '../../../../../../test/rootState';
import { userState } from '../../../../../state-mgmt/user';
import { mapStateToProps, mapDispatchToProps } from './UsersTabContainer';
import { clientState } from '../../../../../state-mgmt/client';

describe('UsersTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userMap: getInitialState().user.userProjectMap,
      clientMap: getInitialState().client.clientProjectMap,
      userCount: getInitialState().user.count,
      userLoading: undefined,
      assignUserLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      clearUserMap: expect.any(Function),
      fetchUserList: expect.any(Function),
      fetchProjectClientList: expect.any(Function),
      fetchUserProfile: expect.any(Function),
    });
  });

  it('should dispatch clearUserMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearUserMap();
    expect(dispatch).toBeCalledWith(userState.actions.clearUserMap());
  });

  it('should dispatch fetchUserList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.fetchUserList(id, {});
    expect(dispatch).toBeCalledWith(userState.actions.fetchProjectUserListStart(id, {}));
  });

  it('should dispatch fetchProjectClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.fetchProjectClientList(id, {});
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientListStart(id, {}));
  });
});
