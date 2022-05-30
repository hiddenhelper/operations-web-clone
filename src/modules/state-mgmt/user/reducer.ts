import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.VALIDATE_TOKEN_SUCCESS:
      return { ...state, email: payload.email };
    case ActionType.FETCH_USER_LIST_SUCCESS:
      return { ...state, userMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}), count: payload.count };
    case ActionType.FETCH_USER_ROLE_LIST_SUCCESS:
      return { ...state, roleList: payload.list };
    case ActionType.SAVE_USER_SUCCESS:
      return { ...state, userMap: { ...state.userMap, [payload.user.id]: payload.user } };
    case ActionType.FETCH_PROJECT_USER_LIST_SUCCESS:
      return {
        ...state,
        userProjectMap: { [payload.projectId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_CLIENT_USER_LIST_SUCCESS:
      return {
        ...state,
        userClientMap: { [payload.clientId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_ACCOUNT_DATA_SUCCESS:
      return { ...state, accountData: payload.data };
    case ActionType.FETCH_GROUP_SEARCH_SUCCESS:
      return { ...state, groupList: payload.data };
    case ActionType.CLEAR_ACCOUNT_DATA:
      return { ...state, accountData: null };
    case ActionType.CLEAR_USER_MAP:
      return { ...state, userMap: {}, userProjectMap: {}, count: null };

    default:
      return state;
  }
};
