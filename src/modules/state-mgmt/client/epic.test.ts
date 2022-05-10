import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';
import { push } from 'connected-react-router';

import { IEpicDependencies } from '../rootState';
import {
  fetchClientListStart,
  fetchClientStart,
  fetchDraftClientStart,
  fetchMwbeTypesStart,
  fetchTradesStart,
  fetchProjectClientListStart,
  saveClientStart,
  inviteClientStart,
  updateDraftClientStart,
  sendApproveClientStart,
  approveClientStart,
  fetchClientSummaryStart,
  searchClientStart,
  deleteClientStart,
  updateClientStart,
  archiveClientStart,
  unarchiveClientStart,
  fetchSubContractorListStart,
  fetchUserClientListStart,
  fetchProjectClientHirearchyListStart,
  fetchSelfCompanyStart,
  fetchProjectClientSummaryStart,
  updateProjectClientTaxConditionStart,
} from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getClient_1, getMwbeType_1, getTrades_1, getProjectClientPagination_1, getProject_1, getClientProjectHirearchyList_1 } from '../../../test/entities';
import { GENERAL } from '../../../constants';
import { GeneralModel } from '../../../modules/models';
import { coreState } from '../core';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';
import { statisticsState } from '../statistics';
import { ToastType } from 'modules/models/general';

describe('client epics', () => {
  let deps: IEpicDependencies;
  let error;
  let errorResponse = { title: 'scary error' };
  const stateWithCompanyId = { value: { auth: { companyId: getClient_1().id } } };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });

  describe('fetchClientStart', () => {
    const id = getClient_1().id;

    it('should get epic for clients fetch client', () => {
      return runEpic(fetchClientStart(ActionsObservable.of(actions.fetchClientStart(id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, true));
        expect(deps.apiService.getClient).toHaveBeenCalledWith(id);
        expect(actionList[1]).toEqual(actions.fetchClientListSuccess([getClient_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClient = () => throwError(error);
      return runEpic(fetchClientStart(ActionsObservable.of(actions.fetchClientStart(id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('fetchSelfCompanyStart', () => {
    it('should get epic for clients fetch self company', () => {
      return runEpic(fetchSelfCompanyStart(ActionsObservable.of(actions.fetchSelfClientStart()), stateWithCompanyId as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY, true));
        expect(deps.apiService.getClient).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchSelfClientSuccess(getClient_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClient = () => throwError(error);
      return runEpic(fetchSelfCompanyStart(ActionsObservable.of(actions.fetchSelfClientStart()), stateWithCompanyId as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SELF_COMPANY, false, true, errorResponse));
      });
    });
  });

  describe('fetchDraftClientStart', () => {
    const id = getClient_1().id;

    it('should get epic for clients fetch draft client', () => {
      return runEpic(fetchDraftClientStart(ActionsObservable.of(actions.fetchDraftClientStart(id)), stateWithCompanyId as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, true));
        expect(deps.apiService.getDraftClient).toHaveBeenCalledWith(id);
        expect(actionList[1]).toEqual(actions.fetchClientListSuccess([getClient_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getDraftClient = () => throwError(error);
      return runEpic(fetchDraftClientStart(ActionsObservable.of(actions.fetchDraftClientStart(id)), stateWithCompanyId as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('sendApproveClientStart', () => {
    it('should get epic for send for approve client', () => {
      const stateMgmt = { value: { client: { clientMap: { [getClient_1().id]: getClient_1() } }, auth: { companyId: getClient_1().id } } };
      return runEpic(sendApproveClientStart(ActionsObservable.of(actions.sendApproveClientStart(getClient_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, true));
        expect(deps.apiService.sendApproveClient).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(push('/clients?filter="pending-approval"'));
        expect(actionList[2]).toEqual(
          generalState.actions.addToastStart(`Client created successfully! ${getClient_1().name} is pending approval now`, GeneralModel.ToastType.SUCCESS)
        );
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.sendApproveClient = () => throwError(error);
      return runEpic(
        sendApproveClientStart(ActionsObservable.of(actions.sendApproveClientStart(getClient_1().id)), stateWithCompanyId as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('deleteClientStart', () => {
    const stateMgmt = { value: { client: { clientMap: { [getClient_1().id]: getClient_1() } } } };
    it('should delete client and navigate to previous page', () => {
      const query = { filter: 'draft', page: 2, limit: 30, newPage: true };
      return runEpic(deleteClientStart(ActionsObservable.of(actions.deleteClientStart(getClient_1().id, query)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, true));
        expect(deps.apiService.deleteClient).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(push(`/clients?filter="draft"&page=1&limit=30`));
        expect(actionList[2]).toEqual(statisticsState.actions.fetchClientStatisticsStart());
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(`Robert C. Martin deleted successfully!`, GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, false));
      });
    });

    it('should delete client and fetch client list', () => {
      const query = { filter: 'draft', page: 2, limit: 30, newPage: false };
      return runEpic(deleteClientStart(ActionsObservable.of(actions.deleteClientStart(getClient_1().id, query)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, true));
        expect(deps.apiService.deleteClient).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(actions.fetchClientListStart(query));
        expect(actionList[2]).toEqual(statisticsState.actions.fetchClientStatisticsStart());
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(`Robert C. Martin deleted successfully!`, GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      const query = { filter: 'draft', page: 1, limit: 30, newPage: false };
      deps.apiService.deleteClient = () => throwError(error);
      return runEpic(deleteClientStart(ActionsObservable.of(actions.deleteClientStart(getClient_1().id, query)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_CLIENT, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('approveClientStart', () => {
    it('should get epic for approve client', () => {
      const stateMgmt = { value: { client: { clientMap: { [getClient_1().id]: getClient_1() } } } };
      return runEpic(approveClientStart(ActionsObservable.of(actions.approveClientStart(getClient_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_CLIENT, true));
        expect(deps.apiService.approveClient).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(push('/clients?filter="active"'));
        expect(actionList[2]).toEqual(
          generalState.actions.addToastStart(`Client approved successfully! ${getClient_1().name} is active now`, GeneralModel.ToastType.SUCCESS)
        );
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.approveClient = () => throwError(error);
      return runEpic(approveClientStart(ActionsObservable.of(actions.approveClientStart(getClient_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_CLIENT, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('fetchClientListStart', () => {
    it('should get epic for clients fetch client list', () => {
      return runEpic(fetchClientListStart(ActionsObservable.of(actions.fetchClientListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, true));
        expect(deps.apiService.getClientList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchClientListSuccess([getClient_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientList = () => throwError(error);
      return runEpic(fetchClientListStart(ActionsObservable.of(actions.fetchClientListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchUserClientListStart', () => {
    it('should get epic for clients fetch client list', () => {
      return runEpic(fetchUserClientListStart(ActionsObservable.of(actions.fetchUserClientListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, true));
        expect(deps.apiService.getProjectClientList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchClientListSuccess([getClient_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProjectClientList = () => throwError(error);
      return runEpic(fetchUserClientListStart(ActionsObservable.of(actions.fetchUserClientListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchMwbeTypesStart', () => {
    it('should get epic for clients mwbe list', () => {
      return runEpic(fetchMwbeTypesStart(ActionsObservable.of(actions.fetchMWbeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_MBE_WBE, true));
        expect(deps.apiService.getMwbeTypes).toHaveBeenCalledWith();
        expect(actionList[1]).toEqual(actions.fetchMWbeListSuccess(getMwbeType_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_MBE_WBE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getMwbeTypes = () => throwError(error);
      return runEpic(fetchMwbeTypesStart(ActionsObservable.of(actions.fetchMWbeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_MBE_WBE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_MBE_WBE, false, true, errorResponse));
      });
    });
  });

  describe('fetchTrades', () => {
    it('should get epic for trades list', () => {
      return runEpic(fetchTradesStart(ActionsObservable.of(actions.fetchTradesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADES, true));
        expect(deps.apiService.getTrades).toHaveBeenCalledWith();
        expect(actionList[1]).toEqual(actions.fetchTradesSuccess(getTrades_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADES, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getTrades = () => throwError(error);
      return runEpic(fetchTradesStart(ActionsObservable.of(actions.fetchTradesStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADES, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADES, false, true, errorResponse));
      });
    });
  });

  describe('saveClientStart', () => {
    it('should get epic for save client', () => {
      return runEpic(
        saveClientStart(
          ActionsObservable.of(actions.saveClientStart(getClient_1(), { key: 'general-information' } as any, true, 'relation-id')),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true));
          expect(deps.apiService.saveClient).toHaveBeenCalledWith(getClient_1());
          expect(actionList[1]).toEqual(actions.fetchClientListSuccess([getClient_1()], 1));
          expect(actionList[2]).toEqual(push(`/clients/wizard/${getClient_1().id}/general-information`, { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.setRelationUiId('relation-id', { clientId: getClient_1().id }));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveClient = () => throwError(error);
      return runEpic(
        saveClientStart(ActionsObservable.of(actions.saveClientStart(getClient_1(), { key: 'general-information' } as any)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false, true, errorResponse));
        }
      );
    });

    it('should catch relation errors', () => {
      const customError = { response: { errors: { name: ['In use'] } } };
      deps.apiService.saveClient = () => throwError(customError);
      return runEpic(
        saveClientStart(
          ActionsObservable.of(actions.saveClientStart(getClient_1(), { key: 'general-information' } as any, true, 'relationId')),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(customError));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false, true, { errors: { name: ['In use'] } }));
          expect(actionList[3]).toEqual(generalState.actions.setRelationUiId('relationId', { error: 'Client Name is already in use.' }));
        }
      );
    });
  });

  describe('inviteClientStart', () => {
    it('should get epic for invite draft client', () => {
      return runEpic(inviteClientStart(ActionsObservable.of(actions.inviteDraftClientStart(getClient_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT, true));
        expect(deps.apiService.inviteDraftClient).toHaveBeenCalledWith(getClient_1());
        expect(actionList[1]).toEqual(actions.inviteDraftClientSuccess(getClient_1()));
        expect(actionList[2]).toEqual(push('/clients?filter="onboarding"', { success: true }));
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT, false));
        expect(actionList[4]).toEqual(
          generalState.actions.addToastStart(`Client invited successfully! ${getClient_1().name} is in Invitation Sent now.`, ToastType.SUCCESS)
        );
      });
    });

    it('should catch errors', () => {
      deps.apiService.inviteDraftClient = () => throwError(error);
      return runEpic(inviteClientStart(ActionsObservable.of(actions.inviteDraftClientStart(getClient_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('updateDraftClientStart', () => {
    it('should get epic for update draft client', () => {
      return runEpic(updateDraftClientStart(ActionsObservable.of(actions.updateDraftClientStart(getClient_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true));
        expect(deps.apiService.updateDraftClient).toHaveBeenCalledWith(getClient_1());
        expect(actionList[1]).toEqual(actions.updateDraftClientSuccess(getClient_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateDraftClient = () => throwError(error);
      return runEpic(updateDraftClientStart(ActionsObservable.of(actions.updateDraftClientStart(getClient_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('updateClientStart', () => {
    it('should get epic for update client', () => {
      return runEpic(updateClientStart(ActionsObservable.of(actions.updateClientStart(getClient_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_CLIENT, true));
        expect(deps.apiService.updateClient).toHaveBeenCalledWith(getClient_1());
        expect(actionList[1]).toEqual(actions.updateClientSuccess(getClient_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_CLIENT, false));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateClient = () => throwError(error);
      return runEpic(updateClientStart(ActionsObservable.of(actions.updateClientStart(getClient_1())), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('archiveClientStart', () => {
    const stateMgmt = { value: { client: { clientMap: { [getClient_1().id]: getClient_1() } } } };
    it('should get epic for archive client', () => {
      return runEpic(archiveClientStart(ActionsObservable.of(actions.archiveClientStart(getClient_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, true));
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, true));
        expect(deps.apiService.archiveClient).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(actions.archiveClientSuccess(getClient_1().id));
        expect(actionList[2]).toEqual(push(`/clients/detail/${getClient_1().id}/information`));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(`Robert C. Martin archived successfully!`, GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.archiveClient = () => throwError(error);
      return runEpic(archiveClientStart(ActionsObservable.of(actions.archiveClientStart(getClient_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_CLIENT, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('unarchiveClientStart', () => {
    it('should get epic for archive client', () => {
      const stateMgmt = { value: { client: { clientMap: { [getClient_1().id]: getClient_1() } } } };
      return runEpic(unarchiveClientStart(ActionsObservable.of(actions.unarchiveClientStart(getClient_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, true));
        expect(deps.apiService.unarchiveClient).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(actions.unarchiveClientSuccess(getClient_1().id));
        expect(actionList[2]).toEqual(push(`/clients/detail/${getClient_1().id}/information`));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(`Robert C. Martin unarchived successfully!`, GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      const stateMgmt = { value: { client: { clientMap: { [getClient_1().id]: getClient_1() } } } };
      deps.apiService.unarchiveClient = () => throwError(error);
      return runEpic(unarchiveClientStart(ActionsObservable.of(actions.unarchiveClientStart(getClient_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_CLIENT, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('fetchClientSummaryStart', () => {
    it('should get epic for summary client', () => {
      return runEpic(fetchClientSummaryStart(ActionsObservable.of(actions.fetchClientSummaryStart(getClient_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY, true));
        expect(deps.apiService.getClientSummary).toHaveBeenCalledWith(getClient_1().id);
        expect(actionList[1]).toEqual(actions.updateClientSuccess(getClient_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientSummary = () => throwError(error);
      return runEpic(fetchClientSummaryStart(ActionsObservable.of(actions.fetchClientSummaryStart(getClient_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY, false, true, errorResponse));
      });
    });
  });

  describe('searchClientStart', () => {
    it('should get epic for general search', () => {
      return runEpic(searchClientStart(ActionsObservable.of(actions.searchClientStart({} as any, 'tempid')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT, true));
        expect(deps.apiService.searchClient).toHaveBeenCalledWith({});
        expect(actionList[1]).toEqual(generalState.actions.setRelationUiId('tempid', { searchResult: [] }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.searchClient = () => throwError(error);
      return runEpic(searchClientStart(ActionsObservable.of(actions.searchClientStart({} as any, 'tempid')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT, false, true, errorResponse));
      });
    });
  });

  describe('fetchProjectClientListStart', () => {
    const id = getClient_1().id;
    it('should get epic for project fetch client list', () => {
      return runEpic(fetchProjectClientListStart(ActionsObservable.of(actions.fetchProjectClientListStart(id, {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST, true));
        expect(deps.apiService.getProjectClientList).toHaveBeenCalledWith(id, {});
        expect(actionList[1]).toEqual(
          actions.fetchProjectClientListSuccess(id, getProjectClientPagination_1().items, getProjectClientPagination_1().totalResults)
        );
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProjectClientList = () => throwError(error);
      return runEpic(
        fetchProjectClientListStart(ActionsObservable.of(actions.fetchProjectClientListStart(id, { page: 1, limit: 15 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchSubContractorListStart', () => {
    it('should get epic for project fetch client list', () => {
      return runEpic(fetchSubContractorListStart(ActionsObservable.of(actions.fetchSubcontractorListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST, true));
        expect(deps.apiService.getClientList).toHaveBeenCalledWith({});
        expect(actionList[1]).toEqual(generalState.actions.setModalMap(getProjectClientPagination_1().items, getProjectClientPagination_1().totalResults));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientList = () => throwError(error);
      return runEpic(fetchSubContractorListStart(ActionsObservable.of(actions.fetchSubcontractorListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchProjectClientHirearchyListStart', () => {
    it('should get epic for project fetch client hirearchy list', () => {
      return runEpic(
        fetchProjectClientHirearchyListStart(ActionsObservable.of(actions.fetchProjectClientHirearchyListStart(getProject_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST, true));
          expect(deps.apiService.getProjectClientHirearchyList).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectClientHirearchyListSuccess(getClientProjectHirearchyList_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectClientHirearchyList = () => throwError(error);
      return runEpic(
        fetchProjectClientHirearchyListStart(ActionsObservable.of(actions.fetchProjectClientHirearchyListStart(getProject_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchProjectClientSummaryStart', () => {
    it('should get epic for project fetch client summary', () => {
      return runEpic(
        fetchProjectClientSummaryStart(ActionsObservable.of(actions.fetchProjectClientSummaryStart('pId', 'cId')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY, true));
          expect(deps.apiService.getProjectClientSummary).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchProjectClientSummarySuccess('pId', getClient_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectClientSummary = () => throwError(error);
      return runEpic(
        fetchProjectClientSummaryStart(ActionsObservable.of(actions.fetchProjectClientSummaryStart('pId', 'cId')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY, false, true, errorResponse));
        }
      );
    });
  });

  describe('updateProjectClientTaxConditionStart', () => {
    const taxCondition = { companyId: 'cId', isTaxExempt: true };
    it('should get epic for project update client tax condition summary', () => {
      return runEpic(
        updateProjectClientTaxConditionStart(ActionsObservable.of(actions.updateProjectClientTaxConditionStart('pId', taxCondition)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION, true));
          expect(deps.apiService.updateClientProjectTaxCondition).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.updateProjectClientTaxConditionSuccess('pId', 'cId', true));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.updateClientProjectTaxCondition = () => throwError(error);
      return runEpic(
        updateProjectClientTaxConditionStart(ActionsObservable.of(actions.updateProjectClientTaxConditionStart('pId', taxCondition)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION, false, true, errorResponse));
        }
      );
    });
  });
});
