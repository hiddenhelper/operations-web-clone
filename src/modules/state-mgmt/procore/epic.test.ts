import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';
import {
  fetchProcoreClients,
  fetchStatusProcore,
  connectProcore,
  disconnectProcore,
  fetchProcoreProjects,
  fetchProcoreVendors,
  fetchProcoreVendorMappings,
  fetchProcoreProjectMappings,
  saveProcoreVendorMappings,
  saveProcoreProjectMappings,
  fetchProcoreReportFrequency,
  saveProcoreReportFrequency,
} from './epics';
import { actions } from './actions';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';
import { UserModel } from '../../../modules/models';
import { getDeps } from '../../../test/epicDependencies';
import { IEpicDependencies } from '../rootState';

describe('Procore Integration', () => {
  let deps: IEpicDependencies;
  let error;
  let errorResponse = { title: 'scary error' };
  let stateMgmtAdmin = { value: { auth: { role: UserModel.Role.FCA_ADMIN } } };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });
  describe('fetchProcoreClients', () => {
    it('should get epic for get Procore clients', () => {
      return runEpic(fetchProcoreClients(ActionsObservable.of(actions.getProcoreClientsStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, true));
        expect(deps.apiService.getProcoreClients).toHaveBeenCalled();
        expect(actionList[1]).toEqual({ type: '[procore] get clients success', payload: undefined });
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProcoreClients = () => throwError(error);
      return runEpic(fetchProcoreClients(ActionsObservable.of(actions.getProcoreClientsStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, false, true, error));
      });
    });
  });

  describe('fetchStatusProcore', () => {
    it('should get epic for status of Procore', () => {
      return runEpic(fetchStatusProcore(ActionsObservable.of(actions.getStatusProcoreStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE, true));
        expect(deps.apiService.getStatusProcore).toHaveBeenCalled();
        expect(actionList[1]).toEqual({ type: '[procore] get status procore success', payload: { status: { isConnected: false } } });
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getStatusProcore = () => throwError(error);
      return runEpic(fetchStatusProcore(ActionsObservable.of(actions.getStatusProcoreStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE, false, true, errorResponse));
      });
    });
  });

  describe('connectProcore', () => {
    const data = { clientId: '123', clientSecret: '321' };
    it('should get epic for connect Procore', () => {
      return runEpic(connectProcore(ActionsObservable.of(actions.connectProcoreStart(data)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE, true));
        expect(deps.apiService.connectProcore).toHaveBeenCalledTimes(1);
        expect(actionList[1]).toEqual({ type: '[procore] connect procore success', payload: undefined });
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.connectProcore = () => throwError(error);
      return runEpic(connectProcore(ActionsObservable.of(actions.connectProcoreStart(data)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE, false, true, errorResponse));
      });
    });
  });

  describe('disconnectProcore', () => {
    it('should get epic for disconnectProcore', () => {
      return runEpic(disconnectProcore(ActionsObservable.of(actions.disconnectProcoreStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DISCONNECT_PROCORE, true));
        expect(deps.apiService.disconnectProcore).toHaveBeenCalledTimes(1);
        expect(actionList[1]).toEqual({ type: '[procore] disconnect procore success', payload: undefined });
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DISCONNECT_PROCORE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.disconnectProcore = () => throwError(error);
      return runEpic(disconnectProcore(ActionsObservable.of(actions.disconnectProcoreStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DISCONNECT_PROCORE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DISCONNECT_PROCORE, false, true, errorResponse));
      });
    });
  });

  describe('fetchProcoreProjects', () => {
    const clientId = 'aaa-111';
    it('should get epic for get Procore porjects', () => {
      return runEpic(fetchProcoreProjects(ActionsObservable.of(actions.fetchProcoreProjectsStart(clientId)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, true));
        expect(deps.apiService.getProcoreProjects).toHaveBeenCalledWith(clientId);
        expect(actionList[1]).toEqual({ type: '[procore] fetch procore projects success', payload: { clientId, projects: undefined } });
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProcoreProjects = () => throwError(error);
      return runEpic(fetchProcoreProjects(ActionsObservable.of(actions.fetchProcoreProjectsStart(clientId)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, false, true, errorResponse));
      });
    });
  });

  describe('fetchProcoreProjectMappings', () => {
    const clientId = 'aaa-111';
    it('should get epic for get Procore porject mappings', () => {
      return runEpic(
        fetchProcoreProjectMappings(ActionsObservable.of(actions.fetchProcoreProjectMappingsStart(clientId)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, true));
          expect(deps.apiService.getProcoreProjectMappings).toHaveBeenCalledWith(clientId);
          expect(actionList[1]).toEqual({ type: '[procore] fetch procore project mappings success', payload: { clientId, projects: undefined } });
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProcoreProjectMappings = () => throwError(error);
      return runEpic(
        fetchProcoreProjectMappings(ActionsObservable.of(actions.fetchProcoreProjectMappingsStart(clientId)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchProcoreVendors', () => {
    const clientId = 'aaa-111';
    it('should get epic for get Procore vendors', () => {
      return runEpic(fetchProcoreVendors(ActionsObservable.of(actions.fetchProcoreVendorsStart(clientId)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, true));
        expect(deps.apiService.getProcoreVendors).toHaveBeenCalledWith(clientId);
        expect(actionList[1]).toEqual({ type: '[procore] fetch procore vendors success', payload: { clientId, projects: undefined } });
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProcoreVendors = () => throwError(error);
      return runEpic(fetchProcoreVendors(ActionsObservable.of(actions.fetchProcoreVendorsStart(clientId)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, false, true, errorResponse));
      });
    });
  });

  describe('fetchProcoreVendorMappings', () => {
    const clientId = 'aaa-111';
    it('should get epic for get Procore vendor mappings', () => {
      return runEpic(
        fetchProcoreVendorMappings(ActionsObservable.of(actions.fetchProcoreVendorMappingsStart(clientId)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, true));
          expect(deps.apiService.getProcoreVendorMappings).toHaveBeenCalledWith(clientId);
          expect(actionList[1]).toEqual({ type: '[procore] fetch procore vendor mappings success', payload: { clientId, projects: undefined } });
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProcoreVendorMappings = () => throwError(error);
      return runEpic(
        fetchProcoreVendorMappings(ActionsObservable.of(actions.fetchProcoreVendorMappingsStart(clientId)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, false, true, errorResponse));
        }
      );
    });
  });

  describe('saveProcoreVendorMappings', () => {
    const clientId = 'aaa-111';
    const mappings = [];
    it('should get epic for save Procore vendor mappings', () => {
      return runEpic(
        saveProcoreVendorMappings(ActionsObservable.of(actions.saveProcoreVendorMappingsStart(clientId, mappings)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, true));
          expect(deps.apiService.saveProcoreVendorMappings).toHaveBeenCalledWith(clientId, mappings);
          // expect(actionList[1]).toEqual({ type: '[procore] save procore vendor mappings success', payload: { clientId, mappings } });
          // expect(actionList[2]).toEqual({ type: '[procore] fetch procore vendor mappings start', payload: clientId });
          // expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveProcoreVendorMappings = () => throwError(error);
      return runEpic(
        saveProcoreVendorMappings(ActionsObservable.of(actions.saveProcoreVendorMappingsStart(clientId, mappings)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, true));
          // expect(actionList[2]).toEqual(coreState.actions.epicError(error));
          // expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, false, true, error));
        }
      );
    });
  });

  describe('saveProcoreProjectMappings', () => {
    const clientId = 'aaa-111';
    const mappings = [];
    it('should get epic for save Procore vendor mappings', () => {
      return runEpic(
        saveProcoreProjectMappings(ActionsObservable.of(actions.saveProcoreProjectMappingsStart(clientId, mappings)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_PROJECT_MAPPINGS, true));
          expect(deps.apiService.saveProcoreProjectMappings).toHaveBeenCalledWith(clientId, mappings);
          // expect(actionList[1]).toEqual({ type: '[procore] save procore vendor mappings success', payload: { clientId, mappings } });
          // expect(actionList[2]).toEqual({ type: '[procore] fetch procore vendor mappings start', payload: clientId });
          // expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveProcoreProjectMappings = () => throwError(error);
      return runEpic(
        saveProcoreProjectMappings(ActionsObservable.of(actions.saveProcoreProjectMappingsStart(clientId, mappings)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_PROJECT_MAPPINGS, true));
          // expect(actionList[2]).toEqual(coreState.actions.epicError(error));
          // expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, false, true, error));
        }
      );
    });
  });

  describe('fetchProcoreReportFrequency', () => {
    const clientId = 'aaa-111';
    it('should fetch report frequency', () => {
      return runEpic(
        fetchProcoreReportFrequency(ActionsObservable.of(actions.fetchProcoreReportFrequencyStart(clientId)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_REPORT_FREQUENCY, true));
          expect(deps.apiService.getReportFrequency).toHaveBeenCalledWith(clientId);
          expect(actionList[1]).toEqual({ type: '[procore] fetch procore report frequency success', payload: { frequency: undefined } });
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_REPORT_FREQUENCY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getReportFrequency = () => throwError(error);
      return runEpic(
        fetchProcoreReportFrequency(ActionsObservable.of(actions.fetchProcoreReportFrequencyStart(clientId)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_REPORT_FREQUENCY, true));
        }
      );
    });
  });

  describe('putProcoreReportFrequency', () => {
    const clientId = 'aaa-111';
    const frequency = 1;
    it('should save report frequency', () => {
      return runEpic(
        saveProcoreReportFrequency(ActionsObservable.of(actions.saveProcoreReportFrequencyStart(clientId, frequency)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_REPORT_FREQUENCY, true));
          expect(deps.apiService.saveReportFrequency).toHaveBeenCalledWith(clientId, frequency);
        }
      );
    });

    it('should catch errors', () => {
      return runEpic(
        saveProcoreReportFrequency(ActionsObservable.of(actions.saveProcoreReportFrequencyStart(clientId, frequency)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_REPORT_FREQUENCY, true));
        }
      );
    });
  });
});
