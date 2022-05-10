import { Epic, ofType } from 'redux-observable';
import { concat, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { generalState } from '../general';
import { actions, ActionType } from './actions';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { projectState } from '../project';
import { ToastType } from '../../models/general';
import { AccessControlSystemModel } from '../../models';
import { handleToastError } from '../core/operators';
import { statisticsState } from '../statistics';

export const fetchAccessControlSystemListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ACCESS_CONTROL_SYSTEM_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, true)),
        deps.apiService.getAccessControlSystemList(payload.query).pipe(map(res => actions.fetchAccessControlSystemListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false, true, error))
        )
      )
    )
  );

export const fetchAccessControlSystemSummaryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, true)),
        deps.apiService.getAccessControlSystemSummary(payload.id).pipe(map(res => actions.updateAccessControlSystemSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, false, true, error))
        )
      )
    )
  );

export const fetchAccessControlSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ACCESS_CONTROL_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, true)),
        deps.apiService.getAccessControlSystem(payload.id).pipe(map(res => actions.fetchAccessControlSystemSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, false, true, error))
        )
      )
    )
  );

export const saveAccessControlSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_ACCESS_CONTROL_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true)),
        (payload.accessControlSystem.type === AccessControlSystemModel.AccessControlSystemType.HANDHELD
          ? deps.apiService.saveAccessControlSystemHandheld(payload.accessControlSystem)
          : deps.apiService.saveAccessControlSystemAccessPoint(payload.accessControlSystem)
        ).pipe(
          mergeMap(res => [
            actions.fetchAccessControlSystemSuccess(res),
            push('/inventory', { success: true }),
            generalState.actions.addToastStart('Access Control System created successfully!', ToastType.SUCCESS),
          ])
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false))
      ).pipe(
        catchError(error => [
          coreState.actions.epicError(error),
          generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false, true, error),
          generalState.actions.addToastStart(error.title, ToastType.ERROR),
        ])
      )
    )
  );

export const updateAccessControlSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_ACCESS_CONTROL_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true)),
        (payload.accessControlSystem.type === AccessControlSystemModel.AccessControlSystemType.HANDHELD
          ? deps.apiService.updateAccessControlSystemHandheld(payload.accessControlSystem)
          : deps.apiService.updateAccessControlSystemAccessPoint(payload.accessControlSystem)
        ).pipe(
          mergeMap(res => [
            actions.updateAccessControlSystemSuccess(res),
            push('/inventory', { success: true }),
            generalState.actions.addToastStart('Changes saved successfully!', ToastType.SUCCESS),
          ])
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false, true, error),
            generalState.actions.addToastStart(error.title, ToastType.ERROR)
          )
        )
      )
    )
  );

export const deleteAccessControlSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_ACCESS_CONTROL_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true)),
        deps.apiService
          .deleteAccessControlSystem(payload.id)
          .pipe(
            mergeMap(() => [
              payload.query.newPage
                ? push(`/inventory?page=${payload.query.page - 1}&limit=${payload.query.limit}`)
                : actions.fetchAccessControlSystemListStart(payload.query),
              generalState.actions.addToastStart(
                `${state$.value.accessControlSystem.accessControlSystemMap[payload.id].serialNumber} deleted successfully!`,
                ToastType.SUCCESS
              ),
              statisticsState.actions.fetchInventoryStatisticsStart(),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, ['ACS_IS_ASSIGNED_TO_PROJECT']))
    )
  );

export const fetchProjectAccessControlSystemListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST, true)),
        deps.apiService
          .getProjectAccessControlSystemList(payload)
          .pipe(
            mergeMap(res => [
              actions.fetchProjectAccessControlSystemListSuccess(res),
              projectState.actions.associateAccessControlSystemProject(payload.id, res),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST))
    )
  );

export const updateProjectAccessControlSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT, true)),
        deps.apiService
          .updateProjectAccessControlSystem(payload.projectId, payload.acsId, payload.acs)
          .pipe(map(res => generalState.actions.addToastStart('Changes saved successfully!', ToastType.SUCCESS))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT))
    )
  );

export const fetchAccessControlSystemProjectListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ACCESS_CONTROL_SYSTEM_PROJECT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, true)),
        deps.apiService.getAccessControlSystemList(payload.query).pipe(map(res => generalState.actions.setModalMap(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST))
    )
  );

export const fetchProjectAccessControlSystemStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM, true)),
        deps.apiService.getProjectAccessControlSystem(payload.projectId, payload.acsId).pipe(map(res => actions.fetchProjectAccessControlSystemSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM))
    )
  );

export const epics = [
  fetchAccessControlSystemListStart,
  fetchAccessControlSystemSummaryStart,
  fetchAccessControlSystemStart,
  saveAccessControlSystemStart,
  updateAccessControlSystemStart,
  deleteAccessControlSystemStart,
  fetchProjectAccessControlSystemListStart,
  updateProjectAccessControlSystemStart,
  fetchAccessControlSystemProjectListStart,
  fetchProjectAccessControlSystemStart,
];
