import { initialState, IState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }) => {
  switch (type) {
    case ActionType.FETCH_BADGE_SUCCESS:
      return { ...state, badgeMap: { ...state.badgeMap, [payload.badge.id]: payload.badge } };
    case ActionType.CLEAR_MAP:
      return { ...state, badgeMap: {}, badgeVisitorMap: {}, count: null, historyList: [] };
    case ActionType.UPDATE_BADGE_SUCCESS:
      return {
        ...state,
        badgeMap: {
          ...state.badgeMap,
          [payload.id]: { ...state.badgeMap[payload.id], status: payload.status },
        },
      };
    case ActionType.FETCH_PROJECT_BADGE_VISITOR_LIST_SUCCESS:
      return {
        ...state,
        badgeVisitorMap: { [payload.projectId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_BADGE_HISTORY_SUCCESS:
      return {
        ...state,
        historyList: payload.list,
        count: payload.count,
      };
    case ActionType.CLEAR_BADGE_HISTORY:
      return {
        ...state,
        historyList: [],
        count: 0,
      };
    default:
      return state;
  }
};
