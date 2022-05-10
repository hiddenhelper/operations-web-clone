import { Epic, ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';

import { GeneralModel, UserModel } from '../../models';
import { GENERAL } from '../../../constants';
import { handleError } from '../core/operators';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { generalState } from '../general';
import { actions, ActionType } from './actions';

export const fetchNewBadgesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_NEW_BADGES_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_BADGES, true)),
        deps.apiService.getNewBadges().pipe(map(res => actions.fetchNewBadgesSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_BADGES, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_NEW_BADGES))
    )
  );

export const fetchWorkersActivityStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_ACTIVITY_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS, true)),
        deps.apiService.getWorkersActivityStatistics().pipe(map(res => actions.fetchWorkersActivitySuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS))
    )
  );

export const fetchGrossRevenueStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_GROSS_REVENUE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE, true)),
        deps.apiService.getGrossRevenueStatistics().pipe(map(res => actions.fetchGrossRevenueSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE))
    )
  );

export const fetchProjectStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_STATISTICS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, true)),
        (state$.value.auth.role === UserModel.Role.FCA_ADMIN ? deps.apiService.getProjectStatistics() : deps.apiService.getCompanyProjectStatistics()).pipe(
          map(res => actions.fetchProjectStatisticsSuccess(res))
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS))
    )
  );

export const fetchClientStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_STATISTICS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS, true)),
        deps.apiService.getClientStatistics().pipe(map(res => actions.fetchClientStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS))
    )
  );

export const fetchInventoryStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_INVENTORY_STATISTICS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS, true)),
        deps.apiService.getInventoryStatistics().pipe(map(res => actions.fetchInventoryStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS))
    )
  );

export const fetchInvoiceStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_INVOICE_STATISTICS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS, true)),
        deps.apiService.getInvoiceStatistics().pipe(map(res => actions.fetchInvoiceStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS))
    )
  );

export const fetchWorkerStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_STATISTICS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, true)),
        (state$.value.auth.role === UserModel.Role.FCA_ADMIN ? deps.apiService.getWorkerStatistics() : deps.apiService.getSelfWorkerStatistics()).pipe(
          map(res => actions.fetchWorkerStatisticsSuccess(res))
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS))
    )
  );

export const fetchProjectWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS, true)),
        deps.apiService.getProjectWidgetStatistics(payload.query).pipe(map(res => actions.fetchLinePiestatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS))
    )
  );

export const fetchClientWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS, true)),
        deps.apiService.getClientWidgetStatistics(payload.query).pipe(map(res => actions.fetchPieStatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS))
    )
  );

export const fetchGrossRevenueWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_GROSS_REVENUE_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS, true)),
        deps.apiService.getGrossRevenueWidgetStatistics(payload.query).pipe(map(res => actions.fetchGrossRevenueWidgetStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS))
    )
  );

export const fetchClientRevenueWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS, true)),
        deps.apiService.getClientRevenueWidgetStatistics(payload.query).pipe(map(res => actions.fetchGrossRevenueWidgetStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS))
    )
  );

export const fetchWorkersActivityWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS, true)),
        deps.apiService.getWorkersActivityWidgetStatistics(payload.query).pipe(map(res => actions.fetchLinePiestatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS))
    )
  );

export const fetchNewAssignedWorkersWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS, true)),
        deps.apiService.getNewAssignedWorkersWidgetStatistics(payload.query).pipe(map(res => actions.fetchLinePiestatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS))
    )
  );

export const fetchClientWorkersActivityWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS, true)),
        deps.apiService.getClientWorkersActivityWidgetStatistics(payload.query).pipe(map(res => actions.fetchLinePiestatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS))
    )
  );

export const fetchProjectAccessControlSystemWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_ACS_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS, true)),
        deps.apiService.getProjectAccessControlSystemStatistics(payload.query).pipe(map(res => actions.fetchProjectAcsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS))
    )
  );

export const fetchProjectBadgePrintingSystemWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_BPS_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS, true)),
        deps.apiService.getProjectBadgePrintingSystemStatistics(payload.query).pipe(map(res => actions.fetchProjectBpsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS))
    )
  );

export const fetchProjectWorkersActivityWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_WORKER_ACTIVITY_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS, true)),
        deps.apiService.getProjectWorkersActivityStatistics(payload.query).pipe(map(res => actions.fetchLinePiestatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS))
    )
  );

export const fetchProjectClientsWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_CLIENTS_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS, true)),
        deps.apiService.getProjectClientsStatistics(payload.query).pipe(map(res => actions.fetchPieStatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS))
    )
  );

export const fetchActiveLocationsWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ACTIVE_PROJECTS_STATISTICS_START, ActionType.FETCH_ACTIVE_CLIENTS_STATISTICS_START),
    mergeMap(({ type, payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, true)),
        (type === ActionType.FETCH_ACTIVE_PROJECTS_STATISTICS_START
          ? deps.apiService.getProjectActivesStatistics(payload.query)
          : deps.apiService.getClientActivesStatistics(payload.query)
        ).pipe(map(res => actions.fetchActiveLocationsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS))
    )
  );

export const fetchProjectBadgeLocationWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS, true)),
        deps.apiService.getProjectBadgeLocationStatistics(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS))
    )
  );

export const fetchProjectBadgeProjectWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS, true)),
        deps.apiService.getProjectBadgeProjectStatistics(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS))
    )
  );

export const fetchProjectRevenueWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_REVENUE_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS, true)),
        deps.apiService.getProjectRevenueProjectStatistics(payload.query).pipe(map(res => actions.fetchGrossRevenueWidgetStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS))
    )
  );

export const fetchProjectTopTenWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECTS_TOP_TEN_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS, true)),
        deps.apiService.getProjectTopTenStatistics(payload.query).pipe(map(res => actions.fetchProjectTopTenSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS))
    )
  );

export const fetchWorkersByProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_PROJECT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT, true)),
        deps.apiService.getWorkersByProject(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT))
    )
  );

export const fetchWorkersByClientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_CLIENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT, true)),
        deps.apiService.getWorkersByClient(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT))
    )
  );

export const fetchWorkersByLocationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_LOCATION_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION, true)),
        deps.apiService.getWorkersByLocation(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION))
    )
  );

export const fetchWorkersByJobDataStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_JOB_DATA_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA, true)),
        (payload.filter === GeneralModel.IJobFilter.TRADE
          ? deps.apiService.getWorkersByJobDataByTrades(payload.query)
          : deps.apiService.getWorkersByJobDataByExperience(payload.query)
        ).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA))
    )
  );

export const fetchWorkersByTradesMinorityStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_TRADES_MINORITY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, true)),
        deps.apiService.getWorkersByTradesMinority(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY))
    )
  );

export const fetchWorkersByTradesNonMinorityStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_TRADES_NON_MINORITY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY, true)),
        deps.apiService.getWorkersByTradesNonMinority(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY))
    )
  );

export const fetchWorkersCertificationsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_CERTIFICATIONS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS, true)),
        deps.apiService.getWorkersCertifications(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS))
    )
  );

export const fetchWorkersObservationsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_OBSERVATIONS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS, true)),
        deps.apiService.getWorkersObservations(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS))
    )
  );

export const fetchWorkersByEthnicityStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_ETHNICITY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true)),
        deps.apiService.getWorkersByDemographicDataByEthnicity(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA))
    )
  );

export const fetchWorkersByDemographicDataStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true)),
        (payload.filter === GeneralModel.IDemographicFilter.GENDER
          ? deps.apiService.getWorkersByDemographicDataByGender(payload.query)
          : deps.apiService.getWorkersByDemographicDataByLanguage(payload.query)
        ).pipe(map((res: any) => actions.fetchPieStatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA))
    )
  );

export const fetchWorkersTrainingsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_TRAININGS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS, true)),
        deps.apiService.getWorkersTrainings(payload.query).pipe(map(res => actions.fetchPieStatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS))
    )
  );

export const fetchWorkersNewWorkersStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKERS_NEW_WORKERS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS, true)),
        deps.apiService.getWorkersNewWorkers(payload.query).pipe(map(res => actions.fetchLinePiestatisticsSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS))
    )
  );

export const fetchClientDetailStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_DETAIL_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS, true)),
        deps.apiService.getClientDetailStatistics(payload.id).pipe(map(res => actions.fetchClientDetailStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS))
    )
  );

export const fetchProjectDetailStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_DETAIL_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS, true)),
        deps.apiService.getProjectDetailStatistics(payload.id).pipe(map(res => actions.fetchProjectDetailStatisticsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS))
    )
  );

export const fetchClientsByTradesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENTS_BY_TRADES_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES, true)),
        deps.apiService.getClientsByTrades(payload.query).pipe(map(res => actions.fetchTopTenSuccess(payload.key, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES))
    )
  );

export const fetchClientTopTenWidgetStatisticsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENTS_TOP_TEN_STATISTICS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS, true)),
        deps.apiService.getClientTopTenStatistics(payload.query).pipe(map(res => actions.fetchClientTopTenSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS))
    )
  );

export const epics = [
  fetchNewBadgesStart,
  fetchWorkersActivityStart,
  fetchGrossRevenueStart,
  fetchProjectStatisticsStart,
  fetchClientStatisticsStart,
  fetchInventoryStatisticsStart,
  fetchWorkerStatisticsStart,
  fetchProjectWidgetStatisticsStart,
  fetchClientWidgetStatisticsStart,
  fetchGrossRevenueWidgetStatisticsStart,
  fetchWorkersActivityWidgetStatisticsStart,
  fetchInvoiceStatisticsStart,
  fetchProjectWorkersActivityWidgetStatisticsStart,
  fetchProjectAccessControlSystemWidgetStatisticsStart,
  fetchProjectBadgePrintingSystemWidgetStatisticsStart,
  fetchProjectClientsWidgetStatisticsStart,
  fetchActiveLocationsWidgetStatisticsStart,
  fetchProjectBadgeLocationWidgetStatisticsStart,
  fetchProjectBadgeProjectWidgetStatisticsStart,
  fetchProjectRevenueWidgetStatisticsStart,
  fetchProjectTopTenWidgetStatisticsStart,
  fetchWorkersByProjectStart,
  fetchWorkersByClientStart,
  fetchWorkersByLocationStart,
  fetchWorkersByJobDataStart,
  fetchWorkersByTradesMinorityStart,
  fetchWorkersByTradesNonMinorityStart,
  fetchWorkersCertificationsStart,
  fetchWorkersObservationsStart,
  fetchWorkersByDemographicDataStart,
  fetchWorkersTrainingsStart,
  fetchWorkersNewWorkersStart,
  fetchClientDetailStatisticsStart,
  fetchProjectDetailStatisticsStart,
  fetchClientTopTenWidgetStatisticsStart,
  fetchClientsByTradesStart,
  fetchClientWorkersActivityWidgetStatisticsStart,
  fetchClientRevenueWidgetStatisticsStart,
  fetchNewAssignedWorkersWidgetStatisticsStart,
  fetchWorkersByEthnicityStart,
];
