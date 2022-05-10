import { GeneralModel, SearchModel } from '../../models';

export enum ActionType {
  SET_LOADING = '[general] set loading',
  CLEAR_LOADING = '[general] clear loading',
  CLEAR_LOADING_MAP = '[general] clear loading map',
  SET_RELATION_UI_ID = '[general] set relation ui id',
  CLEAR_RELATION_MAP = '[general] clear relation map',
  ADD_TOAST_START = '[general] add toast start',
  ADD_TOAST_SUCCESS = '[general] add toast success',
  REMOVE_TOAST = '[general] remove toast',
  SET_MODAL_MAP = '[general] set modal map',
  DESTROY_PRINTER = '[general] destroy printer',
  SET_HIDE_SCROLL = '[general] set hide scroll',
  FETCH_COUNTRY_LIST_START = '[general] fetch country list start',
  FETCH_COUNTRY_LIST_SUCCESS = '[general] fetch country list success',
  FETCH_TIME_ZONE_LIST_START = '[project] fetch time zone list start',
  FETCH_TIME_ZONE_LIST_SUCCESS = '[project] fetch time zone list success',
  FETCH_SEARCH_START = '[general] fetch search start',
  FETCH_SEARCH_SUCCESS = '[general] fetch search success',
  FETCH_SEARCH_MORE_START = '[general] fetch search more start',
  FETCH_SEARCH_MORE_SUCCESS = '[general] fetch search more success',
  CLEAR_SEARCH = '[general] clear search',
}

export const actions = {
  setLoading: (key: string, isLoading: boolean, hasError?: boolean, error?: any, traceId?: string) => ({
    type: ActionType.SET_LOADING,
    payload: { key, isLoading, hasError, error, traceId },
  }),
  clear: (key: string) => ({
    type: ActionType.CLEAR_LOADING,
    payload: { key },
  }),
  clearLoadingMap: () => ({
    type: ActionType.CLEAR_LOADING_MAP,
    payload: {},
  }),
  setRelationUiId: (key: string, value: any) => ({
    type: ActionType.SET_RELATION_UI_ID,
    payload: { key, value },
  }),
  clearRelationMap: () => ({
    type: ActionType.CLEAR_RELATION_MAP,
    payload: {},
  }),
  addToastStart: (message: string, type: GeneralModel.ToastType) => ({ type: ActionType.ADD_TOAST_START, payload: { message, type } }),
  addToastSuccess: (_id: string, message: string, type: GeneralModel.ToastType) => ({
    type: ActionType.ADD_TOAST_SUCCESS,
    payload: { _id, message, type },
  }),
  removeToast: (_id: string) => ({ type: ActionType.REMOVE_TOAST, payload: { _id } }),
  setModalMap: (list: any[], count: number) => ({ type: ActionType.SET_MODAL_MAP, payload: { list, count } }),
  destroyPrinter: () => ({ type: ActionType.DESTROY_PRINTER, payload: {} }),
  setHideScroll: (hide: boolean) => ({ type: ActionType.SET_HIDE_SCROLL, payload: { hide } }),
  fetchCountryListStart: () => ({ type: ActionType.FETCH_COUNTRY_LIST_START, payload: {} }),
  fetchCountryListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_COUNTRY_LIST_SUCCESS, payload: { list } }),
  fetchTimeZoneListStart: () => ({ type: ActionType.FETCH_TIME_ZONE_LIST_START, payload: {} }),
  fetchTimeZoneListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_TIME_ZONE_LIST_SUCCESS, payload: { list } }),
  fetchSearchStart: (search: SearchModel.ISearchParams) => ({ type: ActionType.FETCH_SEARCH_START, payload: { search } }),
  fetchSearchSuccess: (list: GeneralModel.IPagination<SearchModel.IResponse | SearchModel.IWorker>) => ({
    type: ActionType.FETCH_SEARCH_SUCCESS,
    payload: { list },
  }),
  fetchSearchMoreStart: (search: SearchModel.ISearchParams) => ({ type: ActionType.FETCH_SEARCH_MORE_START, payload: { search } }),
  fetchSearchMoreSuccess: (list: GeneralModel.IPagination<SearchModel.IResponse | SearchModel.IWorker>) => ({
    type: ActionType.FETCH_SEARCH_MORE_SUCCESS,
    payload: { list },
  }),
  clearSearch: () => ({ type: ActionType.CLEAR_SEARCH, payload: {} }),
};
