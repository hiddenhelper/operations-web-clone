import { ActionType } from './actions';
import { initialState, IState } from './state';
import { deleteObjectItem } from '../../../utils/generalUtils';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.FETCH_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS:
      return { ...state, accessControlSystemMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}), count: payload.count };
    case ActionType.FETCH_ACCESS_CONTROL_SYSTEM_SUCCESS:
    case ActionType.UPDATE_ACCESS_CONTROL_SYSTEM_SUCCESS:
      return {
        ...state,
        accessControlSystemMap: {
          ...state.accessControlSystemMap,
          [payload.accessControlSystem.id]: { ...state.accessControlSystemMap[payload.accessControlSystem.id], ...payload.accessControlSystem },
        },
      };
    case ActionType.CLEAR_ACCESS_CONTROL_SYSTEM_MAP:
      return { ...state, accessControlSystemMap: {}, count: 0, projectAccessControlSystem: null };
    case ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS:
      const acsList = [];
      payload.list.forEach(item => acsList.push(...item.accessControlSystems));
      return { ...state, accessControlSystemMap: acsList.reduce((total, item) => ({ ...total, [item.id]: item }), {}) };
    case ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_SUCCESS:
      return { ...state, projectAccessControlSystem: payload.accessControlSystem };
    case ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS:
      return { ...state, accessControlSystemMap: deleteObjectItem(state.accessControlSystemMap, payload.id) };
    default:
      return state;
  }
};
