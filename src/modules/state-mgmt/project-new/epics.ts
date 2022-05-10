import { Epic, ofType } from 'redux-observable';
import { concat, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';
import { generalState } from '../general';
import { GENERAL } from '../../../constants';
import { handleError } from '../core/operators';

export const fetchProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, true)),
        deps.apiService.getProject(payload.id).pipe(map(res => actions.fetchProjectListSuccess([res], 1))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false))
      ).pipe(
        catchError(error => of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false, true, error)))
      )
    )
  );

export const fetchDraftProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_DRAFT_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, true)),
        deps.apiService.getDraftProject(payload.id).pipe(map(res => actions.fetchProjectListSuccess([res], 1))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false))
      ).pipe(
        catchError(error => of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false, true, error)))
      )
    )
  );

export const fetchCategoryListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_CATEGORY_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, true)),
        deps.apiService.getProjectCategories().pipe(map(res => actions.fetchCategoryListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, false, true, error))
        )
      )
    )
  );

export const fetchRegionListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_REGION_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, true)),
        deps.apiService.getFcaRegion().pipe(map(res => actions.fetchRegionListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, false, true, error))
        )
      )
    )
  );

export const fetchFcaNaeListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_FCANAE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, true)),
        deps.apiService.getFcaNae().pipe(map(res => actions.fetchNaeListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, false, true, error))
        )
      )
    )
  );

export const saveProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true)),
        deps.apiService
          .saveProject(payload.project)
          .pipe(mergeMap(res => of(actions.saveProjectSuccess(res), push(`/projects/wizard-new/${res.id}/${payload.stepKey}`, { success: true })))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error.response))
        )
      )
    )
  );

export const updateDraftProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_DRAFT_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true)),
        deps.apiService.updateDraftProject(payload.project).pipe(map(res => actions.updateProjectSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error.response))
        )
      )
    )
  );

export const fetchConsentFormFieldsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CONSENT_FORM_FIELDS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS, true)),
        deps.apiService.getConsentFormFields().pipe(map(res => actions.fetchConsentFormFieldsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS))
    )
  );

export const addProjectBadgesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ADD_PROJECT_BADGES_START),
    mergeMap(({ payload }) => {
      const files = payload.files.reduce(
        (totalUploads, currentFile) => ({
          ...totalUploads,
          [currentFile]: Object.values(state$?.value?.file?.fileMap[currentFile])[0],
        }),
        {}
      );
      return [
        generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGES, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE),
        actions.uploadProjectBadgesStart(payload.projectId, payload.files, files),
        actions.addProjectBadgesSuccess(),
        generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGES, false),
      ];
    })
  );

export const fetchBillingTierListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BILLING_TIER_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, true)),
        deps.apiService.getBillingTiers().pipe(map(res => actions.fetchBillingTierListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, false, true, error))
        )
      )
    )
  );

export const epics = [
  fetchProjectStart,
  fetchDraftProjectStart,
  fetchCategoryListStart,
  fetchRegionListStart,
  fetchFcaNaeListStart,
  saveProjectStart,
  updateDraftProjectStart,
  addProjectBadgesStart,
  fetchBillingTierListStart,
  fetchConsentFormFieldsStart,
];
