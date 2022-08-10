import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { IEpicDependencies } from '../rootState';
import { UserModel } from '../../models';
import { getDeps } from '../../../test/epicDependencies';
import {
  getClientStatistics_1,
  getInventoryStatistics_1,
  getTodayWidgetStatistiscs_1,
  getProjectStatistics_1,
  getWorkerStatistics_1,
  getProjectWidgetStatistics_1,
  getClientWidgetStatistics_1,
  getTodayWidgetStatistiscs_2,
  getTodayWidgetStatistiscs_3,
  getGrossRevenueWidgetStatistics_1,
  getWorkersActivityWidgetStatistics_1,
  getInvoiceStatistics_1,
  getBadgePrintingSystemWidget_1,
  getAccessControlSystemWidget_1,
  getProjectWorkersActivityStatistics_1,
  getProjectClientsWidget_1,
  getProjectActiviesWidget_1,
  getBadgeByLocationWidget_1,
  getBadgeByProjectWidget_1,
  getProjectRevenueProjectStatistics_1,
  getProjectTopTenStatistics_1,
  getClientDetailStatistics_1,
  getProjectDetailStatistics_1,
  getClientTopTenStatistics_1,
} from '../../../test/entities';
import { runEpic } from '../../../test/runEpic';
import { actions } from './actions';
import { generalState } from '../general';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import {
  fetchClientStatisticsStart,
  fetchNewBadgesStart,
  fetchGrossRevenueStart,
  fetchWorkersActivityStart,
  fetchProjectStatisticsStart,
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
  fetchClientsByTradesStart,
  fetchClientTopTenWidgetStatisticsStart,
  fetchClientWorkersActivityWidgetStatisticsStart,
  fetchClientRevenueWidgetStatisticsStart,
  fetchNewAssignedWorkersWidgetStatisticsStart,
  fetchWorkersByEthnicityStart,
} from './epics';
import { IJobFilter } from 'modules/models/general';

describe('statistics epics', () => {
  let deps: IEpicDependencies;
  let error;
  let stateMgmtAdmin = { value: { auth: { role: UserModel.Role.FCA_ADMIN } } };
  let stateMgmtClient = { value: { auth: { role: UserModel.Role.CLIENT_ADMIN } } };

  let errorResponse = { title: 'scary error' };

  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });

  describe('fetchNewBadgesStart', () => {
    it('should get epic for statistics fetch new badges', () => {
      return runEpic(fetchNewBadgesStart(ActionsObservable.of(actions.fetchNewBadgesStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_BADGES, true));
        expect(deps.apiService.getNewBadges).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchNewBadgesSuccess(getTodayWidgetStatistiscs_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_BADGES, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getNewBadges = () => throwError(error);
      return runEpic(fetchNewBadgesStart(ActionsObservable.of(actions.fetchNewBadgesStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_BADGES, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_BADGES, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersActivityStart', () => {
    it('should get epic for statistics fetch workers activity', () => {
      return runEpic(fetchWorkersActivityStart(ActionsObservable.of(actions.fetchWorkersActivityStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS, true));
        expect(deps.apiService.getWorkersActivityStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkersActivitySuccess(getTodayWidgetStatistiscs_3()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersActivityStatistics = () => throwError(error);
      return runEpic(fetchWorkersActivityStart(ActionsObservable.of(actions.fetchWorkersActivityStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchGrossRevenueStart', () => {
    it('should get epic for statistics fetch gross revenue', () => {
      return runEpic(fetchGrossRevenueStart(ActionsObservable.of(actions.fetchGrossRevenueStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE, true));
        expect(deps.apiService.getGrossRevenueStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchGrossRevenueSuccess(getTodayWidgetStatistiscs_2()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getGrossRevenueStatistics = () => throwError(error);
      return runEpic(fetchGrossRevenueStart(ActionsObservable.of(actions.fetchGrossRevenueStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE, false, true, errorResponse));
      });
    });
  });

  describe.skip('fetchProjectStatisticsStart', () => {
    it('should get epic for project fetch statistics', () => {
      return runEpic(fetchProjectStatisticsStart(ActionsObservable.of(actions.fetchProjectStatisticsStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, true));
        expect(deps.apiService.getProjectStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchProjectStatisticsSuccess(getProjectStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, false));
      });
    });

    it('should get epic for company project fetch statistics', () => {
      return runEpic(fetchProjectStatisticsStart(ActionsObservable.of(actions.fetchProjectStatisticsStart()), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, true));
        expect(deps.apiService.getCompanyProjectStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchProjectStatisticsSuccess(getProjectStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProjectStatistics = () => throwError(error);
      return runEpic(fetchProjectStatisticsStart(ActionsObservable.of(actions.fetchProjectStatisticsStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchClientStatisticsStart', () => {
    it('should get epic for client fetch statistics', () => {
      return runEpic(fetchClientStatisticsStart(ActionsObservable.of(actions.fetchClientStatisticsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS, true));
        expect(deps.apiService.getClientStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchClientStatisticsSuccess(getClientStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientStatistics = () => throwError(error);
      return runEpic(fetchClientStatisticsStart(ActionsObservable.of(actions.fetchClientStatisticsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchInventoryStatisticsStart', () => {
    it('should get epic for inventory fetch statistics', () => {
      return runEpic(fetchInventoryStatisticsStart(ActionsObservable.of(actions.fetchInventoryStatisticsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS, true));
        expect(deps.apiService.getInventoryStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchInventoryStatisticsSuccess(getInventoryStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getInventoryStatistics = () => throwError(error);
      return runEpic(fetchInventoryStatisticsStart(ActionsObservable.of(actions.fetchInventoryStatisticsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe.skip('fetchWorkerStatisticsStart', () => {
    it('should get epic for worker fetch statistics', () => {
      return runEpic(fetchWorkerStatisticsStart(ActionsObservable.of(actions.fetchWorkerStatisticsStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, true));
        expect(deps.apiService.getWorkerStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkerStatisticsSuccess(getWorkerStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, false));
      });
    });

    it('should get epic for worker fetch self statistics', () => {
      return runEpic(fetchWorkerStatisticsStart(ActionsObservable.of(actions.fetchWorkerStatisticsStart()), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, true));
        expect(deps.apiService.getSelfWorkerStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkerStatisticsSuccess(getWorkerStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getSelfWorkerStatistics = () => throwError(error);
      return runEpic(fetchWorkerStatisticsStart(ActionsObservable.of(actions.fetchWorkerStatisticsStart()), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchProjectWidgetStatisticsStart', () => {
    it('should get epic for statistics fetch project widget', () => {
      return runEpic(
        fetchProjectWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectWidgetStatisticsStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS, true));
          expect(deps.apiService.getProjectWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchLinePiestatisticsSuccess('key', getProjectWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchProjectWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectWidgetStatisticsStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WIDGET_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchClientWidgetStatisticsStart', () => {
    it('should get epic for statistics fetch project widget', () => {
      return runEpic(
        fetchClientWidgetStatisticsStart(ActionsObservable.of(actions.fetchClientWidgetStatisticsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS, true));
          expect(deps.apiService.getClientWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchPieStatisticsSuccess('key', getClientWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getClientWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchClientWidgetStatisticsStart(ActionsObservable.of(actions.fetchClientWidgetStatisticsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WIDGET_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchInvoiceStatisticsStart', () => {
    it('should get epic for invoice fetch statistics', () => {
      return runEpic(fetchInvoiceStatisticsStart(ActionsObservable.of(actions.fetchInvoiceStatisticsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS, true));
        expect(deps.apiService.getInvoiceStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchInvoiceStatisticsSuccess(getInvoiceStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getInvoiceStatistics = () => throwError(error);
      return runEpic(fetchInvoiceStatisticsStart(ActionsObservable.of(actions.fetchInvoiceStatisticsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchGrossRevenueWidgetStatisticsStart', () => {
    it('should fetch Gross Revenue Widget Statistics Start', () => {
      return runEpic(
        fetchGrossRevenueWidgetStatisticsStart(ActionsObservable.of(actions.fetchGrossRevenueWidgetStatisticsStart()), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS, true));
          expect(deps.apiService.getGrossRevenueWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchGrossRevenueWidgetStatisticsSuccess(getGrossRevenueWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getGrossRevenueWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchGrossRevenueWidgetStatisticsStart(ActionsObservable.of(actions.fetchGrossRevenueWidgetStatisticsStart()), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersActivityWidgetStatisticsStart', () => {
    it('should fetch Workers Activity Widget Statistics Start', () => {
      return runEpic(
        fetchWorkersActivityWidgetStatisticsStart(ActionsObservable.of(actions.fetchWorkersActivityWidgetStatisticsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS, true));
          expect(deps.apiService.getWorkersActivityWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchLinePiestatisticsSuccess('key', getWorkersActivityWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersActivityWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchWorkersActivityWidgetStatisticsStart(ActionsObservable.of(actions.fetchWorkersActivityWidgetStatisticsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchNewAssignedWorkersWidgetStatisticsStart', () => {
    it('should fetch new assigned workers widget statistics start', () => {
      return runEpic(
        fetchNewAssignedWorkersWidgetStatisticsStart(ActionsObservable.of(actions.fetchNewAssignedWorkersWidgetStatisticsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS, true));
          expect(deps.apiService.getNewAssignedWorkersWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchLinePiestatisticsSuccess('key', getWorkersActivityWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getNewAssignedWorkersWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchNewAssignedWorkersWidgetStatisticsStart(ActionsObservable.of(actions.fetchNewAssignedWorkersWidgetStatisticsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_NEW_ASSIGNED_WORKERS_WIDGET_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchProjectAccessControlSystemWidgetStatisticsStart', () => {
    it('should fetch project acs widget start', () => {
      return runEpic(
        fetchProjectAccessControlSystemWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectAcsStart({})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS, true));
          expect(deps.apiService.getProjectAccessControlSystemStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectAcsSuccess(getAccessControlSystemWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectAccessControlSystemStatistics = () => throwError(error);
      return runEpic(
        fetchProjectAccessControlSystemWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectAcsStart({})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchProjectBadgePrintingSystemWidgetStatisticsStart', () => {
    it('should fetch project bps widget start', () => {
      return runEpic(
        fetchProjectBadgePrintingSystemWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectBpsStart({})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS, true));
          expect(deps.apiService.getProjectBadgePrintingSystemStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectBpsSuccess(getBadgePrintingSystemWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectBadgePrintingSystemStatistics = () => throwError(error);
      return runEpic(
        fetchProjectBadgePrintingSystemWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectBpsStart({})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchProjectWorkersActivityWidgetStatisticsStart', () => {
    it('should fetch project workers activity widget start', () => {
      return runEpic(
        fetchProjectWorkersActivityWidgetStatisticsStart(
          ActionsObservable.of(actions.fetchProjectWorkersActivityStart('key', {})),
          stateMgmtAdmin as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS, true));
          expect(deps.apiService.getProjectWorkersActivityStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchLinePiestatisticsSuccess('key', getProjectWorkersActivityStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectWorkersActivityStatistics = () => throwError(error);
      return runEpic(
        fetchProjectWorkersActivityWidgetStatisticsStart(
          ActionsObservable.of(actions.fetchProjectWorkersActivityStart('key', {})),
          stateMgmtAdmin as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchProjectClientsWidgetStatisticsStart', () => {
    it('should fetch project client widget start', () => {
      return runEpic(
        fetchProjectClientsWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectClientsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS, true));
          expect(deps.apiService.getProjectClientsStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchPieStatisticsSuccess('key', getProjectClientsWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectClientsStatistics = () => throwError(error);
      return runEpic(
        fetchProjectClientsWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectClientsStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchActiveLocationsWidgetStatisticsStart', () => {
    it('should fetch project locations widget start', () => {
      return runEpic(
        fetchActiveLocationsWidgetStatisticsStart(ActionsObservable.of(actions.fetchActiveProjectsStart({})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, true));
          expect(deps.apiService.getProjectActivesStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchActiveLocationsSuccess(getProjectActiviesWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, false));
        }
      );
    });

    it('should fetch client locations widget start', () => {
      return runEpic(
        fetchActiveLocationsWidgetStatisticsStart(ActionsObservable.of(actions.fetchActiveClientsStart({})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, true));
          expect(deps.apiService.getClientActivesStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchActiveLocationsSuccess(getProjectActiviesWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectActivesStatistics = () => throwError(error);
      return runEpic(
        fetchActiveLocationsWidgetStatisticsStart(ActionsObservable.of(actions.fetchActiveProjectsStart({})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchProjectBadgeLocationWidgetStatisticsStart', () => {
    it('should fetch project badge location widget start', () => {
      return runEpic(
        fetchProjectBadgeLocationWidgetStatisticsStart(ActionsObservable.of(actions.fetchBadgeLocationStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS, true));
          expect(deps.apiService.getProjectBadgeLocationStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByLocationWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectBadgeLocationStatistics = () => throwError(error);
      return runEpic(
        fetchProjectBadgeLocationWidgetStatisticsStart(ActionsObservable.of(actions.fetchBadgeLocationStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchProjectBadgeProjectWidgetStatisticsStart', () => {
    it('should fetch project badge project widget start', () => {
      return runEpic(
        fetchProjectBadgeProjectWidgetStatisticsStart(ActionsObservable.of(actions.fetchBadgeProjectStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS, true));
          expect(deps.apiService.getProjectBadgeProjectStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectBadgeProjectStatistics = () => throwError(error);
      return runEpic(
        fetchProjectBadgeProjectWidgetStatisticsStart(ActionsObservable.of(actions.fetchBadgeProjectStart('key', {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchProjectRevenueWidgetStatisticsStart', () => {
    it('should fetch project acs widget start', () => {
      return runEpic(fetchProjectRevenueWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectsRevenueStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS, true));
        expect(deps.apiService.getProjectRevenueProjectStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchGrossRevenueWidgetStatisticsSuccess(getProjectRevenueProjectStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProjectRevenueProjectStatistics = () => throwError(error);
      return runEpic(fetchProjectRevenueWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectsRevenueStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(
          generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_REVENUE_PROJECT_STATISTICS, false, true, errorResponse)
        );
      });
    });
  });

  describe('fetchProjectTopTenWidgetStatisticsStart', () => {
    it('should fetch project acs widget start', () => {
      return runEpic(
        fetchProjectTopTenWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectTopTenStart({})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS, true));
          expect(deps.apiService.getProjectTopTenStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectTopTenSuccess(getProjectTopTenStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectTopTenStatistics = () => throwError(error);
      return runEpic(
        fetchProjectTopTenWidgetStatisticsStart(ActionsObservable.of(actions.fetchProjectTopTenStart({})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersByProjectStart', () => {
    it('should fetch workers by project widget start', () => {
      return runEpic(fetchWorkersByProjectStart(ActionsObservable.of(actions.fetchWorkersByProjectStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT, true));
        expect(deps.apiService.getWorkersByProject).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByProject = () => throwError(error);
      return runEpic(fetchWorkersByProjectStart(ActionsObservable.of(actions.fetchWorkersByProjectStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_PROJECT, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersByClientStart', () => {
    it('should fetch workers by client widget start', () => {
      return runEpic(fetchWorkersByClientStart(ActionsObservable.of(actions.fetchWorkersByClientStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT, true));
        expect(deps.apiService.getWorkersByClient).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByClient = () => throwError(error);
      return runEpic(fetchWorkersByClientStart(ActionsObservable.of(actions.fetchWorkersByClientStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersByLocationStart', () => {
    it('should fetch workers by location widget start', () => {
      return runEpic(fetchWorkersByLocationStart(ActionsObservable.of(actions.fetchWorkersByLocationStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION, true));
        expect(deps.apiService.getWorkersByLocation).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByLocation = () => throwError(error);
      return runEpic(fetchWorkersByLocationStart(ActionsObservable.of(actions.fetchWorkersByLocationStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersByJobDataStart', () => {
    it('should fetch workers by trade start', () => {
      return runEpic(
        fetchWorkersByJobDataStart(ActionsObservable.of(actions.fetchWorkersByJobDataStart('key', {}, IJobFilter.TRADE)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA, true));
          expect(deps.apiService.getWorkersByJobDataByTrades).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA, false));
        }
      );
    });

    it('should fetch workers by work experience start', () => {
      return runEpic(
        fetchWorkersByJobDataStart(
          ActionsObservable.of(actions.fetchWorkersByJobDataStart('key', {}, IJobFilter.WORK_EXPERIENCE)),
          stateMgmtAdmin as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA, true));
          expect(deps.apiService.getWorkersByJobDataByExperience).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByTradesMinority = () => throwError(error);
      return runEpic(
        fetchWorkersByTradesMinorityStart(ActionsObservable.of(actions.fetchWorkersByTradesMinorityStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersByTradesMinorityStart', () => {
    it('should fetch workers by trades minority widget start', () => {
      return runEpic(
        fetchWorkersByTradesMinorityStart(ActionsObservable.of(actions.fetchWorkersByTradesMinorityStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, true));
          expect(deps.apiService.getWorkersByTradesMinority).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByTradesMinority = () => throwError(error);
      return runEpic(
        fetchWorkersByTradesMinorityStart(ActionsObservable.of(actions.fetchWorkersByTradesMinorityStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersByTradesNonMinorityStart', () => {
    it('should fetch workers by trades non minority widget start', () => {
      return runEpic(
        fetchWorkersByTradesNonMinorityStart(ActionsObservable.of(actions.fetchWorkersByTradesNonMinorityStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY, true));
          expect(deps.apiService.getWorkersByTradesNonMinority).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByTradesNonMinority = () => throwError(error);
      return runEpic(
        fetchWorkersByTradesNonMinorityStart(ActionsObservable.of(actions.fetchWorkersByTradesNonMinorityStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersCertificationsStart', () => {
    it('should fetch workers certifications widget start', () => {
      return runEpic(fetchWorkersCertificationsStart(ActionsObservable.of(actions.fetchWorkersCertificationsStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS, true));
        expect(deps.apiService.getWorkersCertifications).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersCertifications = () => throwError(error);
      return runEpic(fetchWorkersCertificationsStart(ActionsObservable.of(actions.fetchWorkersCertificationsStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_CERTIFICATIONS, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersObservationsStart', () => {
    it('should fetch workers certifications widget start', () => {
      return runEpic(
        fetchWorkersObservationsStart(ActionsObservable.of(actions.fetchWorkersObservationsStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS, true));
          expect(deps.apiService.getWorkersObservations).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersObservations = () => throwError(error);
      return runEpic(
        fetchWorkersObservationsStart(ActionsObservable.of(actions.fetchWorkersObservationsStart('key', {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_OBSERVATIONS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersByDemographicDataStart', () => {
    it('should fetch workers by demographic data by language widget start', () => {
      return runEpic(
        fetchWorkersByDemographicDataStart(ActionsObservable.of(actions.fetchWorkersByDemographicDataStart('key', {}, 0)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true));
          expect(deps.apiService.getWorkersByDemographicDataByLanguage).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchPieStatisticsSuccess('key', getProjectClientsWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false));
        }
      );
    });
    it('should fetch workers by demographic data widget start', () => {
      return runEpic(
        fetchWorkersByDemographicDataStart(ActionsObservable.of(actions.fetchWorkersByDemographicDataStart('key', {}, 2)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true));
          expect(deps.apiService.getWorkersByDemographicDataByGender).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchPieStatisticsSuccess('key', getProjectClientsWidget_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByDemographicDataByLanguage = () => throwError(error);
      return runEpic(
        fetchWorkersByDemographicDataStart(ActionsObservable.of(actions.fetchWorkersByDemographicDataStart('key', {}, 0)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkersTrainingsStart', () => {
    it('should fetch workers trainings data widget start', () => {
      return runEpic(fetchWorkersTrainingsStart(ActionsObservable.of(actions.fetchWorkersTrainingsStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS, true));
        expect(deps.apiService.getWorkersTrainings).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchPieStatisticsSuccess('key', getProjectClientsWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersTrainings = () => throwError(error);
      return runEpic(fetchWorkersTrainingsStart(ActionsObservable.of(actions.fetchWorkersTrainingsStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersNewWorkersStart', () => {
    it('should fetch workers new workers widget start', () => {
      return runEpic(fetchWorkersNewWorkersStart(ActionsObservable.of(actions.fetchWorkersNewWorkersStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS, true));
        expect(deps.apiService.getWorkersNewWorkers).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchLinePiestatisticsSuccess('key', getWorkersActivityWidgetStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersNewWorkers = () => throwError(error);
      return runEpic(fetchWorkersNewWorkersStart(ActionsObservable.of(actions.fetchWorkersNewWorkersStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_NEW_WORKERS, false, true, errorResponse));
      });
    });
  });

  describe('fetchClientDetailStatisticsStart', () => {
    it('should fetch client detail statistics start', () => {
      return runEpic(fetchClientDetailStatisticsStart(ActionsObservable.of(actions.fetchClientDetailStatisticsStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS, true));
        expect(deps.apiService.getClientDetailStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchClientDetailStatisticsSuccess(getClientDetailStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientDetailStatistics = () => throwError(error);
      return runEpic(fetchClientDetailStatisticsStart(ActionsObservable.of(actions.fetchClientDetailStatisticsStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchProjectDetailStatisticsStart', () => {
    it('should fetch project detail statistics start', () => {
      return runEpic(fetchProjectDetailStatisticsStart(ActionsObservable.of(actions.fetchProjectDetailStatisticsStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS, true));
        expect(deps.apiService.getProjectDetailStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchProjectDetailStatisticsSuccess(getProjectDetailStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS, false));
      });
    });
    it('should catch errors', () => {
      deps.apiService.getProjectDetailStatistics = () => throwError(error);
      return runEpic(fetchProjectDetailStatisticsStart(ActionsObservable.of(actions.fetchProjectDetailStatisticsStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchClientsByTradesStart', () => {
    it('should fetch client detail statistics start', () => {
      return runEpic(fetchClientsByTradesStart(ActionsObservable.of(actions.fetchClientsByTradesStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES, true));
        expect(deps.apiService.getClientsByTrades).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByLocationWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES, false));
      });
    });
    it('should catch errors', () => {
      deps.apiService.getClientsByTrades = () => throwError(error);
      return runEpic(fetchClientsByTradesStart(ActionsObservable.of(actions.fetchClientsByTradesStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES, false, true, errorResponse));
      });
    });
  });

  describe('fetchClientRevenueWidgetStatisticsStart', () => {
    it('should fetch client revenue statistics start', () => {
      return runEpic(
        fetchClientRevenueWidgetStatisticsStart(ActionsObservable.of(actions.fetchClientRevenueWidgetStatisticsStart({})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS, true));
          expect(deps.apiService.getClientRevenueWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchGrossRevenueWidgetStatisticsSuccess(getGrossRevenueWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getClientRevenueWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchClientRevenueWidgetStatisticsStart(ActionsObservable.of(actions.fetchClientRevenueWidgetStatisticsStart({})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchClientTopTenWidgetStatisticsStart', () => {
    it('should fetch client top ten statistics start', () => {
      return runEpic(fetchClientTopTenWidgetStatisticsStart(ActionsObservable.of(actions.fetchClientTopTenStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS, true));
        expect(deps.apiService.getClientTopTenStatistics).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchClientTopTenSuccess(getClientTopTenStatistics_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientTopTenStatistics = () => throwError(error);
      return runEpic(fetchClientTopTenWidgetStatisticsStart(ActionsObservable.of(actions.fetchClientTopTenStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkersByEthnicityStart', () => {
    it('should fetch workers by ethnicity start', () => {
      return runEpic(fetchWorkersByEthnicityStart(ActionsObservable.of(actions.fetchWorkersByEthnicityStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true));
        expect(deps.apiService.getWorkersByDemographicDataByEthnicity).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTopTenSuccess('key', getBadgeByProjectWidget_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkersByDemographicDataByEthnicity = () => throwError(error);
      return runEpic(fetchWorkersByEthnicityStart(ActionsObservable.of(actions.fetchWorkersByEthnicityStart('key', {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA, false, true, errorResponse));
      });
    });
  });

  describe('fetchClientWorkersActivityWidgetStatisticsStart', () => {
    it('should fetch Workers Activity Widget Statistics Start', () => {
      return runEpic(
        fetchClientWorkersActivityWidgetStatisticsStart(
          ActionsObservable.of(actions.fetchClientWorkersActivityWidgetStatisticsStart('key', {})),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS, true));
          expect(deps.apiService.getClientWorkersActivityWidgetStatistics).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchLinePiestatisticsSuccess('key', getWorkersActivityWidgetStatistics_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getClientWorkersActivityWidgetStatistics = () => throwError(error);
      return runEpic(
        fetchClientWorkersActivityWidgetStatisticsStart(
          ActionsObservable.of(actions.fetchClientWorkersActivityWidgetStatisticsStart('key', {})),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKERS_ACTIVITY_WIDGET_STATISTICS, false, true, errorResponse)
          );
        }
      );
    });
  });
});
