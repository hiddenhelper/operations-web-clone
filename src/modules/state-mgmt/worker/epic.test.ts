import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { push } from 'connected-react-router';
import { IEpicDependencies } from '../rootState';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { coreState } from '../core';
import { generalState } from '../general';
import {
  saveWorkerStart,
  fetchWorkerStart,
  updateWorkerStart,
  fetchEthnicityListStart,
  fetchLanguageListStart,
  fetchSkilledTradeListStart,
  fetchWorkerListStart,
  fetchIdentificationTypeListStart,
  fetchWorkerProjectListStart,
  fetchProjectWorkerListStart,
  fetchWorkerProjectAssignListStart,
  fetchClientWorkerListStart,
  fetchConsentFormStart,
  saveConsentFormStart,
  fetchWorkerActivityListStart,
  fetchWorkerObservationListStart,
  fetchWorkerObservationStart,
  downloadConsentFormStart,
  fetchGeographicLocationsListStart,
  fetchJobTitlesStart,
  fetchSocJobTitlesStart,
  fetchTradeStatusesStart,
  fetchLanguageTurnerProtocolsStart,
} from './epics';
import { actions } from './actions';
import { GENERAL } from '../../../constants';
import {
  getEthnicity_1,
  getIdentificationType_1,
  getJobTitle_1,
  getPrimaryLanguage_1,
  getSkilledTrade_1,
  getWorker_1,
  getWorkerActivity_1,
  getProject_1,
  getClient_1,
  getClientWorkerPagination_1,
  getConsentForm_1,
  getExistingWorkerResponse,
  getWorkerObservation_1,
  getGeographicLocation_1,
  getSocJobTitle_1,
  getLanguageTurnerProtocol_1,
  getTradeStatus_1,
} from '../../../test/entities';
import { GeneralModel, UserModel } from '../../models';
import { ToastType } from '../../models/general';

describe('worker epics', () => {
  let deps: IEpicDependencies;
  let stateMgmtAdmin = { value: { auth: { role: UserModel.Role.FCA_ADMIN } } };
  let stateMgmtClient = { value: { auth: { role: UserModel.Role.CLIENT_ADMIN } } };
  let error;
  let errorResponse = { title: 'scary error' };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });

  describe('saveWorkerStart', () => {
    it.skip('should get epic for save worker', () => {
      return runEpic(saveWorkerStart(ActionsObservable.of(actions.saveWorkerStart(getWorker_1())), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true));
        expect(deps.apiService.saveWorker).toHaveBeenCalledWith(getWorker_1());
        expect(actionList[1]).toEqual(actions.fetchWorkerListSuccess([getWorker_1()], 1));
        expect(actionList[2]).toEqual(push('/workers', { success: true }));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Worker created successfully! Invitation sent.', GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false));
      });
    });

    it('should get epic for save self worker', () => {
      return runEpic(saveWorkerStart(ActionsObservable.of(actions.saveWorkerStart(getWorker_1())), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true));
        expect(deps.apiService.saveSelfWorker).toHaveBeenCalledWith(getWorker_1());
        expect(actionList[1]).toEqual(actions.fetchWorkerListSuccess([getWorker_1()], 1));
        expect(actionList[2]).toEqual(push('/workers', { success: true }));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Worker created successfully! Invitation sent.', GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false));
      });
    });

    it.skip('should catch errors', () => {
      deps.apiService.saveWorker = () => throwError(error);
      return runEpic(saveWorkerStart(ActionsObservable.of(actions.saveWorkerStart(getWorker_1())), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
      });
    });

    it.skip('should catch existing worker error', () => {
      deps.apiService.saveWorker = () => throwError({ response: getExistingWorkerResponse() });
      return runEpic(saveWorkerStart(ActionsObservable.of(actions.saveWorkerStart(getWorker_1())), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ response: getExistingWorkerResponse() }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false, true, getExistingWorkerResponse()));
      });
    });
  });

  describe('fetchWorkerActivityListStart', () => {
    it('should get epic for fetch workers activity list start', () => {
      return runEpic(
        fetchWorkerActivityListStart(ActionsObservable.of(actions.fetchWorkerActivityStart(getWorker_1().id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST, true));
          expect(actionList[1]).toEqual(actions.fetchWorkerActivitySuccess([getWorkerActivity_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST, false));
        }
      );
    });
    it('should catch errors', () => {
      deps.apiService.getWorkerActivityList = () => throwError(error);
      return runEpic(
        fetchWorkerActivityListStart(ActionsObservable.of(actions.fetchWorkerActivityStart(getWorker_1().id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkerObservationListStart', () => {
    it('should get epic for fetch workers observation list start', () => {
      return runEpic(
        fetchWorkerObservationListStart(ActionsObservable.of(actions.fetchWorkerObservationListStart(getWorker_1().id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST, true));
          expect(actionList[1]).toEqual(actions.fetchWorkerObservationsSuccess([getWorkerObservation_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST, false));
        }
      );
    });
    it('should catch errors', () => {
      deps.apiService.getWorkerObservationList = () => throwError(error);
      return runEpic(
        fetchWorkerObservationListStart(ActionsObservable.of(actions.fetchWorkerObservationListStart(getWorker_1().id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkerStart', () => {
    const id = getWorker_1().id;

    it('should get epic for workers fetch worker', () => {
      return runEpic(fetchWorkerStart(ActionsObservable.of(actions.fetchWorkerStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER, true));
        expect(deps.apiService.getWorker).toHaveBeenCalledWith(id);
        expect(actionList[1]).toEqual(actions.updateWorkerSuccess(getWorker_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorker = () => throwError(error);
      return runEpic(fetchWorkerStart(ActionsObservable.of(actions.fetchWorkerStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkerObservationStart', () => {
    const id = getWorkerObservation_1().id;

    it('should get epic for workers fetch worker observation', () => {
      return runEpic(
        fetchWorkerObservationStart(ActionsObservable.of(actions.fetchWorkerObservationStart('1', id)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION, true));
          expect(deps.apiService.getWorkerObservation).toHaveBeenCalledWith('1', id);
          expect(actionList[1]).toEqual(actions.fetchWorkerObservationSuccess(getWorkerObservation_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerObservation = () => throwError(error);
      return runEpic(fetchWorkerObservationStart(ActionsObservable.of(actions.fetchWorkerObservationStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION, false, true, errorResponse));
      });
    });
  });

  describe('updateWorkerStart', () => {
    it('should get epic for update worker', () => {
      return runEpic(updateWorkerStart(ActionsObservable.of(actions.updateWorkerStart(getWorker_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true));
        expect(deps.apiService.updateWorker).toHaveBeenCalledWith(getWorker_1());
        expect(actionList[1]).toEqual(actions.updateWorkerSuccess(getWorker_1()));
        expect(actionList[2]).toEqual(push(`/workers/detail/${getWorker_1().id}`, { success: true }));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Worker updated successfully!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateWorker = () => throwError(error);
      return runEpic(updateWorkerStart(ActionsObservable.of(actions.updateWorkerStart(getWorker_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('fetchWorkerListStart', () => {
    it.skip('should get epic for workers fetch worker list', () => {
      return runEpic(fetchWorkerListStart(ActionsObservable.of(actions.fetchWorkerListStart({} as any)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true));
        expect(deps.apiService.getWorkerList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkerListSuccess([getWorker_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false));
      });
    });

    it('should get epic for workers fetch self worker list', () => {
      return runEpic(fetchWorkerListStart(ActionsObservable.of(actions.fetchWorkerListStart({} as any)), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true));
        expect(deps.apiService.getSelfWorkerList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkerListSuccess([getWorker_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false));
      });
    });

    it.skip('should catch errors', () => {
      deps.apiService.getWorkerList = () => throwError(error);
      return runEpic(fetchWorkerListStart(ActionsObservable.of(actions.fetchWorkerListStart({} as any)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchEthnicityListStart', () => {
    it('should get epic for worker fetch ethnicities', () => {
      return runEpic(fetchEthnicityListStart(ActionsObservable.of(actions.fetchEthnicityListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST, true));
        expect(deps.apiService.getEthnicities).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchEthnicityListSuccess([getEthnicity_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getEthnicities = () => throwError(error);
      return runEpic(fetchEthnicityListStart(ActionsObservable.of(actions.fetchEthnicityListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchLanguageListStart', () => {
    it('should get epic for worker fetch languages', () => {
      return runEpic(fetchLanguageListStart(ActionsObservable.of(actions.fetchLanguageListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST, true));
        expect(deps.apiService.getLanguages).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchLanguageListSuccess([getPrimaryLanguage_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getLanguages = () => throwError(error);
      return runEpic(fetchLanguageListStart(ActionsObservable.of(actions.fetchLanguageListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchSkilledTradeListStart', () => {
    it('should get epic for worker fetch skilled trades', () => {
      return runEpic(fetchSkilledTradeListStart(ActionsObservable.of(actions.fetchSkilledTradeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST, true));
        expect(deps.apiService.getSkilledTrades).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchSkilledTradeListSuccess([getSkilledTrade_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getSkilledTrades = () => throwError(error);
      return runEpic(fetchSkilledTradeListStart(ActionsObservable.of(actions.fetchSkilledTradeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchWorkerProjectListStart', () => {
    it('should get epic for worker fetch worker project list', () => {
      return runEpic(fetchWorkerProjectListStart(ActionsObservable.of(actions.fetchProjectListStart(getWorker_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST, true));
        expect(deps.apiService.getWorkerProjectNameList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchProjectListSuccess([{ id: getProject_1().id, name: getProject_1().name }]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerProjectNameList = () => throwError(error);
      return runEpic(fetchWorkerProjectListStart(ActionsObservable.of(actions.fetchProjectListStart(getWorker_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchIdentificationTypeListStart', () => {
    it('should get epic for worker fetch identification type', () => {
      return runEpic(fetchIdentificationTypeListStart(ActionsObservable.of(actions.fetchIdentificationTypeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE, true));
        expect(deps.apiService.getIdentificationTypes).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchIdentificationTypeListSuccess([getIdentificationType_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getIdentificationTypes = () => throwError(error);
      return runEpic(fetchIdentificationTypeListStart(ActionsObservable.of(actions.fetchIdentificationTypeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE, false, true, errorResponse));
      });
    });
  });

  describe('fetchProjectWorkerListStart', () => {
    it('should get epic for worker project list start', () => {
      return runEpic(
        fetchProjectWorkerListStart(ActionsObservable.of(actions.fetchProjectWorkerListStart(getProject_1().id, {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST, true));
          expect(deps.apiService.getProjectWorkerList).toHaveBeenCalledWith({ id: getProject_1().id, query: {} });
          expect(actionList[1]).toEqual(actions.fetchProjectWorkerListSuccess(getProject_1().id, [getWorker_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectWorkerList = () => throwError(error);
      return runEpic(
        fetchProjectWorkerListStart(ActionsObservable.of(actions.fetchProjectWorkerListStart(getProject_1().id, {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchWorkerProjectAssignListStart', () => {
    it('should get epic for worker assign list start', () => {
      return runEpic(
        fetchWorkerProjectAssignListStart(ActionsObservable.of(actions.fetchWorkerProjectAssignListStart({ page: 1, limit: 15 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true));
          expect(deps.apiService.getWorkerList).toHaveBeenCalledWith({ page: 1, limit: 15 });
          expect(actionList[1]).toEqual(generalState.actions.setModalMap([getWorker_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerList = () => throwError(error);
      return runEpic(
        fetchWorkerProjectAssignListStart(ActionsObservable.of(actions.fetchWorkerProjectAssignListStart({ page: 1, limit: 15 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchClientWorkerListStart', () => {
    const id = getClient_1().id;

    it('should get epic for clients fetch worker list', () => {
      return runEpic(fetchClientWorkerListStart(ActionsObservable.of(actions.fetchClientWorkerListStart(id, {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST, true));
        expect(deps.apiService.getClientWorkerList).toHaveBeenCalledWith(id, {});
        expect(actionList[1]).toEqual(
          actions.fetchClientWorkerListSuccess(id, getClientWorkerPagination_1().items, getClientWorkerPagination_1().totalResults)
        );
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientWorkerList = () => throwError(error);
      return runEpic(fetchClientWorkerListStart(ActionsObservable.of(actions.fetchClientWorkerListStart(id, {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchConsentFormStart', () => {
    it('should get epic for worker fetch consentForm', () => {
      return runEpic(
        fetchConsentFormStart(ActionsObservable.of(actions.fetchConsentFormStart(getWorker_1().id, getProject_1().id, false)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, true));
          expect(deps.apiService.getConsentForm).toHaveBeenCalledWith(getWorker_1().id, getProject_1().id);
          expect(actionList[1]).toEqual(actions.fetchConsentFormSuccess(getConsentForm_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, false));
        }
      );
    });

    it('should get epic for worker fetch editable consentForm', () => {
      return runEpic(
        fetchConsentFormStart(ActionsObservable.of(actions.fetchConsentFormStart(getWorker_1().id, getProject_1().id, true)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, true));
          expect(deps.apiService.getEditableConsentForm).toHaveBeenCalledWith(getWorker_1().id, getProject_1().id);
          expect(actionList[1]).toEqual(actions.fetchConsentFormSuccess(getConsentForm_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getConsentForm = () => throwError(error);
      return runEpic(
        fetchConsentFormStart(ActionsObservable.of(actions.fetchConsentFormStart(getWorker_1().id, getProject_1().id, false)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, false, true, errorResponse));
        }
      );
    });
  });

  describe('saveConsentFormStart', () => {
    it('should get epic for workers save consent form', () => {
      return runEpic(
        saveConsentFormStart(
          ActionsObservable.of(actions.saveConsentFormStart(getWorker_1().id, getProject_1().id, getConsentForm_1())),
          stateMgmtAdmin as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, true));
          expect(deps.apiService.saveConsentForm).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchConsentFormSuccess(getConsentForm_1()));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Consent form edited successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveConsentForm = () => throwError(error);
      return runEpic(
        saveConsentFormStart(
          ActionsObservable.of(actions.saveConsentFormStart(getWorker_1().id, getProject_1().id, getConsentForm_1())),
          stateMgmtAdmin as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, false, true, errorResponse));
        }
      );
    });
  });

  describe('downloadConsentFormStart', () => {
    it('should get epic for download consent form', () => {
      return runEpic(
        downloadConsentFormStart(ActionsObservable.of(actions.downloadConsentFormStart(getWorker_1().id, getProject_1().id, 'name')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM, true));
          expect(deps.apiService.downloadConsentForm).toHaveBeenCalledWith(getWorker_1().id, getProject_1().id);
          expect(deps.fileService.download).toHaveBeenCalled();
          expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.downloadConsentForm = () => throwError(error);
      return runEpic(
        downloadConsentFormStart(ActionsObservable.of(actions.downloadConsentFormStart(getWorker_1().id, getProject_1().id, 'name')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchGeographicLocationsListStart', () => {
    it('should get epic for worker fetch geographic locations list', () => {
      return runEpic(fetchGeographicLocationsListStart(ActionsObservable.of(actions.fetchGeographicLocationsListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS, true));
        expect(deps.apiService.getGeographicLocationsList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchGeographicLocationsListSuccess([getGeographicLocation_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getGeographicLocationsList = () => throwError(error);
      return runEpic(fetchGeographicLocationsListStart(ActionsObservable.of(actions.fetchGeographicLocationsListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS, false, true, errorResponse));
      });
    });
  });

  describe('fetchJobTitlesStart', () => {
    it('should get epic for worker fetch job titles list', () => {
      return runEpic(fetchJobTitlesStart(ActionsObservable.of(actions.fetchJobTitlesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_JOB_TITLES, true));
        expect(deps.apiService.getJobTitles).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchJobTitlesSuccess([getJobTitle_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_JOB_TITLES, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getJobTitles = () => throwError(error);
      return runEpic(fetchJobTitlesStart(ActionsObservable.of(actions.fetchJobTitlesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_JOB_TITLES, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_JOB_TITLES, false, true, errorResponse));
      });
    });
  });

  describe('fetchSocJobTitlesStart', () => {
    it('should get epic for worker fetch soc job titles list', () => {
      return runEpic(fetchSocJobTitlesStart(ActionsObservable.of(actions.fetchSocJobTitlesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES, true));
        expect(deps.apiService.getSocJobTitles).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchSocJobTitlesSuccess([getSocJobTitle_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getSocJobTitles = () => throwError(error);
      return runEpic(fetchSocJobTitlesStart(ActionsObservable.of(actions.fetchSocJobTitlesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES, false, true, errorResponse));
      });
    });
  });

  describe('fetchTradeStatusesStart', () => {
    it('should get epic for worker fetch trade statuses list', () => {
      return runEpic(fetchTradeStatusesStart(ActionsObservable.of(actions.fetchTradeStatusesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES, true));
        expect(deps.apiService.getTradeStatuses).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTradeStatusesSuccess([getTradeStatus_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getTradeStatuses = () => throwError(error);
      return runEpic(fetchTradeStatusesStart(ActionsObservable.of(actions.fetchTradeStatusesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES, false, true, errorResponse));
      });
    });
  });

  describe('fetchLanguageTurnerProtocolsStart', () => {
    it('should get epic for worker fetch language turner protocols list', () => {
      return runEpic(fetchLanguageTurnerProtocolsStart(ActionsObservable.of(actions.fetchLanguageTurnerProtocolsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS, true));
        expect(deps.apiService.getLanguageTurnerProtocols).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchLanguageTurnerProtocolsSuccess([getLanguageTurnerProtocol_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getLanguageTurnerProtocols = () => throwError(error);
      return runEpic(fetchLanguageTurnerProtocolsStart(ActionsObservable.of(actions.fetchLanguageTurnerProtocolsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS, false, true, errorResponse));
      });
    });
  });
});
