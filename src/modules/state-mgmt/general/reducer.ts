import { ActionType } from './actions';
import { initialState, IState } from './state';
import { deleteObjectItem } from '../../../utils/generalUtils';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.SET_LOADING:
      return {
        toastList: [],
        ...state,
        loadingMap: {
          ...state.loadingMap,
          [payload.key]: { isLoading: payload.isLoading, hasError: !!payload.hasError, error: payload.error, traceId: payload.traceId },
        },
      };
    case ActionType.CLEAR_LOADING:
      return {
        ...state,
        loadingMap: {
          ...state.loadingMap,
          [payload.key]: undefined,
        },
      };
    case ActionType.CLEAR_LOADING_MAP:
      return {
        ...state,
        loadingMap: {},
      };
    case ActionType.SET_RELATION_UI_ID:
      return {
        ...state,
        uiRelationMap: !payload.value ? deleteObjectItem(state.uiRelationMap, payload.key) : { ...state.uiRelationMap, [payload.key]: payload.value },
      };
    case ActionType.CLEAR_RELATION_MAP:
      return {
        ...state,
        uiRelationMap: {},
      };
    case ActionType.ADD_TOAST_SUCCESS:
      return { ...state, toastList: [...state.toastList, payload] };
    case ActionType.REMOVE_TOAST:
      return { ...state, toastList: state.toastList.filter(item => item._id !== payload._id) };
    case ActionType.SET_MODAL_MAP:
      return { ...state, modalMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}), modalCount: payload.count };
    case ActionType.SET_HIDE_SCROLL:
      return { ...state, hideScroll: payload.hide };
    case ActionType.FETCH_COUNTRY_LIST_SUCCESS:
      return { ...state, countryList: payload.list };
    case ActionType.FETCH_TIME_ZONE_LIST_SUCCESS:
      return { ...state, timeZoneList: payload.list };
    case ActionType.FETCH_SEARCH_SUCCESS:
      return { ...state, searchResults: payload.list };
    case ActionType.FETCH_SEARCH_MORE_SUCCESS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          items: [...(state.searchResults?.items ?? []), ...payload.list.items],
          pageNumber: payload.list.pageNumber,
          pageSize: payload.list.pageSize,
          totalResults: payload.list.totalResults,
        },
      };
    case ActionType.CLEAR_SEARCH:
      return { ...state, searchResults: undefined };
    default:
      return state;
  }
};
