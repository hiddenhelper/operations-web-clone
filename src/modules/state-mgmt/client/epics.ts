import { Epic, ofType } from 'redux-observable';
import { of, concat } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { generalState } from '../general';
import { GENERAL } from '../../../constants';
import { ToastType } from '../../models/general';
import { handleError, handleToastError } from '../core/operators';
import { statisticsState } from '../statistics';

export const fetchClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, true)),
        deps.apiService.getClient(payload.id).pipe(map(res => actions.fetchClientListSuccess([res], 1))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT))
    )
  );

export const fetchSelfCompanyStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SELF_COMPANY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY, true)),
        deps.apiService.getClient(state$.value.auth.companyId).pipe(map(res => actions.fetchSelfClientSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY))
    )
  );

export const fetchDraftClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_DRAFT_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, true)),
        deps.apiService.getDraftClient(payload.id).pipe(map(res => actions.fetchClientListSuccess([res], 1))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT))
    )
  );

export const fetchClientListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, true)),
        deps.apiService.getClientList(payload.query).pipe(map(res => actions.fetchClientListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST))
    )
  );

export const fetchUserClientListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_USER_CLIENT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, true)),
        deps.apiService.getProjectClientList(payload.id, payload.query).pipe(map(res => actions.fetchClientListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST))
    )
  );

export const fetchSubContractorListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SUBCONTRACTOR_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST, true)),
        deps.apiService.getClientList(payload.query).pipe(map(res => generalState.actions.setModalMap(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST))
    )
  );

export const fetchClientSummaryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_SUMMARY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY, true)),
        deps.apiService.getClientSummary(payload.id).pipe(map(res => actions.updateClientSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY))
    )
  );

export const fetchMwbeTypesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_MWBE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_MBE_WBE, true)),
        deps.apiService.getMwbeTypes().pipe(map(res => actions.fetchMWbeListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_MBE_WBE, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_MBE_WBE))
    )
  );

export const fetchTradesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_TRADES_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADES, true)),
        deps.apiService.getTrades().pipe(map(res => actions.fetchTradesSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADES, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_TRADES))
    )
  );

export const fetchProjectClientListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_CLIENT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST, true)),
        deps.apiService
          .getProjectClientList(payload.id, payload.query)
          .pipe(map(res => actions.fetchProjectClientListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST))
    )
  );

export const saveClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true)),
        deps.apiService
          .saveClient(payload.client)
          .pipe(
            mergeMap(res =>
              [
                actions.fetchClientListSuccess([res], 1),
                payload.redirect && push(`/clients/wizard/${res.id}/${payload.step.key}`, { success: true }),
                payload.uiRelationId && generalState.actions.setRelationUiId(payload.uiRelationId, { clientId: res.id }),
              ].filter(Boolean)
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false))
      ).pipe(
        handleError(GENERAL.LOADING_KEY.SAVE_CLIENT, error => [
          payload.uiRelationId &&
            error.response.errors.name &&
            generalState.actions.setRelationUiId(payload.uiRelationId, { error: 'Client Name is already in use.' }),
        ])
      )
    )
  );

export const inviteClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.INVITE_DRAFT_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT, true)),
        deps.apiService
          .inviteDraftClient(payload.client)
          .pipe(mergeMap(res => [actions.inviteDraftClientSuccess(res), push(`/clients?filter="onboarding"`, { success: true })].filter(Boolean))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT, false)),
        of(generalState.actions.addToastStart(`Client invited successfully! ${payload.client?.name} is in Invitation Sent now.`, ToastType.SUCCESS))
      ).pipe(handleError(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT))
    )
  );

export const updateDraftClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_DRAFT_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true)),
        deps.apiService.updateDraftClient(payload.client).pipe(map(res => actions.updateDraftClientSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_CLIENT))
    )
  );

export const updateClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_CLIENT, true)),
        deps.apiService.updateClient(payload.client).pipe(map(res => actions.updateClientSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_CLIENT, false)),
        of(generalState.actions.addToastStart('Changes saved successfully!', ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_CLIENT))
    )
  );

export const archiveClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ARCHIVE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, true)),
        deps.apiService.archiveClient(payload.id).pipe(map(() => actions.archiveClientSuccess(payload.id))),
        of(push(`/clients/detail/${payload.id}/information`)),
        of(generalState.actions.addToastStart(`${state$.value.client.clientMap[payload.id].name} archived successfully!`, ToastType.SUCCESS)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, ['COMPANY_IS_ASSIGNED_TO_ACTIVE_PROJECT']))
    )
  );

export const unarchiveClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UNARCHIVE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, true)),
        deps.apiService.unarchiveClient(payload.id).pipe(map(() => actions.unarchiveClientSuccess(payload.id))),
        of(
          push(`/clients/detail/${payload.id}/information`),
          generalState.actions.addToastStart(`${state$.value.client.clientMap[payload.id].name} unarchived successfully!`, ToastType.SUCCESS)
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, []))
    )
  );

export const sendApproveClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SEND_FOR_APPROVE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, true)),
        deps.apiService
          .sendApproveClient(payload.id)
          .pipe(
            mergeMap(() =>
              of(
                push('/clients?filter="pending-approval"'),
                generalState.actions.addToastStart(
                  `Client created successfully! ${state$.value.client.clientMap[payload.id].name} is pending approval now`,
                  ToastType.SUCCESS
                )
              )
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, []))
    )
  );

export const approveClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.APPROVE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_CLIENT, true)),
        deps.apiService
          .approveClient(payload.id)
          .pipe(
            mergeMap(() =>
              of(
                push('/clients?filter="active"'),
                generalState.actions.addToastStart(
                  `Client approved successfully! ${state$.value.client.clientMap[payload.id].name} is active now`,
                  ToastType.SUCCESS
                )
              )
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_CLIENT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.APPROVE_CLIENT, []))
    )
  );

export const deleteClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, true)),
        deps.apiService
          .deleteClient(payload.id)
          .pipe(
            mergeMap(() => [
              payload.query.newPage
                ? push(`/clients?filter="${payload.query.filter}"&page=${payload.query.page - 1}&limit=${payload.query.limit}`)
                : actions.fetchClientListStart(payload.query),
              statisticsState.actions.fetchClientStatisticsStart(),
            ])
          ),
        of(generalState.actions.addToastStart(`${state$.value.client.clientMap[payload.id].name} deleted successfully!`, ToastType.SUCCESS)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.DELETE_CLIENT, ['COMPANY_IS_ASSIGNED_TO_PROJECT']))
    )
  );

export const searchClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SEARCH_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT, true)),
        deps.apiService.searchClient(payload.query).pipe(map(res => generalState.actions.setRelationUiId(payload.uiRelationId, { searchResult: res }))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT))
    )
  );

export const fetchProjectClientHirearchyListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_CLIENT_HIREARCHY_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST, true)),
        deps.apiService.getProjectClientHirearchyList(payload.id).pipe(map(res => actions.fetchProjectClientHirearchyListSuccess(res.items))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST))
    )
  );

export const fetchProjectClientSummaryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_CLIENT_SUMMARY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY, true)),
        deps.apiService
          .getProjectClientSummary(payload.projectId, payload.clientId)
          .pipe(map(res => actions.fetchProjectClientSummarySuccess(payload.projectId, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY))
    )
  );

export const updateProjectClientTaxConditionStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROJECT_CLIENT_TAX_CONDITION_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION, true)),
        deps.apiService
          .updateClientProjectTaxCondition(payload.projectId, payload.taxCondition)
          .pipe(
            map(res => actions.updateProjectClientTaxConditionSuccess(payload.projectId, payload.taxCondition.companyId, payload.taxCondition.isTaxExempt))
          ),
        of(generalState.actions.addToastStart(`Tax Condition updated successfully!`, ToastType.SUCCESS)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION))
    )
  );

export const fetchAdminPermissionStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ADMIN_PERMISSION_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ADMIN_PERMISSION, true)),
        deps.apiService.getAdminPermission(payload.id).pipe(map(res => actions.fetchAdminPermissionSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ADMIN_PERMISSION, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_ADMIN_PERMISSION))
    )
  );

export const epics = [
  fetchClientStart,
  fetchSelfCompanyStart,
  fetchDraftClientStart,
  fetchClientListStart,
  fetchClientSummaryStart,
  fetchMwbeTypesStart,
  fetchTradesStart,
  fetchProjectClientListStart,
  fetchSubContractorListStart,
  fetchUserClientListStart,
  fetchProjectClientHirearchyListStart,
  saveClientStart,
  inviteClientStart,
  updateDraftClientStart,
  sendApproveClientStart,
  approveClientStart,
  searchClientStart,
  deleteClientStart,
  updateClientStart,
  archiveClientStart,
  unarchiveClientStart,
  fetchProjectClientSummaryStart,
  updateProjectClientTaxConditionStart,
  fetchAdminPermissionStart,
];
