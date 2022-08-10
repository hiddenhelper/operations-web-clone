import { ActionType } from './actions';
import { initialState, IState } from './state';
import { ResourceModel } from '../../models';
import { preloadClient } from '../../../utils/clientUtils';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.FETCH_CLIENT_LIST_SUCCESS:
      console.log('FETCH_CLIENT_LIST_SUCCESS', payload);
      return { ...state, clientMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: preloadClient(item) }), {}), count: payload.count };
    case ActionType.FETCH_SELF_COMPANY_SUCCESS:
      return { ...state, selfCompany: payload.company };
    case ActionType.FETCH_MWBE_SUCCESS:
      return { ...state, mwbeList: payload.list };
    case ActionType.FETCH_TRADES_SUCCESS:
      return { ...state, tradeList: payload.list };
    case ActionType.INVITE_DRAFT_CLIENT_SUCCESS:
      return { ...state, clientMap: { [payload.client.id]: payload.client } };
    case ActionType.UPDATE_DRAFT_CLIENT_SUCCESS:
      return { ...state, clientMap: { ...state.clientMap, [payload.client.id]: payload.client } };
    case ActionType.CLEAR_CLIENT_MAP:
      return { ...state, clientMap: {}, clientProjectMap: {}, clientProjectHirearchyMap: {}, count: 0 };
    case ActionType.UPDATE_CLIENT_SUCCESS:
      return { ...state, clientMap: { ...state.clientMap, [payload.client.id]: { ...state.clientMap[payload.client.id], ...payload.client } } };
    case ActionType.ARCHIVE_CLIENT_SUCCESS:
      return { ...state, clientMap: { ...state.clientMap, [payload.id]: { ...state.clientMap[payload.id], status: ResourceModel.CompanyStatus.ARCHIVED } } };
    case ActionType.UNARCHIVE_CLIENT_SUCCESS:
      return { ...state, clientMap: { ...state.clientMap, [payload.id]: { ...state.clientMap[payload.id], status: ResourceModel.CompanyStatus.ACTIVE } } };
    case ActionType.FETCH_PROJECT_CLIENT_HIREARCHY_LIST_SUCCESS:
      return { ...state, clientProjectHirearchyMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: preloadClient(item) }), {}) };
    case ActionType.FETCH_PROJECT_CLIENT_LIST_SUCCESS:
      return {
        ...state,
        clientProjectMap: { [payload.projectId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_PROJECT_CLIENT_SUMMARY_SUCCESS:
      return {
        ...state,
        clientProjectMap: {
          ...state.clientProjectMap,
          [payload.projectId]: {
            ...state.clientProjectMap[payload.projectId],
            [payload.client.id]: { ...state.clientProjectMap[payload.projectId][payload.client.id], ...payload.client },
          },
        },
      };
    case ActionType.UPDATE_PROJECT_CLIENT_TAX_CONDITION_SUCCESS:
      return {
        ...state,
        clientProjectMap: {
          ...state.clientProjectMap,
          [payload.projectId]: {
            ...state.clientProjectMap[payload.projectId],
            [payload.clientId]: {
              ...state.clientProjectMap[payload.projectId][payload.clientId],
              isTaxExempt: payload.condition,
            },
          },
        },
      };
    case ActionType.FETCH_ADMIN_PERMISSION_SUCCESS:
      return {
        ...state,
        isGeneralAdmin: payload.isGeneralAdmin,
      };
    default:
      return state;
  }
};
