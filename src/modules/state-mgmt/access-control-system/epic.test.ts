import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';
import { IEpicDependencies } from '../rootState';
import {
  deleteAccessControlSystemStart,
  fetchAccessControlSystemListStart,
  fetchAccessControlSystemStart,
  fetchAccessControlSystemSummaryStart,
  saveAccessControlSystemStart,
  updateAccessControlSystemStart,
  updateProjectAccessControlSystemStart,
  fetchProjectAccessControlSystemListStart,
  fetchAccessControlSystemProjectListStart,
  fetchProjectAccessControlSystemStart,
} from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';
import { getAccessControlSystemDevice_1, getAccessControlSystemDevice_2, getProjectAccessControlSystem_1, getProject_1 } from '../../../test/entities';
import { GeneralModel } from '../../models';
import { push } from 'connected-react-router';
import { projectState } from '../project';
import { statisticsState } from '../statistics';

describe('access-control-system epics', () => {
  let deps: IEpicDependencies;
  let error;
  let errorResponse = { title: 'scary error' };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });

  describe('fetchAccessControlSystemListStart', () => {
    it('should get epic for access-control-system fetch accessControlSystem list start', () => {
      return runEpic(fetchAccessControlSystemListStart(ActionsObservable.of(actions.fetchAccessControlSystemListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, true));
        expect(deps.apiService.getAccessControlSystemList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchAccessControlSystemListSuccess([getAccessControlSystemDevice_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getAccessControlSystemList = () => throwError(error);
      return runEpic(fetchAccessControlSystemListStart(ActionsObservable.of(actions.fetchAccessControlSystemListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false, true, error));
      });
    });
  });

  describe('fetchAccessControlSystemSummaryStart', () => {
    it('should get epic for access-control-system fetch accessControlSystem summary start', () => {
      return runEpic(
        fetchAccessControlSystemSummaryStart(
          ActionsObservable.of(actions.fetchAccessControlSystemSummaryStart(getAccessControlSystemDevice_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, true));
          expect(deps.apiService.getAccessControlSystemSummary).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.updateAccessControlSystemSuccess(getAccessControlSystemDevice_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getAccessControlSystemSummary = () => throwError(error);
      return runEpic(
        fetchAccessControlSystemSummaryStart(
          ActionsObservable.of(actions.fetchAccessControlSystemSummaryStart(getAccessControlSystemDevice_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY, false, true, error));
        }
      );
    });
  });

  describe('fetchAccessControlSystemStart', () => {
    const id = getAccessControlSystemDevice_1().id;

    it('should get epic for access-control-system fetch access control system', () => {
      return runEpic(fetchAccessControlSystemStart(ActionsObservable.of(actions.fetchAccessControlSystemStart(id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, true));
        expect(deps.apiService.getAccessControlSystem).toHaveBeenCalledWith(id);
        expect(actionList[1]).toEqual(actions.fetchAccessControlSystemSuccess(getAccessControlSystemDevice_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getAccessControlSystem = () => throwError(error);
      return runEpic(fetchAccessControlSystemStart(ActionsObservable.of(actions.fetchAccessControlSystemStart(id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM, false, true, error));
      });
    });
  });

  describe('saveAccessControlSystemStart', () => {
    it('should get epic for save access control system access point', () => {
      return runEpic(
        saveAccessControlSystemStart(ActionsObservable.of(actions.saveAccessControlSystemStart(getAccessControlSystemDevice_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.saveAccessControlSystemAccessPoint).toHaveBeenCalledWith(getAccessControlSystemDevice_1());
          expect(actionList[1]).toEqual(actions.fetchAccessControlSystemSuccess(getAccessControlSystemDevice_1()));
          expect(actionList[2]).toEqual(push('/inventory', { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Access Control System created successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should get epic for save access control system handheld', () => {
      return runEpic(
        saveAccessControlSystemStart(ActionsObservable.of(actions.saveAccessControlSystemStart(getAccessControlSystemDevice_2())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.saveAccessControlSystemHandheld).toHaveBeenCalledWith(getAccessControlSystemDevice_2());
          expect(actionList[1]).toEqual(actions.fetchAccessControlSystemSuccess(getAccessControlSystemDevice_2()));
          expect(actionList[2]).toEqual(push('/inventory', { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Access Control System created successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      errorResponse = { title: 'something went wrong' };
      deps.apiService.saveAccessControlSystemAccessPoint = () => throwError(errorResponse);
      return runEpic(
        saveAccessControlSystemStart(ActionsObservable.of(actions.saveAccessControlSystemStart(getAccessControlSystemDevice_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(errorResponse));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('something went wrong', GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('updateAccessControlSystemStart', () => {
    it('should get epic for update access control system access point', () => {
      return runEpic(
        updateAccessControlSystemStart(ActionsObservable.of(actions.updateAccessControlSystemStart(getAccessControlSystemDevice_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.updateAccessControlSystemAccessPoint).toHaveBeenCalledWith(getAccessControlSystemDevice_1());
          expect(actionList[1]).toEqual(actions.updateAccessControlSystemSuccess(getAccessControlSystemDevice_1()));
          expect(actionList[2]).toEqual(push('/inventory', { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should get epic for update access control system handheld', () => {
      return runEpic(
        updateAccessControlSystemStart(ActionsObservable.of(actions.updateAccessControlSystemStart(getAccessControlSystemDevice_2())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.updateAccessControlSystemHandheld).toHaveBeenCalledWith(getAccessControlSystemDevice_2());
          expect(actionList[1]).toEqual(actions.updateAccessControlSystemSuccess(getAccessControlSystemDevice_2()));
          expect(actionList[2]).toEqual(push('/inventory', { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      errorResponse = { title: 'something went wrong' };
      deps.apiService.updateAccessControlSystemAccessPoint = () => throwError(errorResponse);
      return runEpic(
        updateAccessControlSystemStart(ActionsObservable.of(actions.updateAccessControlSystemStart(getAccessControlSystemDevice_1())), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(errorResponse));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('something went wrong', GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('deleteAccessControlSystemStart', () => {
    it('should get epic for access-control-system delete accessControlSystem start', () => {
      const stateMgmt = {
        value: { accessControlSystem: { accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() } } },
      };
      const query = { page: 1, limit: 30, newPage: false };
      return runEpic(
        deleteAccessControlSystemStart(
          ActionsObservable.of(actions.deleteAccessControlSystemStart(getAccessControlSystemDevice_1().id, query)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.deleteAccessControlSystem).toHaveBeenCalledWith(getAccessControlSystemDevice_1().id);
          expect(actionList[1]).toEqual(actions.fetchAccessControlSystemListStart(query));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('NRFFJE3149 - 4991 deleted successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(statisticsState.actions.fetchInventoryStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should delete accessControlSystem and navigate to a new page', () => {
      const stateMgmt = {
        value: { accessControlSystem: { accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() } } },
      };
      const query = { page: 2, limit: 30, newPage: true };
      return runEpic(
        deleteAccessControlSystemStart(
          ActionsObservable.of(actions.deleteAccessControlSystemStart(getAccessControlSystemDevice_1().id, query)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.deleteAccessControlSystem).toHaveBeenCalledWith(getAccessControlSystemDevice_1().id);
          expect(actionList[1]).toEqual(push(`/inventory?page=1&limit=30`));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('NRFFJE3149 - 4991 deleted successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(statisticsState.actions.fetchInventoryStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      errorResponse = { response: { title: 'error title' } };
      const stateMgmt = {
        value: { accessControlSystem: { accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() } } },
      };
      const query = { page: 2, limit: 30, newPage: false };
      deps.apiService.deleteAccessControlSystem = () => throwError(errorResponse);
      return runEpic(
        deleteAccessControlSystemStart(
          ActionsObservable.of(actions.deleteAccessControlSystemStart(getAccessControlSystemDevice_1().id, query)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(errorResponse));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM, false, true, errorResponse.response));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.response.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('updateProjectAccessControlSystemStart', () => {
    const stateMgmt = {
      value: { accessControlSystem: { accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() } } },
    };
    it('should get epic for update project access control system location', () => {
      return runEpic(
        updateProjectAccessControlSystemStart(
          ActionsObservable.of(
            actions.updateProjectAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id, getProjectAccessControlSystem_1())
          ),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT, true));
          expect(deps.apiService.updateProjectAccessControlSystem).toHaveBeenCalledWith(
            getProject_1().id,
            getAccessControlSystemDevice_1().id,
            getProjectAccessControlSystem_1()
          );
          expect(actionList[1]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.updateProjectAccessControlSystem = () => throwError(error);
      return runEpic(
        updateProjectAccessControlSystemStart(
          ActionsObservable.of(
            actions.updateProjectAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id, getProjectAccessControlSystem_1())
          ),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchProjectAccessControlSystemListStart', () => {
    it('should get epic for update project access control system location', () => {
      return runEpic(
        fetchProjectAccessControlSystemListStart(
          ActionsObservable.of(actions.fetchProjectAccessControlSystemListStart(getProject_1().id, {})),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST, true));
          expect(deps.apiService.getProjectAccessControlSystemList).toHaveBeenCalledWith({ id: getProject_1().id, query: {} });
          expect(actionList[1]).toEqual(
            actions.fetchProjectAccessControlSystemListSuccess([
              {
                location: getAccessControlSystemDevice_1().location,
                accessControlSystems: [getAccessControlSystemDevice_1()],
              },
            ])
          );
          expect(actionList[2]).toEqual(
            projectState.actions.associateAccessControlSystemProject(getProject_1().id, [
              {
                location: getAccessControlSystemDevice_1().location,
                accessControlSystems: [getAccessControlSystemDevice_1()],
              },
            ])
          );
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.getProjectAccessControlSystemList = () => throwError(error);
      return runEpic(
        fetchProjectAccessControlSystemListStart(
          ActionsObservable.of(actions.fetchProjectAccessControlSystemListStart(getProject_1().id, {})),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST, false, true, errorResponse)
          );
        }
      );
    });
  });

  describe('fetchAccessControlSystemProjectListStart', () => {
    const id = getAccessControlSystemDevice_1().id;

    it('should get epic for access-control-system fetch project related', () => {
      return runEpic(
        fetchAccessControlSystemProjectListStart(ActionsObservable.of(actions.fetchAccessControlSystemProjectListStart(id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, true));
          expect(deps.apiService.getAccessControlSystemList).toHaveBeenCalled();
          expect(actionList[1]).toEqual(generalState.actions.setModalMap([getAccessControlSystemDevice_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getAccessControlSystemList = () => throwError(error);
      return runEpic(
        fetchAccessControlSystemProjectListStart(ActionsObservable.of(actions.fetchAccessControlSystemProjectListStart(id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchProjectAccessControlSystemStart', () => {
    it('should get epic for access-control-system fetch assign project', () => {
      return runEpic(
        fetchProjectAccessControlSystemStart(
          ActionsObservable.of(actions.fetchProjectAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM, true));
          expect(deps.apiService.getProjectAccessControlSystem).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectAccessControlSystemSuccess(getProjectAccessControlSystem_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectAccessControlSystem = () => throwError(error);
      return runEpic(
        fetchProjectAccessControlSystemStart(
          ActionsObservable.of(actions.fetchProjectAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM, false, true, errorResponse));
        }
      );
    });
  });
});
