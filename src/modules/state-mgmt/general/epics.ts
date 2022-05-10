import { Epic, ofType } from 'redux-observable';
import { of, concat, EMPTY } from 'rxjs';
import { mergeMap, delay, tap, map, catchError } from 'rxjs/operators';

import { ENV, GENERAL } from '../../../constants';
import { coreState } from '../core';
import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';

export const addToast: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ADD_TOAST_START),
    mergeMap(({ payload }) => {
      const _id = Date.now().toString();
      return concat(of(actions.addToastSuccess(_id, payload.message, payload.type)), of(actions.removeToast(_id)).pipe(delay(ENV.TOAST_DELAY)));
    })
  );

export const destroyPrinter: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DESTROY_PRINTER),
    tap(() => deps.printerService.destroy()),
    mergeMap(() => EMPTY)
  );

export const fetchCountryListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_COUNTRY_LIST_START),
    mergeMap(() =>
      concat(
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, true)),
        deps.apiService.getCountryList().pipe(map(res => actions.fetchCountryListSuccess(res))),
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, false))
      ).pipe(catchError(error => of(coreState.actions.epicError(error), actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, false, true, error))))
    )
  );

export const fetchTimeZoneListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_TIME_ZONE_LIST_START),
    mergeMap(() =>
      concat(
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, true)),
        deps.apiService.getTimeZones().pipe(map(res => actions.fetchTimeZoneListSuccess(res))),
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, false))
      ).pipe(catchError(error => of(coreState.actions.epicError(error), actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, false, true, error))))
    )
  );

export const fetchSearchStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SEARCH_START),
    mergeMap(({ payload }) =>
      concat(
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, true)),
        deps.apiService.quickSearch(payload.search).pipe(map(res => actions.fetchSearchSuccess(res))),
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, false))
      ).pipe(catchError(error => of(coreState.actions.epicError(error), actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, false, true, error))))
    )
  );

export const fetchSearchMoreStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SEARCH_MORE_START),
    mergeMap(({ payload }) =>
      concat(
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, true)),
        deps.apiService.quickSearch(payload.search).pipe(map(res => actions.fetchSearchMoreSuccess(res))),
        of(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, false))
      ).pipe(catchError(error => of(coreState.actions.epicError(error), actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, false, true, error))))
    )
  );

export const epics = [addToast, destroyPrinter, fetchCountryListStart, fetchTimeZoneListStart, fetchSearchStart, fetchSearchMoreStart];
