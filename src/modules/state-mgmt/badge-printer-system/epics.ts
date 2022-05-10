import { Epic, ofType } from 'redux-observable';
import { concat, of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { GENERAL } from '../../../constants';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { projectState } from '../project';
import { generalState } from '../general';
import { coreState } from '../core';
import { actions, ActionType } from './actions';
import { ToastType } from '../../models/general';
import { statisticsState } from '../statistics';

export const fetchBadgePrinterSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_PRINTER_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, true)),
        deps.apiService.getBadgePrinterSystem(payload.id).pipe(map(res => actions.fetchBadgePrinterSystemListSuccess([res], 1))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, false, true, error))
        )
      )
    )
  );

export const fetchBadgePrintingSystemSummaryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, true)),
        deps.apiService.getBadgePrinterSystem(payload.id).pipe(map(res => actions.fetchBadgePrinterSystemSummarySuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, false, true, error))
        )
      )
    )
  );

export const fetchBadgePrinterSystemListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_PRINTER_SYSTEM_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, true)),
        deps.apiService.getBadgePrinterSystemList(payload.query).pipe(map(res => actions.fetchBadgePrinterSystemListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false, true, error))
        )
      )
    )
  );

export const saveBadgePrinterSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_BADGE_PRINTER_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, true)),
        deps.apiService
          .saveBadgePrinterSystem(payload.badgePrinterSystem)
          .pipe(
            mergeMap(res => [
              actions.saveBadgePrinterSystemSuccess(res),
              push('/inventory?deviceType="badge-printing-system"', { success: true }),
              generalState.actions.addToastStart('Badge Printing System has been created successfully!', ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false))
      ).pipe(
        catchError(error => [
          coreState.actions.epicError(error),
          generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false, true, error),
          generalState.actions.addToastStart(error.title, ToastType.ERROR),
        ])
      )
    )
  );

export const updateBadgePrinterSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_BADGE_PRINTER_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, true)),
        deps.apiService
          .updateBadgePrinterSystem(payload.badgePrinterSystem)
          .pipe(
            mergeMap(res => [
              actions.saveBadgePrinterSystemSuccess(res),
              push('/inventory?deviceType="badge-printing-system"', { success: true }),
              generalState.actions.addToastStart('Changes saved successfully!', ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false, true, error),
            generalState.actions.addToastStart(error.title, ToastType.ERROR)
          )
        )
      )
    )
  );

export const deleteBadgePrinterSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_BADGE_PRINTER_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true)),
        deps.apiService
          .deleteBadgePrinterSystem(payload.id)
          .pipe(
            mergeMap(() => [
              payload.query.newPage
                ? push(`/inventory?page=${payload.query.page - 1}&limit=${payload.query.limit}`)
                : actions.fetchBadgePrinterSystemListStart(payload.query),
              generalState.actions.addToastStart(
                `${state$.value.badgePrinterSystem.badgePrinterSystemMap[payload.id].name} deleted successfully!`,
                ToastType.SUCCESS
              ),
              statisticsState.actions.fetchInventoryStatisticsStart(),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false, true, error),
            generalState.actions.addToastStart(error.title, ToastType.ERROR)
          )
        )
      )
    )
  );

export const fetchBadgePrintingSystemProjectListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_PRINTER_SYSTEM_PROJECT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, true)),
        deps.apiService.getBadgePrinterSystemList(payload.query).pipe(map(res => generalState.actions.setModalMap(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false, true, error))
        )
      )
    )
  );

export const fetchProjectBadgePrintingSystemListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_BADGE_PRINTER_SYSTEM_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, true)),
        deps.apiService
          .getProjectBadgePrintingSystemList(payload)
          .pipe(
            mergeMap(res => [
              actions.fetchBadgePrinterSystemListSuccess(res.items, res.totalResults),
              projectState.actions.associateBadgePrintingSystemProject(payload.id, res.items),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, false, true, error)
          )
        )
      )
    )
  );

export const updateBadgePrintingSystemDateStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_BADGE_PRINTER_SYSTEM_DATE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, true)),
        deps.apiService.updateBadgePrintingSystemProjectDate(payload.projectId, payload.id, payload.date).pipe(
          mergeMap(res => [
            actions.saveBadgePrinterSystemSuccess({
              ...state$.value.badgePrinterSystem.badgePrinterSystemMap[payload.id],
              shippingDate: payload.date,
            }),
            generalState.actions.addToastStart('Date has changed successfully!', ToastType.SUCCESS),
          ])
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, false, true, error),
            generalState.actions.addToastStart(error.title, ToastType.ERROR)
          )
        )
      )
    )
  );

export const epics = [
  fetchBadgePrinterSystemStart,
  fetchBadgePrinterSystemListStart,
  fetchBadgePrintingSystemSummaryStart,
  saveBadgePrinterSystemStart,
  updateBadgePrinterSystemStart,
  deleteBadgePrinterSystemStart,
  fetchBadgePrintingSystemProjectListStart,
  fetchProjectBadgePrintingSystemListStart,
  updateBadgePrintingSystemDateStart,
];
