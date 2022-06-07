import { GENERAL } from '../../../../../../constants';
import { getInitialState } from '../../../../../../test/rootState';
import { userState } from '../../../../../state-mgmt/user';
import { projectState } from '../../../../../state-mgmt/project';
import { clientState } from '../../../../../state-mgmt/client';
import { mapStateToProps, mapDispatchToProps } from './AssignUserContainer';
import { getClient_1, getUser_1 } from '../../../../../../test/entities';
import { generalState } from '../../../../../state-mgmt/general';

describe('AssignUserContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userCompanyId: getInitialState().auth.companyId,
      currentUserRole: getInitialState().auth.role,
      userRoleList: getInitialState().user.roleList,
      userMap: getInitialState().general.modalMap,
      clientMap: getInitialState().client.clientMap,
      clientProjectMap: getInitialState().client.clientProjectMap,
      count: getInitialState().general.modalCount,
      loading: undefined,
      assignLoading: undefined,
      saveUserLoading: undefined,
      groupList: [],
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchUserProjectList: expect.any(Function),
      fetchUserRoleList: expect.any(Function),
      fetchClientList: expect.any(Function),
      assignUser: expect.any(Function),
      saveUser: expect.any(Function),
      clearErrors: expect.any(Function),
      fetchProjectClientList: expect.any(Function),
      fetchGroupSearch: expect.any(Function),
    });
  });

  it('should dispatch fetchUserProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.fetchUserProjectList(query);
    expect(dispatch).toBeCalledWith(userState.actions.fetchUserProjectListStart(query));
  });

  it('should dispatch fetchUserRoleList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchUserRoleList();
    expect(dispatch).toBeCalledWith(userState.actions.fetchRoleListStart());
  });

  it('should dispatch fetchClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.fetchClientList(id);
    expect(dispatch).toBeCalledWith(clientState.actions.fetchUserClientListStart(id, {}));
  });

  it('should dispatch assignUser start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '123';
    const list = [
      { id: '1', roleId: '1' },
      { id: '2', roleId: '1' },
    ];
    props.assignUser(id, list);
    expect(dispatch).toBeCalledWith(projectState.actions.assignUserProjectStart(id, list));
  });

  it('should dispatch saveUser start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const user = getUser_1();
    const companyId = getClient_1().id;
    props.saveUser(companyId, user);
    expect(dispatch).toBeCalledWith(userState.actions.saveUserStart(companyId, user));
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_USER));
  });

  it('should dispatch fetchProjectClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.fetchProjectClientList(id, {});
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientListStart(id, {}));
  });
});
