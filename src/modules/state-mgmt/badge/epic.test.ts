import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { IEpicDependencies } from '../rootState';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { coreState } from '../core';
import { generalState } from '../general';
import {
  fetchBadgeStart,
  activateBadgeStart,
  deactivateBadgeStart,
  revokeBadgeStart,
  fetchBadgeVisitorStart,
  fetchProjectBadgeVisitorListStart,
  saveProjectVisitorBadgeStart,
  assignBadgeVisitorStart,
  unassignBadgeVisitorStart,
  updateBadgeStart,
  printWorkerBadgeStart,
  printVisitorBadgeStart,
  updateVisitorBadgeStart,
  fetchBadgeHistoryStart,
} from './epics';
import { actions } from './actions';
import { GENERAL } from '../../../constants';
import { getBadgeHistory_1, getBadgeUpdateRequest_1, getBadge_1, getProject_1, getVisitorProject_1, getVisitorProject_2 } from '../../../test/entities';
import { BadgeModel, GeneralModel, UserModel } from '../../models';

describe('badge epics', () => {
  let deps: IEpicDependencies;
  let error;
  let stateMgmtAdmin = { value: { auth: { role: UserModel.Role.FCA_ADMIN } } };
  let stateMgmtClient = { value: { auth: { role: UserModel.Role.CLIENT_ADMIN } } };
  beforeEach(() => {
    error = { response: new Error('scary error'), title: 'error title' };
    deps = getDeps();
  });

  describe('fetchBadgeStart', () => {
    it('should get epic for fetch badge', () => {
      return runEpic(fetchBadgeStart(ActionsObservable.of(actions.fetchBadgeStart(getBadge_1().id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE, true));
        expect(deps.apiService.getBadge).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchBadgeSuccess(getBadge_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getBadge = () => throwError(error);
      return runEpic(fetchBadgeStart(ActionsObservable.of(actions.fetchBadgeStart(getBadge_1().id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE, false, true, error.response));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.response.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('activateBadgeStart', () => {
    it('should get epic for approve badge', () => {
      return runEpic(
        activateBadgeStart(ActionsObservable.of(actions.activateBadgeStart(getBadge_1().id, 'tag-id')), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true));
          expect(deps.apiService.activateBadge).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.updateBadgeSuccess(getBadge_1().id, BadgeModel.BadgeStatus.ACTIVE));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge activated successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.activateBadge = () => throwError(error);
      return runEpic(
        activateBadgeStart(ActionsObservable.of(actions.activateBadgeStart(getBadge_1().id, 'tag-id')), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false, true, error.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('revokeBadgeStart', () => {
    it('should get epic for revoke badge', () => {
      return runEpic(revokeBadgeStart(ActionsObservable.of(actions.revokeBadgeStart(getBadge_1().id, 'reason')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true));
        expect(deps.apiService.revokeBadge).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.updateBadgeSuccess(getBadge_1().id, BadgeModel.BadgeStatus.REVOKED));
        expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge revoked successfully!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.revokeBadge = () => throwError(error);
      return runEpic(revokeBadgeStart(ActionsObservable.of(actions.revokeBadgeStart(getBadge_1().id, 'reason')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false, true, error.response));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.response.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('deactivateBadgeStart', () => {
    it('should get epic for deactive badge', () => {
      return runEpic(
        deactivateBadgeStart(ActionsObservable.of(actions.deactivateBadgeStart(getBadge_1().id, 'reason')), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true));
          expect(deps.apiService.deactivateBadge).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.updateBadgeSuccess(getBadge_1().id, BadgeModel.BadgeStatus.DEACTIVATE));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge deactivated successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.deactivateBadge = () => throwError(error);
      return runEpic(
        deactivateBadgeStart(ActionsObservable.of(actions.deactivateBadgeStart(getBadge_1().id, 'reason')), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE, false, true, error.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchProjectBadgeVisitorListStart', () => {
    it('should get epic for project badge visitor list', () => {
      return runEpic(
        fetchProjectBadgeVisitorListStart(ActionsObservable.of(actions.fetchProjectBadgeVisitorListStart(getProject_1().id, 1, 10)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST, true));
          expect(deps.apiService.getVisitorBadgeList).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectBadgeVisitorListSuccess(getProject_1().id, [getVisitorProject_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.getVisitorBadgeList = () => throwError(thrownError);
      return runEpic(
        fetchProjectBadgeVisitorListStart(ActionsObservable.of(actions.fetchProjectBadgeVisitorListStart(getProject_1().id, 1, 10)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST, false, true, thrownError.response)
          );
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchBadgeVisitorStart', () => {
    it('should get epic for badge visitor', () => {
      return runEpic(fetchBadgeVisitorStart(ActionsObservable.of(actions.fetchBadgeVisitorStart(getVisitorProject_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR, true));
        expect(deps.apiService.getVisitorBadge).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchBadgeSuccess(getBadge_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR, false));
      });
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.getVisitorBadge = () => throwError(thrownError);
      return runEpic(fetchBadgeVisitorStart(ActionsObservable.of(actions.fetchBadgeVisitorStart(getVisitorProject_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR, false, true, thrownError.response));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('saveProjectVisitorBadgeStart', () => {
    it('should get epic for project save badge visitor', () => {
      return runEpic(
        saveProjectVisitorBadgeStart(ActionsObservable.of(actions.createBadgeVisitorStart(getProject_1().id, 15)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR, true));
          expect(deps.apiService.createBadgeVisitors).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.createBadgeSuccess());
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.createBadgeVisitors = () => throwError(thrownError);
      return runEpic(
        saveProjectVisitorBadgeStart(ActionsObservable.of(actions.createBadgeVisitorStart(getProject_1().id, 15)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR, false, true, thrownError.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('assignBadgeVisitorStart', () => {
    it('should get epic for badge assign project badge visitor start', () => {
      return runEpic(
        assignBadgeVisitorStart(ActionsObservable.of(actions.assignProjectBadgeVisitorStart(getProject_1().id, getVisitorProject_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true));
          expect(deps.apiService.updateBadgeVisitor).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.createBadgeSuccess());
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false));
        }
      );
    });

    it('should get epic for badge update project badge visitor start', () => {
      return runEpic(
        assignBadgeVisitorStart(ActionsObservable.of(actions.assignProjectBadgeVisitorStart(getProject_1().id, getVisitorProject_2())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true));
          expect(deps.apiService.updateBadgeVisitor).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.createBadgeSuccess());
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge assigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.updateBadgeVisitor = () => throwError(thrownError);
      return runEpic(
        assignBadgeVisitorStart(ActionsObservable.of(actions.assignProjectBadgeVisitorStart(getProject_1().id, getVisitorProject_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false, true, thrownError.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('unassignBadgeVisitorStart', () => {
    it('should get epic for badge unassign project badge visitor start', () => {
      return runEpic(
        unassignBadgeVisitorStart(ActionsObservable.of(actions.unassignProjectBadgeVisitorStart(getProject_1().id, getVisitorProject_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true));
          expect(deps.apiService.updateBadgeVisitor).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.createBadgeSuccess());
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Badge unassigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.updateBadgeVisitor = () => throwError(thrownError);
      return runEpic(
        unassignBadgeVisitorStart(ActionsObservable.of(actions.unassignProjectBadgeVisitorStart(getProject_1().id, getVisitorProject_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR, false, true, thrownError.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('printWorkerBadgeStart', () => {
    it('should get epic for badge print worker badge start', () => {
      return runEpic(printWorkerBadgeStart(ActionsObservable.of(actions.printWorkerBadgeStart('id')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE, true));
        expect(deps.apiService.getPrintableWorkerBadge).toHaveBeenCalledWith('id');
        expect(deps.printerService.print).toHaveBeenCalled();
        expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE, false));
      });
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.getPrintableWorkerBadge = () => throwError(thrownError);
      return runEpic(printWorkerBadgeStart(ActionsObservable.of(actions.printWorkerBadgeStart('id')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_WORKER_BADGE, false, true, thrownError.response));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('printVisitorBadgeStart', () => {
    it('should get epic for badge print visitor badge start', () => {
      return runEpic(printVisitorBadgeStart(ActionsObservable.of(actions.printVisitorBadgeStart('id')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE, true));
        expect(deps.apiService.getPrintableVisitorBadge).toHaveBeenCalledWith('id');
        expect(deps.printerService.print).toHaveBeenCalled();
        expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE, false));
      });
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.getPrintableVisitorBadge = () => throwError(thrownError);
      return runEpic(printVisitorBadgeStart(ActionsObservable.of(actions.printVisitorBadgeStart('id')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PRINT_VISITOR_BADGE, false, true, thrownError.response));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('updateBadgeStart', () => {
    it('should get epic for badge update start', () => {
      return runEpic(
        updateBadgeStart(ActionsObservable.of(actions.updateProjectBadgeStart(getBadge_1().id, getBadgeUpdateRequest_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, true));
          expect(deps.apiService.updateBadge).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.updateProjectBadgeSuccess(getBadge_1().id, getBadgeUpdateRequest_1()));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.updateBadge = () => throwError(thrownError);
      return runEpic(
        updateBadgeStart(ActionsObservable.of(actions.updateProjectBadgeStart(getBadge_1().id, getBadgeUpdateRequest_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, false, true, thrownError.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('updateVisitorBadgeStart', () => {
    it('should get epic for visitor badge update start', () => {
      return runEpic(
        updateVisitorBadgeStart(ActionsObservable.of(actions.updateVisitorBadgeStart(getBadge_1().id, getBadgeUpdateRequest_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, true));
          expect(deps.apiService.updateBadgeVisitor).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.updateProjectBadgeSuccess(getBadge_1().id, getBadgeUpdateRequest_1()));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.updateBadgeVisitor = () => throwError(thrownError);
      return runEpic(
        updateVisitorBadgeStart(ActionsObservable.of(actions.updateVisitorBadgeStart(getBadge_1().id, getBadgeUpdateRequest_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA, false, true, thrownError.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchBadgeHistoryStart', () => {
    it('should get epic for badge history start', () => {
      return runEpic(
        fetchBadgeHistoryStart(ActionsObservable.of(actions.fetchBadgeHistoryStart(getBadge_1().id, { page: 1, limit: 10 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY, true));
          expect(deps.apiService.getBadgeHistory).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchBadgeHistorySuccess([getBadgeHistory_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY, false));
        }
      );
    });

    it('should catch errors', () => {
      const thrownError = { response: { title: 'error title' } };
      deps.apiService.getBadgeHistory = () => throwError(thrownError);
      return runEpic(
        fetchBadgeHistoryStart(ActionsObservable.of(actions.fetchBadgeHistoryStart(getBadge_1().id, { page: 1, limit: 10 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(thrownError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY, false, true, thrownError.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(thrownError.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });
});
