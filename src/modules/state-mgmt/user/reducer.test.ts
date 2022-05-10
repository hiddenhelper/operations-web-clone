import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getClient_1, getProject_1, getUser_1 } from '../../../test/entities';

describe('user reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on user ActionType.VALIDATE_TOKEN_SUCCESS', () => {
    const tokenPayload = 'some@email.com';
    expect(reducer(undefined, actions.validateTokenSuccess(tokenPayload))).toEqual({ ...initialState, email: tokenPayload });
  });

  it('should return a new state on user ActionType.FETCH_CLIENT_USER_LIST_SUCCESS', () => {
    const user = { id: 'string', name: 'name' };
    const count = 1;
    expect(reducer(undefined, actions.fetchUserListSuccess([user], count))).toEqual({ ...initialState, userMap: { [user.id]: user }, count });
  });

  it('should return a new state on user ActionType.FETCH_USER_ROLE_LIST_SUCCESS', () => {
    const roleList = [{ id: 'role', name: 'name' }];
    expect(reducer(undefined, actions.fetchRoleListSuccess(roleList))).toEqual({ ...initialState, roleList: roleList });
  });

  it('should return a new state on user ActionType.SAVE_USER_SUCCESS', () => {
    const user = { id: 'string', name: 'name' } as any;
    expect(reducer(undefined, actions.saveUserSuccess(user))).toEqual({ ...initialState, userMap: { [user.id]: user } });
  });

  it('should return a new state on user ActionType.FETCH_PROJECT_USER_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectUserListSuccess(getProject_1().id, [getUser_1()], 1))).toEqual({
      ...initialState,
      userProjectMap: { [getProject_1().id]: { [getUser_1().id]: getUser_1() } },
      count: 1,
    });
  });

  it('should return a new state on user ActionType.FETCH_CLIENT_USER_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchClientUserListSuccess(getClient_1().id, [getUser_1()], 1))).toEqual({
      ...initialState,
      userClientMap: { [getClient_1().id]: { [getUser_1().id]: getUser_1() } },
      count: 1,
    });
  });

  it('should return a new state on worker ActionType.CLEAR_USER_MAP', () => {
    expect(reducer(undefined, actions.clearUserMap())).toEqual({ ...initialState, userMap: {} });
  });

  it('should return a new state on user ActionType.FETCH_ACCOUNT_DATA_SUCCESS', () => {
    const user = { id: 'string', name: 'name' } as any;
    expect(reducer(undefined, actions.fetchProfileDataSuccess(user))).toEqual({ ...initialState, accountData: user });
  });

  it('should return a new state on user ActionType.CLEAR_ACCOUNT_DATA', () => {
    expect(reducer(undefined, actions.clearAccountData())).toEqual({ ...initialState, accountData: null });
  });
});
