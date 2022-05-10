import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.FETCH_NEW_BADGES_SUCCESS:
      return { ...state, newBadges: payload.newBadges };
    case ActionType.FETCH_GROSS_REVENUE_SUCCESS:
      return { ...state, grossRevenue: payload.grossRevenue };
    case ActionType.FETCH_WORKERS_ACTIVITY_SUCCESS:
      return { ...state, workersActivity: payload.workersActivity };
    case ActionType.FETCH_GROSS_REVENUE_WIDGET_STATISTICS_SUCCESS:
      return { ...state, grossRevenueWidgetStatistics: payload.stats };
    case ActionType.CLEAR_STATISTICS:
      return { ...initialState };
    case ActionType.FETCH_PROJECT_STATISTICS_SUCCESS:
      return { ...state, projectStatistics: payload.stats };
    case ActionType.CLEAR_PROJECT_STATISTICS:
      return { ...state, projectStatistics: null };
    case ActionType.FETCH_CLIENT_STATISTICS_SUCCESS:
      return { ...state, clientStatistics: payload.statistics };
    case ActionType.CLEAR_CLIENT_STATISTICS:
      return { ...state, clientStatistics: null };
    case ActionType.FETCH_INVENTORY_STATISTICS_SUCCESS:
      return { ...state, inventoryStatistics: payload.stats };
    case ActionType.FETCH_INVOICE_STATISTICS_SUCCESS:
      return { ...state, invoiceStatistics: payload.stats };
    case ActionType.CLEAR_INVENTORY_STATISTICS:
      return { ...state, inventoryStatistics: null };
    case ActionType.CLEAR_INVOICE_STATISTICS:
      return { ...state, invoiceStatistics: null };
    case ActionType.FETCH_WORKER_STATISTICS_SUCCESS:
      return { ...state, workerStatistics: payload.stats };
    case ActionType.CLEAR_WORKER_STATISTICS:
      return { ...state, workerStatistics: null };
    case ActionType.FETCH_PROJECTS_TOP_TEN_STATISTICS_SUCCESS:
      return { ...state, projectTopTenStatistics: payload.list };
    case ActionType.FETCH_CLIENTS_TOP_TEN_STATISTICS_SUCCESS:
      return { ...state, clientTopTenStatistics: payload.list };
    case ActionType.FETCH_PROJECTS_ACS_STATISTICS_SUCCESS:
      return { ...state, acsProjectStatistics: payload.acsStatistics };
    case ActionType.FETCH_PROJECTS_BPS_STATISTICS_SUCCESS:
      return { ...state, bpsProjectStatistics: payload.bpsStatistics };
    case ActionType.FETCH_ACTIVE_LOCATIONS_STATISTICS_SUCCESS:
      return { ...state, locationStatistics: payload.locationStatistics };
    case ActionType.FETCH_TOP_TEN_STATISTICS_LIST_SUCCESS:
      return {
        ...state,
        topTenStatisticsMap: {
          ...state.topTenStatisticsMap,
          [payload.key]: payload.list,
        },
      };
    case ActionType.FETCH_PIE_STATISTICS_SUCCESS:
      return {
        ...state,
        pieStatisticsMap: {
          ...state.pieStatisticsMap,
          [payload.key]: payload.result,
        },
      };
    case ActionType.FETCH_LINE_PIE_STATISTICS_SUCCESS:
      return {
        ...state,
        linePieStatisticsMap: {
          ...state.linePieStatisticsMap,
          [payload.key]: payload.result,
        },
      };
    case ActionType.FETCH_CLIENT_DETAIL_STATISTICS_SUCCESS:
      return {
        ...state,
        clientDetailStatistics: payload.statistics,
      };
    case ActionType.CLEAR_CLIENT_DETAIL_STATISTICS:
      return {
        ...state,
        clientDetailStatistics: null,
      };
    case ActionType.FETCH_PROJECT_DETAIL_STATISTICS_SUCCESS:
      return {
        ...state,
        projectDetailStatistics: payload.statistics,
      };
    case ActionType.CLEAR_PROJECT_DETAIL_STATISTICS:
      return {
        ...state,
        projectDetailStatistics: null,
      };
    default:
      return state;
  }
};
