import { Epic, ofType } from 'redux-observable';
import { concat, of, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';
import { actions as accessControlSystemActions } from '../access-control-system/actions';
import { generalState } from '../general';
import { GeneralModel, AccessControlSystemModel, ProjectModel } from '../../models';
import { GENERAL } from '../../../constants';
import { getConditionalDefaultValue, isEmpty } from '../../../utils/generalUtils';
import { getProjectBadgeResourceRequest } from '../../../utils/projectUtils';
import { handleError, handleToastError } from '../core/operators';
import { fileState } from '../file';
import { statisticsState } from '../statistics';

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

export const fetchProjectListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_LIST_START),
    mergeMap(({ payload }) => {
      const isFcaUser = state$.value.auth.isFcaUser;
      return concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, true)),
        isFcaUser
          ? deps.apiService.getProjectList(payload.query).pipe(map(res => actions.fetchProjectListSuccess(res.items, res.totalResults)))
          : zip(
              deps.apiService.getProjectList({ ...payload.query, onlyPending: true }),
              deps.apiService.getProjectList({ ...payload.query, onlyPending: false })
            ).pipe(map(res => actions.fetchProjectListSuccess([...res[0].items, ...res[1].items], res[1].totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, false))
      ).pipe(
        catchError(error => of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, false, true, error)))
      );
    })
  );

export const fetchProjectSummaryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_SUMMARY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, true)),
        deps.apiService.getProjectSummary(payload.id).pipe(map(res => actions.updateProjectSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, false, true, error))
        )
      )
    )
  );

export const fetchClientProjectListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_PROJECT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, true)),
        deps.apiService
          .getClientProjectList(payload.id, payload.query)
          .pipe(map(res => actions.fetchClientProjectListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, false, true, error))
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
          .pipe(mergeMap(res => of(actions.saveProjectSuccess(res), push(`/projects/wizard-old/${res.id}/${payload.stepKey}`, { success: true })))),
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
                  `Project created successfully! ${state$.value.project.projectMap[payload.id].name} is pending approval now`,
                  GeneralModel.ToastType.SUCCESS
                )
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
                  `Project approved successfully! ${state$.value.project.projectMap[payload.id].name} is active now`,
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

export const acceptProjectInvitationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ACCEPT_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, true)),
        deps.apiService
          .acceptProjectInvitation(payload.id, payload.paymentMethodId)
          .pipe(
            mergeMap(res =>
              of(push('/projects'), generalState.actions.addToastStart('Project accepted successfully! Welcome aboard!', GeneralModel.ToastType.SUCCESS))
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const deleteProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, true)),
        deps.apiService
          .deleteProject(payload.id)
          .pipe(
            mergeMap(() => [
              payload.query.newPage
                ? push(`/projects?filter="${payload.query.filter}"&page=${payload.query.page - 1}&limit=${payload.query.limit}`)
                : actions.fetchProjectListStart(payload.query),
              statisticsState.actions.fetchProjectStatisticsStart(),
            ])
          ),
        of(generalState.actions.addToastStart(`${state$.value.project.projectMap[payload.id].name} deleted successfully!`, GeneralModel.ToastType.SUCCESS)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, false, true, error),
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

export const assignClientProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ASSIGN_CLIENT_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, true)),
        deps.apiService
          .assignClientProject(payload.id, payload.list, payload.sponsorId)
          .pipe(
            mergeMap(res => [
              actions.assignClientProjectSuccess(payload.list),
              statisticsState.actions.fetchProjectDetailStatisticsStart(payload.id),
              generalState.actions.addToastStart(
                `Subcontractor${payload.list.length > 1 ? 's' : ''} assigned successfully, invitation${payload.list.length > 1 ? 's' : ''} sent!`,
                GeneralModel.ToastType.SUCCESS
              ),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, ['COMPANY_IS_NOT_ASSIGNABLE', 'sponsorId']))
    )
  );

export const assignUserProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ASSIGN_USER_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, true)),
        deps.apiService
          .assignUserProject(payload.id, payload.list)
          .pipe(
            mergeMap(res => [
              actions.assignUserProjectSuccess(payload.list),
              generalState.actions.addToastStart(
                `User${payload.list.length > 1 ? 's' : ''} assigned successfully, invitation${payload.list.length > 1 ? 's' : ''} sent!`,
                GeneralModel.ToastType.SUCCESS
              ),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
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

export const assignWorkerProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ASSIGN_WORKER_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, true)),
        deps.apiService
          .assignWorkerProject(payload.projectId, payload.list)
          .pipe(
            mergeMap(res => [
              actions.assignWorkerProjectSuccess(payload.list),
              statisticsState.actions.fetchProjectDetailStatisticsStart(payload.projectId),
              generalState.actions.addToastStart(
                `Worker${getConditionalDefaultValue(payload.list.length > 1, 's', '')} assigned successfully!`,
                GeneralModel.ToastType.SUCCESS
              ),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT))
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

export const fetchWorkerProjectListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_PROJECT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, true)),
        deps.apiService
          .getWorkerProjectList(payload.id, payload.query)
          .pipe(map(res => actions.fetchWorkerProjectListSuccess(res.items, res.totalResults, payload.id))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, false, true, error))
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

export const uploadProjectBadgeLogosStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_PROJECT_BADGES_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE)),
        deps.apiService.getProjectBadgeResources(payload.projectId, getProjectBadgeResourceRequest(payload.uploadIdList, state$?.value?.file?.fileMap)).pipe(
          mergeMap(response =>
            Object.entries(response) // gcBadgeLogo, scBadgeLogo
              .filter(([logoKey, logoValue]) => !isEmpty(logoValue))
              .map(([fileKey, fileValue]) =>
                fileState.actions.uploadFileStart(
                  payload.fileMap[ProjectModel.projectBadgeResponseMap[fileKey]], // { gcBadgeLogo: File, scBadgeLogo: File }
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

export const fetchBadgeVisitorEntityListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_BADGE_VISITOR_ENTITY_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST, true)),
        deps.apiService.getBadgeVisitorEntity(payload.id).pipe(map(res => actions.fetchBadgeVisitorEntityListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST))
    )
  );

export const searchProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SEARCH_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT, true)),
        deps.apiService.searchProject(payload.query).pipe(map(res => generalState.actions.setRelationUiId(payload.uiRelationId, { searchResult: res }))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT))
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

export const epics = [
  fetchProjectStart,
  fetchDraftProjectStart,
  fetchProjectListStart,
  saveProjectStart,
  updateDraftProjectStart,
  updateProjectStart,
  fetchCategoryListStart,
  fetchRegionListStart,
  fetchFcaNaeListStart,
  fetchClientProjectListStart,
  fetchProjectSummaryStart,
  fetchBillingTierListStart,
  sendApproveProjectStart,
  approveProjectStart,
  deleteProjectStart,
  assignClientProjectStart,
  archiveProjectStart,
  unarchiveProjectStart,
  assignUserProjectStart,
  acceptProjectInvitationStart,
  assignAccessControlSystemProjectStart,
  unassignAccessControlSystemProjectStart,
  assignBadgePrintingSystemProjectStart,
  unassignBadgePrintingSystemProjectStart,
  assignWorkerProjectStart,
  fetchWorkerProjectListStart,
  fetchConsentFormFieldsStart,
  addProjectBadgesStart,
  uploadProjectBadgeLogosStart,
  fetchBadgeVisitorEntityListStart,
  searchProjectStart,
  updateProjectPaymentMethodStart,
];
