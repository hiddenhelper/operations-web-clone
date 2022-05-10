import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { ToastType } from '../../models/general';
import { getCountry_1, getSearchWoker, getTimeZone_1 } from '../../../test/entities';

describe('general reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(undefined, { type: null, payload: null })).toEqual(initialState);
  });

  it('should return a new state ActionType.SET_LOADING', () => {
    const firstChange = { ...initialState, loadingMap: { one: { isLoading: true, hasError: false, error: undefined } } };
    const secondChange = { ...firstChange, loadingMap: { ...firstChange.loadingMap, two: { isLoading: false, hasError: true, error: { message: 'error' } } } };
    expect(reducer(undefined, actions.setLoading('one', true))).toEqual(firstChange);
    expect(reducer(firstChange, actions.setLoading('two', false, true, { message: 'error' }))).toEqual(secondChange);
  });

  it('should return a new state ActionType.CLEAR_LOADING', () => {
    const loading = { ...initialState, loadingMap: { one: { isLoading: true, hasError: false, error: undefined } }, uiRelationMap: {} };
    expect(reducer(undefined, actions.setLoading('one', true))).toEqual(loading);
    expect(reducer(loading, actions.clear('one'))).toEqual({
      loadingMap: { one: undefined },
      uiRelationMap: {},
      toastList: [],
      modalMap: {},
      modalCount: null,
      isHeaderFixed: true,
      hideScroll: false,
      countryList: [],
      timeZoneList: [],
    });
  });

  it('should return a new state ActionType.CLEAR_LOADING_MAP', () => {
    const loading = { ...initialState, loadingMap: { one: { isLoading: true, hasError: false, error: undefined } }, uiRelationMap: {} };
    expect(reducer(loading, actions.clearLoadingMap())).toEqual({
      loadingMap: {},
      uiRelationMap: {},
      toastList: [],
      modalMap: {},
      modalCount: null,
      isHeaderFixed: true,
      hideScroll: false,
      countryList: [],
      timeZoneList: [],
    });
  });

  it('should return a new state ActionType.SET_RELATION_UI_ID', () => {
    expect(reducer(undefined, actions.setRelationUiId('tempId', 'value'))).toEqual({ ...initialState, uiRelationMap: { tempId: 'value' } });
    expect(reducer({ ...initialState, uiRelationMap: { tempId: 'value' } }, actions.setRelationUiId('tempId', null))).toEqual({
      ...initialState,
      uiRelationMap: {},
    });
  });

  it('should return a new state ActionType.CLEAR_RELATION_MAP', () => {
    expect(reducer(undefined, actions.clearRelationMap())).toEqual({ ...initialState, uiRelationMap: {} });
  });

  it('should return state for ActionType.ADD_TOAST_SUCCESS', () => {
    const toast = { _id: '123', message: 'message', type: ToastType.SUCCESS };
    expect(reducer(initialState, actions.addToastSuccess(toast._id, toast.message, toast.type))).toEqual({
      ...initialState,
      toastList: [toast],
    });
  });

  it('should return state for ActionType.REMOVE_TOAST', () => {
    const toast = { _id: '123', message: 'message', type: ToastType.SUCCESS };
    expect(reducer({ ...initialState, toastList: [toast] }, actions.removeToast(toast._id))).toEqual(initialState);
  });

  it('should return state for ActionType.SET_MODAL_MAP', () => {
    const list = [{ id: '1', name: 'name' }];
    const count = 1;
    expect(reducer(undefined, actions.setModalMap(list, count))).toEqual({ ...initialState, modalMap: { ['1']: { id: '1', name: 'name' } }, modalCount: 1 });
  });

  it('should return state for ActionType.SET_HIDE_SCROLL', () => {
    expect(reducer(undefined, actions.setHideScroll(true))).toEqual({ ...initialState, hideScroll: true });
  });

  it('should return state for ActionType.FETCH_COUNTRY_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchCountryListSuccess([getCountry_1()]))).toEqual({ ...initialState, countryList: [getCountry_1()] });
  });

  it('should return state for ActionType.FETCH_TIME_ZONE_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchTimeZoneListSuccess([getTimeZone_1()]))).toEqual({ ...initialState, timeZoneList: [getTimeZone_1()] });
  });

  it('should return state for ActionType.FETCH_SEARCH_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchSearchSuccess(getSearchWoker()))).toEqual({ ...initialState, searchResults: getSearchWoker() });
  });

  it('should return state for ActionType.FETCH_SEARCH_MORE_SUCCESS', () => {
    const initialSearch = { ...initialState, searchResults: getSearchWoker() };
    const page2Results = {
      ...getSearchWoker(),
      totalResults: 2,
      pageNumber: 2,
      pageSize: 2,
    };
    expect(reducer(initialSearch, actions.fetchSearchMoreSuccess(page2Results))).toEqual({
      ...initialState,
      searchResults: {
        items: [...getSearchWoker().items, ...getSearchWoker().items],
        pageNumber: 2,
        pageSize: 2,
        totalResults: 2,
      },
    });
  });

  it('should return state for ActionType.FETCH_SEARCH_MORE_SUCCESS without errors if search was cleared', () => {
    const initialSearch = { ...initialState, searchResults: null };
    const page2Results = {
      ...getSearchWoker(),
      totalResults: 2,
      pageNumber: 2,
      pageSize: 2,
    };
    expect(reducer(initialSearch, actions.fetchSearchMoreSuccess(page2Results))).toEqual({
      ...initialState,
      searchResults: {
        items: [...getSearchWoker().items],
        pageNumber: 2,
        pageSize: 2,
        totalResults: 2,
      },
    });
  });

  it('should return state for ActionType.CLEAR_SEARCH', () => {
    expect(reducer(undefined, actions.clearSearch())).toEqual({ ...initialState, searchResults: undefined });
  });
});
