import { Epic, ofType } from 'redux-observable';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { map, mergeMap, tap } from 'rxjs/operators';
import { concat, EMPTY, of } from 'rxjs';

import { BadgeModel, GeneralModel } from '../../models';
import { GENERAL } from '../../../constants';
import { generalState } from '../general';
import { handleToastError } from '../core/operators';
import { actions, ActionType } from './actions';

export const fetchBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE, true)),
        deps.apiService.getBadge(payload.id).pipe(map(res => actions.fetchBadgeSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_BADGE))
    )
  );

export const activateBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.APPROVE_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true)),
        deps.apiService
          .activateBadge(payload.id, payload.tagId)
          .pipe(
            mergeMap(res => [
              actions.updateBadgeSuccess(payload.id, BadgeModel.BadgeStatus.ACTIVE),
              generalState.actions.addToastStart('Badge activated successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_BADGE, ['TAG_ID_ALREADY_EXISTS', 'BADGE_TRANSITION_FAILED']))
    )
  );

export const deactivateBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DEACTIVATE_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true)),
        deps.apiService
          .deactivateBadge(payload.id, payload.reason)
          .pipe(
            mergeMap(res => [
              actions.updateBadgeSuccess(payload.id, BadgeModel.BadgeStatus.DEACTIVATE),
              generalState.actions.addToastStart('Badge deactivated successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_BADGE))
    )
  );

export const revokeBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.REVOKE_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true)),
        deps.apiService
          .revokeBadge(payload.id, payload.reason)
          .pipe(
            mergeMap(res => [
              actions.updateBadgeSuccess(payload.id, BadgeModel.BadgeStatus.REVOKED),
              generalState.actions.addToastStart('Badge revoked successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_BADGE))
    )
  );

export const fetchProjectBadgeVisitorListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_BADGE_VISITOR_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST, true)),
        deps.apiService.getVisitorBadgeList(payload).pipe(map(res => actions.fetchProjectBadgeVisitorListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST))
    )
  );

export const fetchBadgeVisitorStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_VISITOR_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR, true)),
        deps.apiService.getVisitorBadge(payload.id).pipe(map(res => actions.fetchBadgeSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR))
    )
  );

export const saveProjectVisitorBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_PROJECT_BADGE_VISITOR_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR, true)),
        deps.apiService.createBadgeVisitors(payload.id, payload.number).pipe(map(res => actions.createBadgeSuccess())),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR))
    )
  );

export const assignBadgeVisitorStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ASSIGN_PROJECT_BADGE_VISITOR_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true)),
        deps.apiService
          .updateBadgeVisitor(payload.id, payload.badgeVisitor)
          .pipe(
            mergeMap(res => [
              actions.createBadgeSuccess(),
              generalState.actions.addToastStart(
                payload.badgeVisitor.availability === BadgeModel.VisitorAvailability.ASSIGNED ? 'Changes saved successfully!' : 'Badge assigned successfully!',
                GeneralModel.ToastType.SUCCESS
              ),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR))
    )
  );

export const unassignBadgeVisitorStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UNASSIGN_PROJECT_BADGE_VISITOR_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true)),
        deps.apiService
          .updateBadgeVisitor(payload.id, payload.badgeVisitor)
          .pipe(
            mergeMap(res => [
              actions.createBadgeSuccess(),
              generalState.actions.addToastStart('Badge unassigned successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR))
    )
  );

export const updateBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROJECT_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, true)),
        deps.apiService
          .updateBadge(payload.id, payload.badge)
          .pipe(
            mergeMap(res => [
              actions.updateProjectBadgeSuccess(payload.id, payload.badge),
              generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA))
    )
  );

export const updateVisitorBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_VISITOR_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, true)),
        deps.apiService
          .updateBadgeVisitor(payload.id, payload.badge)
          .pipe(
            mergeMap(res => [
              actions.updateProjectBadgeSuccess(payload.id, payload.badge),
              generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA))
    )
  );

export const printWorkerBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.PRINT_WORKER_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE, true)),
        deps.apiService.getPrintableWorkerBadge(payload.badgeId).pipe(
          tap(res => deps.printerService.print(res.newFile)),
          mergeMap(() => EMPTY)
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE))
    )
  );

export const printVisitorBadgeStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.PRINT_VISITOR_BADGE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE, true)),
        deps.apiService.getPrintableVisitorBadge(payload.badgeId).pipe(
          tap(res => deps.printerService.print(res.newFile)),
          mergeMap(() => EMPTY)
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE))
    )
  );

export const fetchBadgeHistoryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_HISTORY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY, true)),
        deps.apiService.getBadgeHistory(payload.id, payload.query).pipe(map(res => actions.fetchBadgeHistorySuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY))
    )
  );

export const epics = [
  fetchBadgeStart,
  activateBadgeStart,
  deactivateBadgeStart,
  revokeBadgeStart,
  fetchProjectBadgeVisitorListStart,
  fetchBadgeVisitorStart,
  saveProjectVisitorBadgeStart,
  assignBadgeVisitorStart,
  unassignBadgeVisitorStart,
  updateBadgeStart,
  printWorkerBadgeStart,
  printVisitorBadgeStart,
  updateVisitorBadgeStart,
  fetchBadgeHistoryStart,
];
