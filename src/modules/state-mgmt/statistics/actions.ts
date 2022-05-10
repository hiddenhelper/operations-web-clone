import { GeneralModel, StatisticsModel } from '../../models';

export enum ActionType {
  FETCH_NEW_BADGES_START = '[statistics] fetch new badges start',
  FETCH_NEW_BADGES_SUCCESS = '[statistics] fetch new badges success',
  FETCH_WORKERS_ACTIVITY_START = '[statistics] fetch workers activity start',
  FETCH_WORKERS_ACTIVITY_SUCCESS = '[statistics] fetch workers activity success',
  FETCH_GROSS_REVENUE_START = '[statistics] fetch gross revenue start',
  FETCH_GROSS_REVENUE_SUCCESS = '[statistics] fetch gross revenue success',
  CLEAR_STATISTICS = '[statistics] clear statistics',
  FETCH_PROJECT_STATISTICS_START = '[statistics] fetch project statistics start',
  FETCH_PROJECT_STATISTICS_SUCCESS = '[statistics] fetch project statistics success',
  CLEAR_PROJECT_STATISTICS = '[statistics] clear project statistics',
  FETCH_CLIENT_STATISTICS_START = '[statistics] fetch client statistics start',
  FETCH_CLIENT_STATISTICS_SUCCESS = '[statistics] fetch client statistics success',
  CLEAR_CLIENT_STATISTICS = '[statistics] clear client statistics',
  FETCH_INVENTORY_STATISTICS_START = '[statistics] fetch inventory statistics start',
  FETCH_INVENTORY_STATISTICS_SUCCESS = '[statistics] fetch inventory statistics success',
  CLEAR_INVENTORY_STATISTICS = '[statistics] clear inventory statistics',
  FETCH_WORKER_STATISTICS_START = '[statistics] fetch worker statistics start',
  FETCH_WORKER_STATISTICS_SUCCESS = '[statistics] fetch worker statistics success',
  FETCH_PROJECT_WIDGET_STATISTICS_START = '[statistics] fetch project widget statistics start',
  FETCH_CLIENT_WIDGET_STATISTICS_START = '[statistics] fetch client widget statistics start',
  FETCH_CLIENT_REVENUE_WIDGET_STATISTICS_START = '[statistics] fetch client revenue widget statistics start',
  FETCH_GROSS_REVENUE_WIDGET_STATISTICS_START = '[statistics] fetch gross revenue widget statistics start',
  FETCH_GROSS_REVENUE_WIDGET_STATISTICS_SUCCESS = '[statistics] fetch revenue widget statistics success',
  FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS_START = '[statistics] fetch new assigned workers widget statistics start',
  FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS_START = '[statistics] fetch new workers widget statistics start',
  FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS_START = '[statistics] fetch client new workers widget statistics start',
  CLEAR_WORKER_STATISTICS = '[statistics] clear worker statistics',
  FETCH_INVOICE_STATISTICS_START = '[statistics] fetch invoice statistics start',
  FETCH_INVOICE_STATISTICS_SUCCESS = '[statistics] fetch invoice statistics success',
  CLEAR_INVOICE_STATISTICS = '[statistics] clear invoice statistics',
  FETCH_ACTIVE_CLIENTS_STATISTICS_START = '[statistics] fetch active clients statistics start',
  FETCH_ACTIVE_PROJECTS_STATISTICS_START = '[statistics] fetch active projects statistics start',
  FETCH_ACTIVE_LOCATIONS_STATISTICS_SUCCESS = '[statistics] fetch active locations statistics success',
  FETCH_PROJECTS_REVENUE_STATISTICS_START = '[statistics] fetch projects revenue statistics start',
  FETCH_PROJECTS_WORKER_ACTIVITY_STATISTICS_START = '[statistics] fetch worker activity statistics start',
  FETCH_PROJECTS_CLIENTS_STATISTICS_START = '[statistics] fetch clients statistics start',
  FETCH_PROJECTS_BAGE_LOCATION_STATISTICS_START = '[statistics] fetch badge location statistics start',
  FETCH_PROJECTS_BAGE_PROJECT_STATISTICS_START = '[statistics] fetch badge project statistics start',
  FETCH_PROJECTS_ACS_STATISTICS_START = '[statistics] fetch acs statistics start',
  FETCH_PROJECTS_ACS_STATISTICS_SUCCESS = '[statistics] fetch acs statistics success',
  FETCH_PROJECTS_BPS_STATISTICS_START = '[statistics] fetch bps statistics start',
  FETCH_PROJECTS_BPS_STATISTICS_SUCCESS = '[statistics] fetch bps statistics success',
  FETCH_PROJECTS_TOP_TEN_STATISTICS_START = '[statistics] fetch projects top ten statistics start',
  FETCH_PROJECTS_TOP_TEN_STATISTICS_SUCCESS = '[statistics] fetch projects top ten statistics success',
  FETCH_WORKERS_BY_PROJECT_START = '[statistics] fetch workers by project start',
  FETCH_WORKERS_BY_CLIENT_START = '[statistics] fetch workers by client start',
  FETCH_WORKERS_BY_LOCATION_START = '[statistics] fetch workers by location start',
  FETCH_WORKERS_BY_JOB_DATA_START = '[statistics] fetch workers by job data start',
  FETCH_WORKERS_BY_TRADES_MINORITY_START = '[statistics] fetch workers by trades minority start',
  FETCH_WORKERS_BY_TRADES_NON_MINORITY_START = '[statistics] fetch workers by trades non minority start',
  FETCH_WORKERS_BY_DEMOGRAPHIC_DATA_START = '[statistics] fetch workers by demographic data start',
  FETCH_WORKERS_BY_ETHNICITY_START = '[statistics] fetch workers by ethnicity start',
  FETCH_WORKERS_TRAININGS_START = '[statistics] fetch workers trainigs start',
  FETCH_WORKERS_CERTIFICATIONS_START = '[statistics] fetch workers certifications start',
  FETCH_WORKERS_OBSERVATIONS_START = '[statistics] fetch workers observations start',
  FETCH_WORKERS_NEW_WORKERS_START = '[statistics] fetch workers new workers start',
  FETCH_TOP_TEN_STATISTICS_LIST_SUCCESS = '[statistics] fetch top ten statistics list success',
  FETCH_PIE_STATISTICS_SUCCESS = '[statistics] fetch pie statistics success',
  FETCH_LINE_PIE_STATISTICS_SUCCESS = '[statistics] fetch line pie statistics success',
  FETCH_CLIENT_DETAIL_STATISTICS_START = '[statistics] fetch client detail statistics start',
  FETCH_CLIENT_DETAIL_STATISTICS_SUCCESS = '[statistics] fetch client detail statistics success',
  CLEAR_CLIENT_DETAIL_STATISTICS = '[statistics] clear client detail statistics',
  FETCH_PROJECT_DETAIL_STATISTICS_START = '[statistics] fetch project detail statistics start',
  FETCH_PROJECT_DETAIL_STATISTICS_SUCCESS = '[statistics] fetch project detail statistics success',
  CLEAR_PROJECT_DETAIL_STATISTICS = '[statistics] clear project detail statistics',
  FETCH_CLIENTS_TOP_TEN_STATISTICS_START = '[statistics] fetch clients top ten statistics start',
  FETCH_CLIENTS_TOP_TEN_STATISTICS_SUCCESS = '[statistics] fetch clients top ten statistics success',
  FETCH_CLIENTS_BY_TRADES_START = '[statistics] fetch clients by trades start',
}

export const actions = {
  fetchNewBadgesStart: () => ({ type: ActionType.FETCH_NEW_BADGES_START, payload: {} }),
  fetchNewBadgesSuccess: (newBadges: StatisticsModel.ITodayWidgetStatistics) => ({ type: ActionType.FETCH_NEW_BADGES_SUCCESS, payload: { newBadges } }),
  fetchWorkersActivityStart: () => ({ type: ActionType.FETCH_WORKERS_ACTIVITY_START, payload: {} }),
  fetchWorkersActivitySuccess: (workersActivity: StatisticsModel.ITodayWidgetStatistics) => ({
    type: ActionType.FETCH_WORKERS_ACTIVITY_SUCCESS,
    payload: { workersActivity },
  }),
  fetchGrossRevenueStart: () => ({ type: ActionType.FETCH_GROSS_REVENUE_START, payload: {} }),
  fetchGrossRevenueSuccess: (grossRevenue: StatisticsModel.ITodayWidgetStatistics) => ({
    type: ActionType.FETCH_GROSS_REVENUE_SUCCESS,
    payload: { grossRevenue },
  }),
  clearStatistics: () => ({ type: ActionType.CLEAR_STATISTICS, payload: {} }),
  fetchProjectStatisticsStart: () => ({ type: ActionType.FETCH_PROJECT_STATISTICS_START, payload: {} }),
  fetchProjectStatisticsSuccess: (stats: StatisticsModel.IResourceStatistics) => ({ type: ActionType.FETCH_PROJECT_STATISTICS_SUCCESS, payload: { stats } }),
  clearProjectStatistics: () => ({ type: ActionType.CLEAR_PROJECT_STATISTICS, payload: {} }),
  fetchClientStatisticsStart: () => ({ type: ActionType.FETCH_CLIENT_STATISTICS_START, payload: {} }),
  fetchClientStatisticsSuccess: (statistics: StatisticsModel.IResourceStatistics) => ({
    type: ActionType.FETCH_CLIENT_STATISTICS_SUCCESS,
    payload: { statistics },
  }),
  clearClientStatistics: () => ({ type: ActionType.CLEAR_CLIENT_STATISTICS, payload: {} }),
  fetchInventoryStatisticsStart: () => ({ type: ActionType.FETCH_INVENTORY_STATISTICS_START, payload: {} }),
  fetchInventoryStatisticsSuccess: (stats: StatisticsModel.IInventoryStatistics) => ({
    type: ActionType.FETCH_INVENTORY_STATISTICS_SUCCESS,
    payload: { stats },
  }),
  clearInventoryStatistics: () => ({ type: ActionType.CLEAR_INVENTORY_STATISTICS, payload: {} }),
  fetchWorkerStatisticsStart: () => ({ type: ActionType.FETCH_WORKER_STATISTICS_START, payload: {} }),
  fetchWorkerStatisticsSuccess: (stats: StatisticsModel.IWorkerStatistics) => ({ type: ActionType.FETCH_WORKER_STATISTICS_SUCCESS, payload: { stats } }),
  fetchProjectWidgetStatisticsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECT_WIDGET_STATISTICS_START,
    payload: { key, query },
  }),
  fetchClientWidgetStatisticsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_CLIENT_WIDGET_STATISTICS_START,
    payload: { key, query },
  }),
  fetchClientRevenueWidgetStatisticsStart: (query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS_START,
    payload: { query },
  }),
  fetchGrossRevenueWidgetStatisticsStart: (query: GeneralModel.IQueryParams = {}) => ({
    type: ActionType.FETCH_GROSS_REVENUE_WIDGET_STATISTICS_START,
    payload: { query },
  }),
  fetchGrossRevenueWidgetStatisticsSuccess: (stats: StatisticsModel.ILineWidgetStatistics) => ({
    type: ActionType.FETCH_GROSS_REVENUE_WIDGET_STATISTICS_SUCCESS,
    payload: { stats },
  }),
  fetchWorkersActivityWidgetStatisticsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS_START,
    payload: { key, query },
  }),
  fetchNewAssignedWorkersWidgetStatisticsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS_START,
    payload: { key, query },
  }),
  fetchClientWorkersActivityWidgetStatisticsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS_START,
    payload: { key, query },
  }),
  clearWorkerStatistics: () => ({ type: ActionType.CLEAR_WORKER_STATISTICS, payload: {} }),
  fetchInvoiceStatisticsStart: () => ({ type: ActionType.FETCH_INVOICE_STATISTICS_START, payload: {} }),
  fetchInvoiceStatisticsSuccess: (stats: StatisticsModel.IInvoiceStatistics) => ({ type: ActionType.FETCH_INVOICE_STATISTICS_SUCCESS, payload: { stats } }),
  clearInvoiceStatistics: () => ({ type: ActionType.CLEAR_INVOICE_STATISTICS, payload: {} }),
  fetchActiveClientsStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_ACTIVE_CLIENTS_STATISTICS_START, payload: { query } }),
  fetchActiveProjectsStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_ACTIVE_PROJECTS_STATISTICS_START, payload: { query } }),
  fetchActiveLocationsSuccess: (locationStatistics: StatisticsModel.ILocationStatistics) => ({
    type: ActionType.FETCH_ACTIVE_LOCATIONS_STATISTICS_SUCCESS,
    payload: { locationStatistics },
  }),
  fetchProjectsRevenueStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_PROJECTS_REVENUE_STATISTICS_START, payload: { query } }),
  fetchProjectClientsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECTS_CLIENTS_STATISTICS_START,
    payload: { key, query },
  }),
  fetchBadgeLocationStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS_START,
    payload: { key, query },
  }),
  fetchBadgeProjectStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS_START,
    payload: { key, query },
  }),
  fetchProjectWorkersActivityStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECTS_WORKER_ACTIVITY_STATISTICS_START,
    payload: { key, query },
  }),
  fetchProjectAcsStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_PROJECTS_ACS_STATISTICS_START, payload: { query } }),
  fetchProjectAcsSuccess: (acsStatistics: StatisticsModel.IAcsSummaryStatistics) => ({
    type: ActionType.FETCH_PROJECTS_ACS_STATISTICS_SUCCESS,
    payload: { acsStatistics },
  }),
  fetchProjectBpsStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_PROJECTS_BPS_STATISTICS_START, payload: { query } }),
  fetchProjectBpsSuccess: (bpsStatistics: StatisticsModel.IDeviceStatistics) => ({
    type: ActionType.FETCH_PROJECTS_BPS_STATISTICS_SUCCESS,
    payload: { bpsStatistics },
  }),
  fetchProjectTopTenStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_PROJECTS_TOP_TEN_STATISTICS_START, payload: { query } }),
  fetchProjectTopTenSuccess: (list: StatisticsModel.IProjectTopTenStatistics[]) => ({
    type: ActionType.FETCH_PROJECTS_TOP_TEN_STATISTICS_SUCCESS,
    payload: { list },
  }),
  fetchClientTopTenStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_CLIENTS_TOP_TEN_STATISTICS_START, payload: { query } }),
  fetchClientTopTenSuccess: (list: StatisticsModel.IClientTopTenStatistics[]) => ({
    type: ActionType.FETCH_CLIENTS_TOP_TEN_STATISTICS_SUCCESS,
    payload: { list },
  }),
  fetchWorkersNewWorkersStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_NEW_WORKERS_START,
    payload: { key, query },
  }),
  fetchLinePiestatisticsSuccess: (key: string, result: StatisticsModel.ILinePieWidgetStatistics) => ({
    type: ActionType.FETCH_LINE_PIE_STATISTICS_SUCCESS,
    payload: { key, result },
  }),

  fetchWorkersByDemographicDataStart: (key: string, query: GeneralModel.IQueryParams, filter: GeneralModel.IDemographicFilter) => ({
    type: ActionType.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA_START,
    payload: { key, query, filter },
  }),
  fetchWorkersByEthnicityStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_BY_ETHNICITY_START,
    payload: { key, query },
  }),
  fetchWorkersTrainingsStart: (key: string, query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_WORKERS_TRAININGS_START, payload: { key, query } }),
  fetchPieStatisticsSuccess: (key: string, result: StatisticsModel.IPieWidgetStatistics) => ({
    type: ActionType.FETCH_PIE_STATISTICS_SUCCESS,
    payload: { key, result },
  }),

  fetchWorkersByProjectStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_BY_PROJECT_START,
    payload: { key, query },
  }),
  fetchWorkersByClientStart: (key: string, query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_WORKERS_BY_CLIENT_START, payload: { key, query } }),
  fetchWorkersByLocationStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_BY_LOCATION_START,
    payload: { key, query },
  }),
  fetchWorkersByJobDataStart: (key: string, query: GeneralModel.IQueryParams, filter: GeneralModel.IJobFilter) => ({
    type: ActionType.FETCH_WORKERS_BY_JOB_DATA_START,
    payload: { key, query, filter },
  }),
  fetchWorkersByTradesMinorityStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_BY_TRADES_MINORITY_START,
    payload: { key, query },
  }),
  fetchWorkersByTradesNonMinorityStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_BY_TRADES_NON_MINORITY_START,
    payload: { key, query },
  }),
  fetchClientsByTradesStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_CLIENTS_BY_TRADES_START,
    payload: { key, query },
  }),
  fetchWorkersCertificationsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_CERTIFICATIONS_START,
    payload: { key, query },
  }),
  fetchWorkersObservationsStart: (key: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKERS_OBSERVATIONS_START,
    payload: { key, query },
  }),
  fetchTopTenSuccess: (key: string, list: StatisticsModel.ITopTenStatistics[]) => ({
    type: ActionType.FETCH_TOP_TEN_STATISTICS_LIST_SUCCESS,
    payload: { key, list },
  }),
  fetchClientDetailStatisticsStart: (id: string) => ({
    type: ActionType.FETCH_CLIENT_DETAIL_STATISTICS_START,
    payload: { id },
  }),
  fetchClientDetailStatisticsSuccess: (statistics: StatisticsModel.IClientDetailStatistics) => ({
    type: ActionType.FETCH_CLIENT_DETAIL_STATISTICS_SUCCESS,
    payload: { statistics },
  }),
  clearClientDetailStatistics: () => ({
    type: ActionType.CLEAR_CLIENT_DETAIL_STATISTICS,
    payload: {},
  }),
  fetchProjectDetailStatisticsStart: (id: string) => ({
    type: ActionType.FETCH_PROJECT_DETAIL_STATISTICS_START,
    payload: { id },
  }),
  fetchProjectDetailStatisticsSuccess: (statistics: StatisticsModel.IProjectDetailStatistics) => ({
    type: ActionType.FETCH_PROJECT_DETAIL_STATISTICS_SUCCESS,
    payload: { statistics },
  }),
  clearProjectDetailStatistics: () => ({
    type: ActionType.CLEAR_PROJECT_DETAIL_STATISTICS,
    payload: {},
  }),
};
