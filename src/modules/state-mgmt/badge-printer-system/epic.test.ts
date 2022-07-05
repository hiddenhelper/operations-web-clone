import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';
import { IEpicDependencies } from '../rootState';
import {
  fetchBadgePrinterSystemStart,
  saveBadgePrinterSystemStart,
  updateBadgePrinterSystemStart,
  fetchBadgePrintingSystemSummaryStart,
  fetchBadgePrinterSystemListStart,
  deleteBadgePrinterSystemStart,
  fetchBadgePrintingSystemProjectListStart,
  fetchProjectBadgePrintingSystemListStart,
  updateBadgePrintingSystemDateStart,
} from './epics';
import { GENERAL } from '../../../constants';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { coreState } from '../core';
import { projectState } from '../project';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';
import { getBadgePrinterSystem_1, getProject_1 } from '../../../test/entities';
import { GeneralModel } from '../../models';
import { push } from 'connected-react-router';
import { ToastType } from '../../models/general';
import { statisticsState } from '../statistics';

describe('badge-printer-system epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = { error: new Error('scary error'), title: 'title' };
    deps = getDeps();
  });

  describe('fetchBadgePrinterSystemStart', () => {
    it('should get epic for badge-printer-system fetch start', () => {
      return runEpic(
        fetchBadgePrinterSystemStart(ActionsObservable.of(actions.fetchBadgePrinterSystemStart(getBadgePrinterSystem_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, true));
          expect(deps.apiService.getBadgePrinterSystem).toHaveBeenCalledWith(getBadgePrinterSystem_1().id);
          expect(actionList[1]).toEqual(actions.fetchBadgePrinterSystemListSuccess([getBadgePrinterSystem_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getBadgePrinterSystem = () => throwError(error);
      return runEpic(
        fetchBadgePrinterSystemStart(ActionsObservable.of(actions.fetchBadgePrinterSystemStart(getBadgePrinterSystem_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM, false, true, error));
        }
      );
    });
  });

  describe('saveBadgePrinterSystemStart', () => {
    it('should get epic for badge-printer-system save start', () => {
      return runEpic(
        saveBadgePrinterSystemStart(ActionsObservable.of(actions.saveBadgePrinterSystemStart(getBadgePrinterSystem_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, true));
          expect(deps.apiService.saveBadgePrinterSystem).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.saveBadgePrinterSystemSuccess(getBadgePrinterSystem_1()));
          expect(actionList[2]).toEqual(push('/inventory?deviceType="badge-printing-system"', { success: true }));
          expect(actionList[3]).toEqual(
            generalState.actions.addToastStart('Badge Printing System has been created successfully!', GeneralModel.ToastType.SUCCESS)
          );
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveBadgePrinterSystem = () => throwError(error);
      return runEpic(
        saveBadgePrinterSystemStart(ActionsObservable.of(actions.saveBadgePrinterSystemStart(getBadgePrinterSystem_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('updateBadgePrinterSystemStart', () => {
    it('should get epic for badge-printer-system update start', () => {
      return runEpic(
        updateBadgePrinterSystemStart(ActionsObservable.of(actions.updateBadgePrinterSystemStart(getBadgePrinterSystem_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, true));
          expect(deps.apiService.updateBadgePrinterSystem).toHaveBeenCalledWith(getBadgePrinterSystem_1());
          expect(actionList[1]).toEqual(actions.saveBadgePrinterSystemSuccess(getBadgePrinterSystem_1()));
          expect(actionList[2]).toEqual(push('/inventory?deviceType="badge-printing-system"', { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.updateBadgePrinterSystem = () => throwError(error);
      return runEpic(
        updateBadgePrinterSystemStart(ActionsObservable.of(actions.updateBadgePrinterSystemStart(getBadgePrinterSystem_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchBadgePrintingSystemSummaryStart', () => {
    it('should get epic for badge-printer-system summary start', () => {
      return runEpic(
        fetchBadgePrintingSystemSummaryStart(ActionsObservable.of(actions.fetchBadgePrintingSystemSummaryStart(getBadgePrinterSystem_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, true));
          expect(deps.apiService.getBadgePrinterSystem).toHaveBeenCalledWith(getBadgePrinterSystem_1().id);
          expect(actionList[1]).toEqual(actions.fetchBadgePrinterSystemSummarySuccess(getBadgePrinterSystem_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getBadgePrinterSystem = () => throwError(error);
      return runEpic(
        fetchBadgePrintingSystemSummaryStart(ActionsObservable.of(actions.fetchBadgePrintingSystemSummaryStart(getBadgePrinterSystem_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY, false, true, error));
        }
      );
    });
  });

  describe('fetchBadgePrinterSystemListStart', () => {
    it('should get epic for badge-printer-system list start', () => {
      return runEpic(
        fetchBadgePrinterSystemListStart(ActionsObservable.of(actions.fetchBadgePrinterSystemListStart({ page: 1, limit: 15 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, true));
          expect(deps.apiService.getBadgePrinterSystemList).toHaveBeenCalledWith({ page: 1, limit: 15 });
          expect(actionList[1]).toEqual(actions.fetchBadgePrinterSystemListSuccess([getBadgePrinterSystem_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getBadgePrinterSystemList = () => throwError(error);
      return runEpic(
        fetchBadgePrinterSystemListStart(ActionsObservable.of(actions.fetchBadgePrinterSystemListStart({ page: 1, limit: 15 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false, true, error));
        }
      );
    });
  });

  describe('deleteBadgePrinterSystemStart', () => {
    const stateMgmt = {
      value: { badgePrinterSystem: { badgePrinterSystemMap: { [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1() } } },
    };
    let query = { page: 1, limit: 30, newPage: false };
    it('should get epic for badge-printer-system delete start', () => {
      return runEpic(
        deleteBadgePrinterSystemStart(ActionsObservable.of(actions.deleteBadgePrinterSystemStart(getBadgePrinterSystem_1().id, query)), stateMgmt as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.deleteBadgePrinterSystem).toHaveBeenCalledWith(getBadgePrinterSystem_1().id);
          expect(actionList[1]).toEqual(actions.fetchBadgePrinterSystemListStart(query));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge Printer Name deleted successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(statisticsState.actions.fetchInventoryStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should delete badgePrintingSystem and navigate to a new page', () => {
      query = { page: 2, limit: 30, newPage: true };
      return runEpic(
        deleteBadgePrinterSystemStart(ActionsObservable.of(actions.deleteBadgePrinterSystemStart(getBadgePrinterSystem_1().id, query)), stateMgmt as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.deleteBadgePrinterSystem).toHaveBeenCalledWith(getBadgePrinterSystem_1().id);
          expect(actionList[1]).toEqual(push(`/inventory?page=1&limit=30`));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge Printer Name deleted successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(statisticsState.actions.fetchInventoryStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should catch default errors', () => {
      query = { page: 2, limit: 30, newPage: false };
      deps.apiService.deleteBadgePrinterSystem = () => throwError(error);
      return runEpic(
        deleteBadgePrinterSystemStart(ActionsObservable.of(actions.deleteBadgePrinterSystemStart(getBadgePrinterSystem_1().id, query)), stateMgmt as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
        }
      );
    });

    it('should catch errors', () => {
      query = { page: 2, limit: 30, newPage: false };
      deps.apiService.deleteBadgePrinterSystem = () => throwError(error);
      return runEpic(
        deleteBadgePrinterSystemStart(ActionsObservable.of(actions.deleteBadgePrinterSystemStart(getBadgePrinterSystem_1().id, query)), stateMgmt as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchBadgePrintingSystemProjectListStart', () => {
    it('should get epic for badge-printer-system list start', () => {
      return runEpic(
        fetchBadgePrintingSystemProjectListStart(
          ActionsObservable.of(actions.fetchBadgePrintingSystemProjectListStart({ page: 1, limit: 15 })),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, true));
          expect(deps.apiService.getBadgePrinterSystemList).toHaveBeenCalledWith({ page: 1, limit: 15 });
          expect(actionList[1]).toEqual(generalState.actions.setModalMap([getBadgePrinterSystem_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getBadgePrinterSystemList = () => throwError(error);
      return runEpic(
        fetchBadgePrintingSystemProjectListStart(
          ActionsObservable.of(actions.fetchBadgePrintingSystemProjectListStart({ page: 1, limit: 15 })),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST, false, true, error));
        }
      );
    });
  });

  describe('fetchProjectBadgePrintingSystemListStart', () => {
    it.skip('should get epic for badge-printer-system project list start', () => {
      return runEpic(
        fetchProjectBadgePrintingSystemListStart(
          ActionsObservable.of(actions.fetchProjectBadgePrintingSystemListStart(getProject_1().id, 1, 10)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, true));
          expect(deps.apiService.getProjectBadgePrintingSystemList).toHaveBeenCalledWith({ id: getProject_1().id, page: 1, limit: 10 });
          expect(actionList[1]).toEqual(actions.fetchBadgePrinterSystemListSuccess([getBadgePrinterSystem_1()], 1));
          expect(actionList[2]).toEqual(projectState.actions.associateBadgePrintingSystemProject(getProject_1().id, [getBadgePrinterSystem_1()]));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectBadgePrintingSystemList = () => throwError(error);
      return runEpic(
        fetchProjectBadgePrintingSystemListStart(
          ActionsObservable.of(actions.fetchProjectBadgePrintingSystemListStart(getProject_1().id, 1, 10)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST, false, true, error));
        }
      );
    });
  });

  describe('updateBadgePrintingSystemDateStart', () => {
    const stateMgmt = {
      value: { badgePrinterSystem: { badgePrinterSystemMap: { [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1() } } },
    };
    it.skip('should get epic for badge-printer-system project list start', () => {
      return runEpic(
        updateBadgePrintingSystemDateStart(
          ActionsObservable.of(actions.updateBadgePrintingSystemDateStart(getProject_1().id, getBadgePrinterSystem_1().id, '12/10/2010')),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, true));
          expect(deps.apiService.updateBadgePrintingSystemProjectDate).toHaveBeenCalledWith(getProject_1().id, getBadgePrinterSystem_1().id, '12/10/2010');
          expect(actionList[1]).toEqual(
            actions.saveBadgePrinterSystemSuccess({
              ...stateMgmt.value.badgePrinterSystem.badgePrinterSystemMap[getBadgePrinterSystem_1().id],
              shippingDate: '12/10/2010',
            })
          );
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Date has changed successfully!', ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.updateBadgePrintingSystemProjectDate = () => throwError(error);
      return runEpic(
        updateBadgePrintingSystemDateStart(
          ActionsObservable.of(actions.updateBadgePrintingSystemDateStart(getProject_1().id, getBadgePrinterSystem_1().id, '12/10/2010')),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_PRINTER_SYSTEM, false, true, error));
        }
      );
    });
  });
});
