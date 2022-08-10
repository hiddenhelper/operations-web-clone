import { Epic, ofType } from 'redux-observable';
import { concat, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';
import { generalState } from '../general';
import { fileState } from '../file';
import { GENERAL } from '../../../constants';
import { actions as accessControlSystemActions } from '../access-control-system/actions';
import { handleToastError, handleError } from '../core/operators';
import { isEmpty } from '../../../utils/generalUtils';
import { getProjectBadgeResourceRequest } from '../../../utils/projectUtils';
import { GeneralModel, AccessControlSystemModel } from 'modules/models';

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
          .pipe(mergeMap(res => of(actions.saveProjectSuccess(res), push(`/projects/wizard/${res.id}/${payload.stepKey}`, { success: true })))),
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
        actions.uploadProjectBadgesStart(payload.projectId, payload.files, files, payload.restOfFiles),
        actions.addProjectBadgesSuccess(),
        generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGES, false),
      ];
    })
  );

export const uploadProjectBadgeLogosStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_PROJECT_BADGES_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE)),
        deps.apiService
          .getProjectBadgeResources(payload.projectId, getProjectBadgeResourceRequest(payload.uploadIdList, state$?.value?.file?.fileMap, payload.restOfFiles))
          .pipe(
            mergeMap(response =>
              Object.entries(response) // gcBadgeLogo, scBadgeLogo
                .filter(([logoKey, logoValue]) => !isEmpty(logoValue) && payload?.fileMap[logoKey])
                .map(([fileKey, fileValue]) =>
                  fileState.actions.uploadFileStart(
                    payload.fileMap[fileKey], // { gcBadgeLogo: File, scBadgeLogo: File }
                    fileValue.url,
                    fileValue.fileId,
                    GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE
                  )
                )
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES))
    )
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

export const sendApproveProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SEND_FOR_APPROVE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, true)),
        deps.apiService
          .sendApproveProject(payload.id)
          .pipe(
            mergeMap(() =>
              of(
                push('/projects?filter="pending-approval"'),
                generalState.actions.addToastStart(
                  `Project created successfully! ${state$.value.projectNew.projectMap[payload.id].name} is pending approval now`,
                  GeneralModel.ToastType.SUCCESS
                ),
                actions.fetchDraftProjectStart(payload.id)
              )
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, false, true, error),
            generalState.actions.addToastStart(
              error.response?.errors?.relatedCompanies ? error.response.errors.relatedCompanies[0] : error.title,
              GeneralModel.ToastType.ERROR
            )
          )
        )
      )
    )
  );

export const approveProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.APPROVE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, true)),
        deps.apiService
          .approveProject(payload.id)
          .pipe(
            mergeMap(() =>
              of(
                push('/projects?filter="active"'),
                generalState.actions.addToastStart(
                  `Project approved successfully! ${state$.value.projectNew.projectMap[payload.id].name} is active now`,
                  GeneralModel.ToastType.SUCCESS
                )
              )
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const archiveProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ARCHIVE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, true)),
        deps.apiService.archiveProject(payload.id).pipe(map(() => actions.archiveProjectSuccess(payload.id))),
        of(push(`/projects/detail/${payload.id}/information`)),
        of(generalState.actions.addToastStart(`${state$.value.project.projectMap[payload.id].name} archived successfully!`, GeneralModel.ToastType.SUCCESS)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const unarchiveProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UNARCHIVE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, true)),
        deps.apiService.unarchiveProject(payload.id).pipe(map(() => actions.unarchiveProjectSuccess(payload.id))),
        of(push(`/projects/detail/${payload.id}/information`)),
        of(generalState.actions.addToastStart(`${state$.value.project.projectMap[payload.id].name} unarchived successfully!`, GeneralModel.ToastType.SUCCESS)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, false, true, error),
            generalState.actions.addToastStart(
              error.response?.errors?.relatedCompanies ? error.response.errors.relatedCompanies[0] : error.title,
              GeneralModel.ToastType.ERROR
            )
          )
        )
      )
    )
  );

export const updateProjectPaymentMethodStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROJECT_PAYMENT_METHOD_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD, true)),
        deps.apiService
          .updateProjectPaymentMethod(payload.projectId, payload.paymentMethodId)
          .pipe(map(res => generalState.actions.addToastStart(`Payment Method updated successfully!`, GeneralModel.ToastType.SUCCESS))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD))
    )
  );

export const updateProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true)),
        deps.apiService.updateProject(payload.project).pipe(map(res => actions.updateProjectSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false)),
        of(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error.response))
        )
      )
    )
  );

export const assignAccessControlSystemProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, true)),
        deps.apiService
          .assignAcsProject(payload.projectId, payload.acs)
          .pipe(map(res => generalState.actions.addToastStart(`ACS assigned successfully!`, GeneralModel.ToastType.SUCCESS))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT))
    )
  );

export const assignBadgePrintingSystemProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, true)),
        deps.apiService
          .assignBadgePrintingSystemProject(payload.projectId, payload.list)
          .pipe(
            mergeMap(res => [
              actions.assignBadgePrintingProjectSuccess(payload.list),
              generalState.actions.addToastStart(`BPS assigned successfully!`, GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT))
    )
  );

export const unassignAccessControlSystemProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, true)),
        deps.apiService
          .unAssignAccessControlSystemProject(payload.projectId, payload.acsId)
          .pipe(
            mergeMap(res => [
              actions.unAssignAccessControlSystemSuccess(payload.projectId, payload.acsId),
              accessControlSystemActions.unassignAccessControlSystemProjectSuccess(payload.acsId),
              generalState.actions.addToastStart(
                `${
                  AccessControlSystemModel.accessControlSystemTypeMap[state$.value.accessControlSystem.accessControlSystemMap[payload.acsId].type]
                } unassigned successfully!`,
                GeneralModel.ToastType.SUCCESS
              ),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT))
    )
  );

export const unassignBadgePrintingSystemProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, true)),
        deps.apiService
          .unAssignBadgePrintingSystemProject(payload.projectId, payload.id)
          .pipe(
            mergeMap(res => [
              actions.unAssignBadgePrintingSystemSuccess(payload.projectId, payload.id),
              generalState.actions.addToastStart(
                `${state$.value.badgePrinterSystem.badgePrinterSystemMap[payload.id].name} unassigned successfully!`,
                GeneralModel.ToastType.SUCCESS
              ),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT))
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
  uploadProjectBadgeLogosStart,
  sendApproveProjectStart,
  approveProjectStart,
  archiveProjectStart,
  unarchiveProjectStart,
  updateProjectPaymentMethodStart,
  updateProjectStart,
  assignAccessControlSystemProjectStart,
  assignBadgePrintingSystemProjectStart,
  unassignAccessControlSystemProjectStart,
  unassignBadgePrintingSystemProjectStart,
];
