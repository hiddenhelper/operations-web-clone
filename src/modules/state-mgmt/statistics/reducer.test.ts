import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import {
  getClientStatistics_1,
  getClientWidgetStatistics_1,
  getInventoryStatistics_1,
  getInvoiceStatistics_1,
  getTodayWidgetStatistiscs_1,
  getProjectStatistics_1,
  getWorkerStatistics_1,
  getTodayWidgetStatistiscs_2,
  getTodayWidgetStatistiscs_3,
  getGrossRevenueWidgetStatistics_1,
  getProjectTopTenStatistics_1,
  getAccessControlSystemWidget_1,
  getBadgePrintingSystemWidget_1,
  getBadgeByProjectWidget_1,
  getProjectWorkersActivityStatistics_1,
  getProjectActiviesWidget_1,
  getClientDetailStatistics_1,
  getProjectDetailStatistics_1,
  getClientTopTenStatistics_1,
} from '../../../test/entities';

describe('statistics reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on statistics ActionType.FETCH_NEW_BADGES_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchNewBadgesSuccess(getTodayWidgetStatistiscs_1()))).toEqual({
      ...initialState,
      newBadges: getTodayWidgetStatistiscs_1(),
    });
  });

  it('should return a new state on statistics ActionType.CLEAR_STATISTICS', () => {
    expect(reducer({ ...initialState, newBadges: getTodayWidgetStatistiscs_1() }, actions.clearStatistics())).toEqual(initialState);
  });

  it('should return a new state on project ActionType.FETCH_PROJECT_STATISTICS_SUCCESS', () => {
    const stats = getProjectStatistics_1();
    expect(reducer(undefined, actions.fetchProjectStatisticsSuccess(stats))).toEqual({ ...initialState, projectStatistics: stats });
  });

  it('should return a new state on project ActionType.CLEAR_PROJECT_STATISTICS', () => {
    expect(reducer(undefined, actions.clearProjectStatistics())).toEqual({ ...initialState, projectStatistics: null });
  });

  it('should return a new state on client ActionType.FETCH_CLIENT_STATISTICS_SUCCESS', () => {
    const stats = getClientStatistics_1();
    expect(reducer(undefined, actions.fetchClientStatisticsSuccess(stats))).toEqual({ ...initialState, clientStatistics: stats });
  });

  it('should return a new state on client ActionType.CLEAR_CLIENT_STATISTICS', () => {
    expect(reducer(undefined, actions.clearClientStatistics())).toEqual({ ...initialState, clientStatistics: null });
  });

  it('should return a new state on inventory ActionType.FETCH_INVENTORY_STATISTICS_SUCCESS', () => {
    const stats = getInventoryStatistics_1();
    expect(reducer(undefined, actions.fetchInventoryStatisticsSuccess(stats))).toEqual({ ...initialState, inventoryStatistics: stats });
  });

  it('should return a new state on inventory ActionType.CLEAR_INVENTORY_STATISTICS', () => {
    expect(reducer(undefined, actions.clearInventoryStatistics())).toEqual({ ...initialState, inventoryStatistics: null });
  });

  it('should return a new state on worker ActionType.FETCH_WORKER_STATISTICS_SUCCESS', () => {
    const stats = getWorkerStatistics_1();
    expect(reducer(undefined, actions.fetchWorkerStatisticsSuccess(stats))).toEqual({ ...initialState, workerStatistics: stats });
  });

  it('should return a new state on worker ActionType.CLEAR_WORKER_STATISTICS', () => {
    expect(reducer(undefined, actions.clearWorkerStatistics())).toEqual({ ...initialState, workerStatistics: null });
  });

  it('should return a new state on statistics ActionType.FETCH_GROSS_REVENUE_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchGrossRevenueSuccess(getTodayWidgetStatistiscs_2()))).toEqual({
      ...initialState,
      grossRevenue: getTodayWidgetStatistiscs_2(),
    });
  });

  it('should return a new state on statistics ActionType.FETCH_WORKERS_ACTIVITY_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchWorkersActivitySuccess(getTodayWidgetStatistiscs_3()))).toEqual({
      ...initialState,
      workersActivity: getTodayWidgetStatistiscs_3(),
    });
  });

  it('should return a new state on statistics ActionType.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchGrossRevenueWidgetStatisticsSuccess(getGrossRevenueWidgetStatistics_1()))).toEqual({
      ...initialState,
      grossRevenueWidgetStatistics: getGrossRevenueWidgetStatistics_1(),
    });
  });

  it('should return a new state on worker ActionType.FETCH_INVOICE_STATISTICS_SUCCESS', () => {
    const stats = getInvoiceStatistics_1();
    expect(reducer(undefined, actions.fetchInvoiceStatisticsSuccess(stats))).toEqual({ ...initialState, invoiceStatistics: stats });
  });

  it('should return a new state on worker ActionType.CLEAR_INVOICE_STATISTICS', () => {
    expect(reducer(undefined, actions.clearInvoiceStatistics())).toEqual({ ...initialState, invoiceStatistics: null });
  });

  it('should return a new state on worker ActionType.FETCH_PROJECTS_TOP_TEN_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectTopTenSuccess(getProjectTopTenStatistics_1().projects))).toEqual({
      ...initialState,
      projectTopTenStatistics: getProjectTopTenStatistics_1().projects,
    });
  });

  it('should return a new state on worker ActionType.FETCH_PROJECTS_ACS_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectAcsSuccess(getAccessControlSystemWidget_1()))).toEqual({
      ...initialState,
      acsProjectStatistics: getAccessControlSystemWidget_1(),
    });
  });

  it('should return a new state on worker ActionType.FETCH_PROJECTS_BPS_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectBpsSuccess(getBadgePrintingSystemWidget_1()))).toEqual({
      ...initialState,
      bpsProjectStatistics: getBadgePrintingSystemWidget_1(),
    });
  });

  it('should return a new state on worker ActionType.FETCH_TOP_TEN_STATISTICS_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()))).toEqual({
      ...initialState,
      topTenStatisticsMap: { key: getBadgeByProjectWidget_1() },
    });
  });

  it('should return a new state on worker ActionType.FETCH_PIE_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchPieStatisticsSuccess('key', getClientWidgetStatistics_1()))).toEqual({
      ...initialState,
      pieStatisticsMap: { key: getClientWidgetStatistics_1() },
    });
  });

  it('should return a new state on worker ActionType.FETCH_LINE_PIE_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchLinePiestatisticsSuccess('key', getProjectWorkersActivityStatistics_1()))).toEqual({
      ...initialState,
      linePieStatisticsMap: { key: getProjectWorkersActivityStatistics_1() },
    });
  });

  it('should return a new state on worker ActionType.FETCH_ACTIVE_LOCATIONS_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchActiveLocationsSuccess(getProjectActiviesWidget_1()))).toEqual({
      ...initialState,
      locationStatistics: getProjectActiviesWidget_1(),
    });
  });

  it('should return a new state on worker ActionType.FETCH_CLIENT_DETAIL_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchClientDetailStatisticsSuccess(getClientDetailStatistics_1()))).toEqual({
      ...initialState,
      clientDetailStatistics: getClientDetailStatistics_1(),
    });
  });

  it('should return a new state on worker ActionType.CLEAR_CLIENT_DETAIL_STATISTICS', () => {
    expect(reducer(undefined, actions.clearClientDetailStatistics())).toEqual({
      ...initialState,
      clientDetailStatistics: null,
    });
  });

  it('should return a new state on worker ActionType.FETCH_PROJECT_DETAIL_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectDetailStatisticsSuccess(getProjectDetailStatistics_1()))).toEqual({
      ...initialState,
      projectDetailStatistics: getProjectDetailStatistics_1(),
    });
  });

  it('should return a new state on worker ActionType.CLEAR_PROJECT_DETAIL_STATISTICS', () => {
    expect(reducer(undefined, actions.clearProjectDetailStatistics())).toEqual({
      ...initialState,
      projectDetailStatistics: null,
    });
  });

  it('should return a new state on worker ActionType.FETCH_CLIENTS_TOP_TEN_STATISTICS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchClientTopTenSuccess(getClientTopTenStatistics_1().clients))).toEqual({
      ...initialState,
      clientTopTenStatistics: getClientTopTenStatistics_1().clients,
    });
  });
});
