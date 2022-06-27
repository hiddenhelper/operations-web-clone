import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';
import { push } from 'connected-react-router';

import { IEpicDependencies } from '../rootState';
import {
  fetchProjectStart,
  fetchDraftProjectStart,
  fetchProjectListStart,
  saveProjectStart,
  updateDraftProjectStart,
  fetchCategoryListStart,
  fetchRegionListStart,
  fetchFcaNaeListStart,
  fetchClientProjectListStart,
  fetchProjectSummaryStart,
  sendApproveProjectStart,
  approveProjectStart,
  fetchBillingTierListStart,
  deleteProjectStart,
  assignClientProjectStart,
  updateProjectStart,
  archiveProjectStart,
  unarchiveProjectStart,
  assignUserProjectStart,
  acceptProjectInvitationStart,
  assignAccessControlSystemProjectStart,
  unassignAccessControlSystemProjectStart,
  unassignBadgePrintingSystemProjectStart,
  assignBadgePrintingSystemProjectStart,
  assignWorkerProjectStart,
  fetchWorkerProjectListStart,
  fetchConsentFormFieldsStart,
  addProjectBadgesStart,
  uploadProjectBadgeLogosStart,
  fetchBadgeVisitorEntityListStart,
  searchProjectStart,
  updateProjectPaymentMethodStart,
} from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import {
  getProject_1,
  getProjectCategory_1,
  getProjectRegion_1,
  getFcaNae_1,
  getClient_1,
  getClientProjectPagination_1,
  getBillingTierList_1,
  getAccessControlSystemDevice_1,
  getBadgePrinterSystem_1,
  getWorker_1,
  getWorker_2,
  getConsentFormFields,
  getBadge_1,
  getBadgeVisitorEntity_1,
  getProjectAccessControlSystem_1,
  getPaymentMethod_1,
} from '../../../test/entities';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { generalState } from '../general';
import { actions as accessControlSystemActions } from '../access-control-system/actions';
import { runEpic } from '../../../test/runEpic';
import { GeneralModel, UserModel } from '../../models';
import { fileState } from '../file';
import { statisticsState } from '../statistics';

describe('project epics', () => {
  let deps: IEpicDependencies;
  let error;
  let stateMgmtAdmin = { value: { auth: { role: UserModel.Role.FCA_ADMIN } } };
  let stateMgmtClient = { value: { auth: { role: UserModel.Role.CLIENT_ADMIN } } };
  let errorResponse = { title: 'scary error' };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });

  describe('fetchProjectStart', () => {
    const id = getProject_1().id;
    it('should get epic for projects fetch project', () => {
      return runEpic(fetchProjectStart(ActionsObservable.of(actions.fetchProjectStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, true));
        expect(deps.apiService.getProject).toHaveBeenCalledWith(id);
        expect(actionList[1]).toEqual(actions.fetchProjectListSuccess([getProject_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProject = () => throwError(error);
      return runEpic(fetchProjectStart(ActionsObservable.of(actions.fetchProjectStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false, true, error));
      });
    });
  });

  describe('fetchDraftProjectStart', () => {
    const id = getProject_1().id;

    it('should get epic for projects fetch project', () => {
      return runEpic(fetchDraftProjectStart(ActionsObservable.of(actions.fetchDraftProjectStart(id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, true));
        expect(deps.apiService.getDraftProject).toHaveBeenCalledWith(id);
        expect(actionList[1]).toEqual(actions.fetchProjectListSuccess([getProject_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getDraftProject = () => throwError(error);
      return runEpic(fetchDraftProjectStart(ActionsObservable.of(actions.fetchDraftProjectStart(id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT, false, true, error));
      });
    });
  });

  describe('fetchProjectListStart', () => {
    it('should get epic for projects fetch project list when FC Admin', () => {
      return runEpic(fetchProjectListStart(ActionsObservable.of(actions.fetchProjectListStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, true));
        expect(deps.apiService.getProjectList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchProjectListSuccess([getProject_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, false));
      });
    });
    it('should get epic for projects fetch project list when No FC Admin', () => {
      return runEpic(fetchProjectListStart(ActionsObservable.of(actions.fetchProjectListStart()), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, true));
        expect(deps.apiService.getProjectList).toHaveBeenCalledWith({ onlyPending: true });
        expect(deps.apiService.getProjectList).toHaveBeenCalledWith({ onlyPending: false });
        expect(actionList[1]).toEqual(actions.fetchProjectListSuccess([getProject_1(), getProject_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProjectList = () => throwError(error);
      return runEpic(fetchProjectListStart(ActionsObservable.of(actions.fetchProjectListStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_LIST, false, true, error));
      });
    });
  });

  describe('saveProjectStart', () => {
    it('should get epic for save project', () => {
      return runEpic(
        saveProjectStart(ActionsObservable.of(actions.saveProjectStart(getProject_1() as any, 'general-information')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
          expect(deps.apiService.saveProject).toHaveBeenCalledWith(getProject_1());
          expect(actionList[1]).toEqual(actions.saveProjectSuccess(getProject_1()));
          expect(actionList[2]).toEqual(push(`/projects/wizard/${getProject_1().id}/general-information`, { success: true }));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveProject = () => throwError({ response: error });
      return runEpic(
        saveProjectStart(ActionsObservable.of(actions.saveProjectStart(getProject_1() as any, { key: 'general-information' } as any)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError({ response: error }));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error));
        }
      );
    });
  });

  describe('updateDraftProjectStart', () => {
    it('should get epic for update draft project', () => {
      return runEpic(updateDraftProjectStart(ActionsObservable.of(actions.updateDraftProjectStart(getProject_1() as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
        expect(deps.apiService.updateDraftProject).toHaveBeenCalledWith(getProject_1());
        expect(actionList[1]).toEqual(actions.updateProjectSuccess(getProject_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateDraftProject = () => throwError({ response: error });
      return runEpic(updateDraftProjectStart(ActionsObservable.of(actions.updateDraftProjectStart(getProject_1() as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ response: error }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error));
      });
    });
  });

  describe('updateProjectStart', () => {
    it('should get epic for update project', () => {
      return runEpic(updateProjectStart(ActionsObservable.of(actions.updateProjectStart(getProject_1() as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
        expect(deps.apiService.updateProject).toHaveBeenCalledWith(getProject_1());
        expect(actionList[1]).toEqual(actions.updateProjectSuccess(getProject_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Changes saved successfully!', GeneralModel.ToastType.SUCCESS));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateProject = () => throwError({ response: error });
      return runEpic(updateProjectStart(ActionsObservable.of(actions.updateProjectStart(getProject_1() as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ response: error }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error));
      });
    });
  });

  describe('updateProjectStart', () => {
    it('should get epic for update project', () => {
      return runEpic(updateDraftProjectStart(ActionsObservable.of(actions.updateDraftProjectStart(getProject_1() as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
        expect(deps.apiService.updateDraftProject).toHaveBeenCalledWith(getProject_1());
        expect(actionList[1]).toEqual(actions.updateProjectSuccess(getProject_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateDraftProject = () => throwError({ response: error });
      return runEpic(updateDraftProjectStart(ActionsObservable.of(actions.updateDraftProjectStart(getProject_1() as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ response: error }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT, false, true, error));
      });
    });
  });

  describe('archiveProjectStart', () => {
    it('should get epic for archive project', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      return runEpic(archiveProjectStart(ActionsObservable.of(actions.archiveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, true));
        expect(deps.apiService.archiveProject).toHaveBeenCalledWith(getProject_1().id);
        expect(actionList[1]).toEqual(actions.archiveProjectSuccess(getProject_1().id));
        expect(actionList[2]).toEqual(push(`/projects/detail/${getProject_1().id}/information`));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Project Name archived successfully!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      deps.apiService.archiveProject = () => throwError(error);
      return runEpic(archiveProjectStart(ActionsObservable.of(actions.archiveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ARCHIVE_PROJECT, false, true, error));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('unarchiveProjectStart', () => {
    it('should get epic for unarchive project', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      return runEpic(unarchiveProjectStart(ActionsObservable.of(actions.unarchiveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, true));
        expect(deps.apiService.unarchiveProject).toHaveBeenCalledWith(getProject_1().id);
        expect(actionList[1]).toEqual(actions.unarchiveProjectSuccess(getProject_1().id));
        expect(actionList[2]).toEqual(push(`/projects/detail/${getProject_1().id}/information`));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('Project Name unarchived successfully!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, false));
      });
    });

    it('should catch default error', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      deps.apiService.unarchiveProject = () => throwError(error);
      return runEpic(unarchiveProjectStart(ActionsObservable.of(actions.unarchiveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, false, true, error));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
      });
    });

    it('should catch errors', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      deps.apiService.unarchiveProject = () => throwError({ response: { errors: { relatedCompanies: ['error'] } } });
      return runEpic(unarchiveProjectStart(ActionsObservable.of(actions.unarchiveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ response: { errors: { relatedCompanies: ['error'] } } }));
        expect(actionList[2]).toEqual(
          generalState.actions.setLoading(GENERAL.LOADING_KEY.UNARCHIVE_PROJECT, false, true, { response: { errors: { relatedCompanies: ['error'] } } })
        );
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('fetchCategoryListStart', () => {
    it('should get epic for project fetch categories', () => {
      return runEpic(fetchCategoryListStart(ActionsObservable.of(actions.fetchCategoryListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, true));
        expect(deps.apiService.getProjectCategories).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchCategoryListSuccess([getProjectCategory_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, false));
      });
    });

    it('should catch default error', () => {
      deps.apiService.getProjectCategories = () => throwError(error);
      return runEpic(fetchCategoryListStart(ActionsObservable.of(actions.fetchCategoryListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_CATEGORY_LIST, false, true, error));
      });
    });
  });

  describe('fetchRegionListStart', () => {
    it('should get epic for project fetch regions', () => {
      return runEpic(fetchRegionListStart(ActionsObservable.of(actions.fetchRegionListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, true));
        expect(deps.apiService.getFcaRegion).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchRegionListSuccess([getProjectRegion_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getFcaRegion = () => throwError(error);
      return runEpic(fetchRegionListStart(ActionsObservable.of(actions.fetchRegionListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_REGION_LIST, false, true, error));
      });
    });
  });

  describe('fetchFcaNaeListStart', () => {
    it('should get epic for project fetch nae', () => {
      return runEpic(fetchFcaNaeListStart(ActionsObservable.of(actions.fetchNaeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, true));
        expect(deps.apiService.getFcaNae).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchNaeListSuccess([getFcaNae_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getFcaNae = () => throwError(error);
      return runEpic(fetchFcaNaeListStart(ActionsObservable.of(actions.fetchNaeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_NAE_LIST, false, true, error));
      });
    });
  });

  describe('fetchBillingTierListStart', () => {
    it('should get epic for project fetch BillingTierList', () => {
      return runEpic(fetchBillingTierListStart(ActionsObservable.of(actions.fetchBillingTierListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, true));
        expect(deps.apiService.getBillingTiers).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchBillingTierListSuccess(getBillingTierList_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getBillingTiers = () => throwError(error);
      return runEpic(fetchBillingTierListStart(ActionsObservable.of(actions.fetchBillingTierListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BILLING_TIER_LIST, false, true, error));
      });
    });
  });

  describe('fetchClientProjectListStart', () => {
    const id = getClient_1().id;

    it('should get epic for clients fetch project list', () => {
      return runEpic(fetchClientProjectListStart(ActionsObservable.of(actions.fetchClientProjectListStart(id, {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, true));
        expect(deps.apiService.getClientProjectList).toHaveBeenCalledWith(id, {});
        expect(actionList[1]).toEqual(
          actions.fetchClientProjectListSuccess(id, getClientProjectPagination_1().items, getClientProjectPagination_1().totalResults)
        );
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientProjectList = () => throwError(error);
      return runEpic(fetchClientProjectListStart(ActionsObservable.of(actions.fetchClientProjectListStart(id, {})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST, false, true, error));
      });
    });
  });

  describe('fetchProjectSummaryStart', () => {
    const id = '1';
    it('should get epic for product fetch summary', () => {
      return runEpic(fetchProjectSummaryStart(ActionsObservable.of(actions.fetchProjectSummaryStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, true));
        expect(deps.apiService.getProjectSummary).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.updateProjectSuccess(getProject_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getProjectSummary = () => throwError(error);
      return runEpic(fetchProjectSummaryStart(ActionsObservable.of(actions.fetchProjectSummaryStart(id)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY, false, true, error));
      });
    });
  });

  describe('sendApproveProjectStart', () => {
    it('should get epic for send for approve project', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      return runEpic(sendApproveProjectStart(ActionsObservable.of(actions.sendApproveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, true));
        expect(deps.apiService.sendApproveProject).toHaveBeenCalledWith(getProject_1().id);
        expect(actionList[1]).toEqual(push('/projects?filter="pending-approval"'));
        expect(actionList[2]).toEqual(
          generalState.actions.addToastStart(`Project created successfully! ${getProject_1().name} is pending approval now`, GeneralModel.ToastType.SUCCESS)
        );
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.sendApproveProject = () => throwError(error);
      return runEpic(sendApproveProjectStart(ActionsObservable.of(actions.sendApproveProjectStart(getProject_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, false, true, error));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
      });
    });

    it('should catch errors', () => {
      deps.apiService.sendApproveProject = () => throwError({ response: { errors: { relatedCompanies: ['error'] } } });
      return runEpic(sendApproveProjectStart(ActionsObservable.of(actions.sendApproveProjectStart(getProject_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ response: { errors: { relatedCompanies: ['error'] } } }));
        expect(actionList[2]).toEqual(
          generalState.actions.setLoading(GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT, false, true, { response: { errors: { relatedCompanies: ['error'] } } })
        );
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('error', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('approveProjectStart', () => {
    it('should get epic for approve project', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      return runEpic(approveProjectStart(ActionsObservable.of(actions.approveProjectStart(getProject_1().id)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, true));
        expect(deps.apiService.approveProject).toHaveBeenCalledWith(getProject_1().id);
        expect(actionList[1]).toEqual(push('/projects?filter="active"'));
        expect(actionList[2]).toEqual(
          generalState.actions.addToastStart(`Project approved successfully! ${getProject_1().name} is active now`, GeneralModel.ToastType.SUCCESS)
        );
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.approveProject = () => throwError(error);
      return runEpic(approveProjectStart(ActionsObservable.of(actions.approveProjectStart(getProject_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.APPROVE_PROJECT, false, true, error));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('acceptProjectInvitationStart', () => {
    it('should get epic for accept project', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      return runEpic(
        acceptProjectInvitationStart(
          ActionsObservable.of(actions.acceptProjectInvitationStart(getProject_1().id, getPaymentMethod_1().paymentMethodId)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, true));
          expect(deps.apiService.acceptProjectInvitation).toHaveBeenCalledWith(getProject_1().id, getPaymentMethod_1().paymentMethodId);
          expect(actionList[1]).toEqual(push('/projects'));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Project accepted successfully! Welcome aboard!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.acceptProjectInvitation = () => throwError({ title: 'error title' });
      return runEpic(
        acceptProjectInvitationStart(ActionsObservable.of(actions.acceptProjectInvitationStart(getProject_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError({ title: 'error title' }));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ACCEPT_PROJECT, false, true, { title: 'error title' }));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('error title', GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('deleteProjectStart', () => {
    it('should get epic for delete project', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      const query = { filter: 'draft', page: 1, limit: 30, newPage: false };
      return runEpic(deleteProjectStart(ActionsObservable.of(actions.deleteProjectStart(getProject_1().id, query)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, true));
        expect(deps.apiService.deleteProject).toHaveBeenCalledWith(getProject_1().id);
        expect(actionList[1]).toEqual(actions.fetchProjectListStart(query));
        expect(actionList[2]).toEqual(statisticsState.actions.fetchProjectStatisticsStart());
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(`Project Name deleted successfully!`, GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, false));
      });
    });

    it('should delete project and navigate to previous page', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      const query = { filter: 'draft', page: 2, limit: 30, newPage: true };
      return runEpic(deleteProjectStart(ActionsObservable.of(actions.deleteProjectStart(getProject_1().id, query)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, true));
        expect(deps.apiService.deleteProject).toHaveBeenCalledWith(getProject_1().id);
        expect(actionList[1]).toEqual(push(`/projects?filter="draft"&page=1&limit=30`));
        expect(actionList[2]).toEqual(statisticsState.actions.fetchProjectStatisticsStart());
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(`Project Name deleted successfully!`, GeneralModel.ToastType.SUCCESS));
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, false));
      });
    });

    it('should catch errors', () => {
      const stateMgmt = { value: { project: { projectMap: { [getProject_1().id]: getProject_1() } } } };
      const query = { filter: 'draft', page: 1, limit: 30, newPage: false };
      deps.apiService.deleteProject = () => throwError(error);
      return runEpic(deleteProjectStart(ActionsObservable.of(actions.deleteProjectStart(getProject_1().id, query)), stateMgmt as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PROJECT, false, true, error));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('assignClientProjectStart', () => {
    it('should get epic for assign client to a project', () => {
      const list = [{ id: getClient_1().id, role: 0 }];
      return runEpic(
        assignClientProjectStart(ActionsObservable.of(actions.assignClientProjectStart(getProject_1().id, list, getClient_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, true));
          expect(deps.apiService.assignClientProject).toHaveBeenCalledWith(getProject_1().id, list, getClient_1().id);
          expect(actionList[1]).toEqual(actions.assignClientProjectSuccess(list));
          expect(actionList[3]).toEqual(
            generalState.actions.addToastStart('Subcontractor assigned successfully, invitation sent!', GeneralModel.ToastType.SUCCESS)
          );
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, false));
        }
      );
    });

    it('should get epic for assign multiple client to a project', () => {
      const list = [
        { id: getClient_1().id, role: 0 },
        { id: '2', role: 0 },
      ];
      return runEpic(
        assignClientProjectStart(ActionsObservable.of(actions.assignClientProjectStart(getProject_1().id, list, getClient_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, true));
          expect(deps.apiService.assignClientProject).toHaveBeenCalledWith(getProject_1().id, list, getClient_1().id);
          expect(actionList[1]).toEqual(actions.assignClientProjectSuccess(list));
          expect(actionList[3]).toEqual(
            generalState.actions.addToastStart('Subcontractors assigned successfully, invitations sent!', GeneralModel.ToastType.SUCCESS)
          );
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, false));
        }
      );
    });

    it('should catch errors', () => {
      const list = [{ id: getClient_1().id, role: 0 }];
      deps.apiService.assignClientProject = () => throwError(error);
      return runEpic(
        assignClientProjectStart(ActionsObservable.of(actions.assignClientProjectStart(getProject_1().id, list, getClient_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT, false, true, error.response));
        }
      );
    });
  });

  describe('assignUserProjectStart', () => {
    it('should get epic for assign users to a project', () => {
      const list = [{ id: getClient_1().id, roleId: '2' }];
      return runEpic(assignUserProjectStart(ActionsObservable.of(actions.assignUserProjectStart(getProject_1().id, list)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, true));
        expect(deps.apiService.assignUserProject).toHaveBeenCalledWith(getProject_1().id, list);
        expect(actionList[1]).toEqual(actions.assignUserProjectSuccess(list));
        expect(actionList[2]).toEqual(generalState.actions.addToastStart('User assigned successfully, invitation sent!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, false));
      });
    });

    it('should get epic for assign multiple users to a project', () => {
      const list = [
        { id: getClient_1().id, roleId: '1' },
        { id: '2', roleId: '2' },
      ];
      return runEpic(assignUserProjectStart(ActionsObservable.of(actions.assignUserProjectStart(getProject_1().id, list)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, true));
        expect(deps.apiService.assignUserProject).toHaveBeenCalledWith(getProject_1().id, list);
        expect(actionList[1]).toEqual(actions.assignUserProjectSuccess(list));
        expect(actionList[2]).toEqual(generalState.actions.addToastStart('Users assigned successfully, invitations sent!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, false));
      });
    });

    it('should catch default errors', () => {
      deps.apiService.assignUserProject = () => throwError(error);
      return runEpic(
        assignUserProjectStart(
          ActionsObservable.of(actions.assignUserProjectStart(getProject_1().id, [{ id: getClient_1().id, roleId: '2' }])),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT, false, true, error));
        }
      );
    });
  });

  describe('assignAccessControlSystemProjectStart', () => {
    it('should get epic for assign access control system project', () => {
      return runEpic(
        assignAccessControlSystemProjectStart(
          ActionsObservable.of(actions.assignAcsProjectStart(getProject_1().id, getProjectAccessControlSystem_1())),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, true));
          expect(deps.apiService.assignAcsProject).toHaveBeenCalledWith(getProject_1().id, getProjectAccessControlSystem_1());
          expect(actionList[1]).toEqual(generalState.actions.addToastStart('ACS assigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.assignAcsProject = () => throwError(error);
      return runEpic(
        assignAccessControlSystemProjectStart(
          ActionsObservable.of(actions.assignAcsProjectStart(getProject_1().id, getProjectAccessControlSystem_1())),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('unassignAccessControlSystemProjectStart', () => {
    const stateMgmt = {
      value: { accessControlSystem: { accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() } } },
    };
    it('should get epic for unassign access control system project', () => {
      return runEpic(
        unassignAccessControlSystemProjectStart(
          ActionsObservable.of(actions.unAssignAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, true));
          expect(deps.apiService.unAssignAccessControlSystemProject).toHaveBeenCalledWith(getProject_1().id, getAccessControlSystemDevice_1().id);
          expect(actionList[1]).toEqual(actions.unAssignAccessControlSystemSuccess(getProject_1().id, getAccessControlSystemDevice_1().id));
          expect(actionList[2]).toEqual(accessControlSystemActions.unassignAccessControlSystemProjectSuccess(getAccessControlSystemDevice_1().id));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Turnstile unassigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.unAssignAccessControlSystemProject = () => throwError(error);
      return runEpic(
        unassignAccessControlSystemProjectStart(
          ActionsObservable.of(actions.unAssignAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT, false, true, errorResponse)
          );
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('unassignBadgePrintingSystemProjectStart', () => {
    const stateMgmt = { value: { badgePrinterSystem: { badgePrinterSystemMap: { [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1() } } } };
    it('should get epic for unassign badge printintg system project', () => {
      return runEpic(
        unassignBadgePrintingSystemProjectStart(
          ActionsObservable.of(actions.unAssignBadgePrintingSystemStart(getProject_1().id, getBadgePrinterSystem_1().id)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, true));
          expect(deps.apiService.unAssignBadgePrintingSystemProject).toHaveBeenCalledWith(getProject_1().id, getBadgePrinterSystem_1().id);
          expect(actionList[1]).toEqual(actions.unAssignBadgePrintingSystemSuccess(getProject_1().id, getBadgePrinterSystem_1().id));
          expect(actionList[2]).toEqual(
            generalState.actions.addToastStart(`${getBadgePrinterSystem_1().name} unassigned successfully!`, GeneralModel.ToastType.SUCCESS)
          );
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.unAssignBadgePrintingSystemProject = () => throwError(error);
      return runEpic(
        unassignBadgePrintingSystemProjectStart(
          ActionsObservable.of(actions.unAssignBadgePrintingSystemStart(getProject_1().id, getBadgePrinterSystem_1().id)),
          stateMgmt as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, false, true, errorResponse)
          );
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('assignBadgePrintingSystemProjectStart', () => {
    it('should get epic for assign badge printing system project', () => {
      return runEpic(
        assignBadgePrintingSystemProjectStart(
          ActionsObservable.of(actions.assignBadgePrintingProjectStart(getProject_1().id, [{ id: getBadgePrinterSystem_1().id, date: '10/10/1989' }])),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, true));
          expect(deps.apiService.assignBadgePrintingSystemProject).toHaveBeenCalledWith(getProject_1().id, [
            { id: getBadgePrinterSystem_1().id, date: '10/10/1989' },
          ]);
          expect(actionList[1]).toEqual(actions.assignBadgePrintingProjectSuccess([{ id: getBadgePrinterSystem_1().id, date: '10/10/1989' }]));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('BPS assigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.assignBadgePrintingSystemProject = () => throwError(error);
      return runEpic(
        assignBadgePrintingSystemProjectStart(
          ActionsObservable.of(actions.assignBadgePrintingProjectStart(getProject_1().id, [{ id: getBadgePrinterSystem_1().id, date: '10/10/1989' }])),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('assignWorkerProjectStart', () => {
    it('should get epic for assign worker project', () => {
      return runEpic(
        assignWorkerProjectStart(ActionsObservable.of(actions.assignWorkerProjectStart(getProject_1().id, [getWorker_1().id])), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, true));
          expect(deps.apiService.assignWorkerProject).toHaveBeenCalledWith(getProject_1().id, [getWorker_1().id]);
          expect(actionList[1]).toEqual(actions.assignWorkerProjectSuccess([getWorker_1().id]));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Worker assigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, false));
        }
      );
    });

    it('should get epic for assign workers project', () => {
      return runEpic(
        assignWorkerProjectStart(
          ActionsObservable.of(actions.assignWorkerProjectStart(getProject_1().id, [getWorker_1().id, getWorker_2().id])),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, true));
          expect(deps.apiService.assignWorkerProject).toHaveBeenCalledWith(getProject_1().id, [getWorker_1().id, getWorker_2().id]);
          expect(actionList[1]).toEqual(actions.assignWorkerProjectSuccess([getWorker_1().id, getWorker_2().id]));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('Workers assigned successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, false));
        }
      );
    });

    it('should catch default errors', () => {
      deps.apiService.assignWorkerProject = () => throwError(error);
      return runEpic(
        assignWorkerProjectStart(ActionsObservable.of(actions.assignWorkerProjectStart(getProject_1().id, [getWorker_1().id])), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchWorkerProjectListStart', () => {
    const id = getWorker_1().id;

    it('should get epic for worker fetch project list', () => {
      return runEpic(
        fetchWorkerProjectListStart(ActionsObservable.of(actions.fetchWorkerProjectListStart(id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, true));
          expect(deps.apiService.getWorkerProjectList).toHaveBeenCalledWith(id, {});
          expect(actionList[1]).toEqual(actions.fetchWorkerProjectListSuccess([getProject_1()], 1, getWorker_1().id));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerProjectList = () => throwError(error);
      return runEpic(
        fetchWorkerProjectListStart(ActionsObservable.of(actions.fetchWorkerProjectListStart(id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT, false, true, error));
        }
      );
    });
  });
  describe('fetchConsentFormFields', () => {
    it('should get epic for consent form fields', () => {
      return runEpic(fetchConsentFormFieldsStart(ActionsObservable.of(actions.fetchConsentFormFieldsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS, true));
        expect(deps.apiService.getConsentFormFields).toHaveBeenCalledWith();
        expect(actionList[1]).toEqual(actions.fetchConsentFormFieldsSuccess(getConsentFormFields()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getConsentFormFields = () => throwError(error);
      return runEpic(fetchConsentFormFieldsStart(ActionsObservable.of(actions.fetchConsentFormFieldsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM_FIELDS, false, true, error.response));
      });
    });
  });

  describe('addProjectBadgesStart', () => {
    const id = getProject_1().id;

    it('should get epic for project add badges start', () => {
      return runEpic(
        addProjectBadgesStart(
          ActionsObservable.of(actions.addProjectBadgesStart(id, ['generalContractorBadgeLogo'])),
          { value: { file: { fileMap: { generalContractorBadgeLogo: {} } } } } as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGES, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE)
          );
          expect(actionList[1]).toEqual(
            actions.uploadProjectBadgesStart(id, ['generalContractorBadgeLogo'], {
              generalContractorBadgeLogo: undefined,
            })
          );
          expect(actionList[2]).toEqual(actions.addProjectBadgesSuccess());
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGES, false));
        }
      );
    });
  });

  describe('uploadProjectBadgeLogosStart', () => {
    it.skip('should get epic for project upload project badges', () => {
      return runEpic(
        uploadProjectBadgeLogosStart(
          ActionsObservable.of(actions.uploadProjectBadgesStart('id', ['generalContractorBadgeLogo'], { generalContractorBadgeLogo: {} } as any)),
          { value: { file: { fileMap: { generalContractorBadgeLogo: { file1: { file: { name: 'test' } } } } } } } as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE)
          );
          expect(deps.apiService.getProjectBadgeResources).toHaveBeenCalled();
          expect(actionList[1]).toEqual(fileState.actions.uploadFileStart({} as any, '/fake/path', '1', 'saveUploadProjectBadge'));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, false));
        }
      );
    });

    it.skip('should catch errors', () => {
      deps.apiService.getProjectBadgeResources = () => throwError(error);
      return runEpic(
        uploadProjectBadgeLogosStart(
          ActionsObservable.of(actions.uploadProjectBadgesStart('id', ['generalContractorBadgeLogo'], { generalContractorBadgeLogo: {} } as any)),
          { value: { file: { fileMap: { generalContractorBadgeLogo: { file1: { file: { name: 'test' } } } } } } } as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE)
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES, false, true, errorResponse));
        }
      );
    });
  });

  describe('fetchBadgeVisitorEntityListStart', () => {
    it.skip('should get epic for get badge visitor entity list', () => {
      return runEpic(
        fetchBadgeVisitorEntityListStart(ActionsObservable.of(actions.fetchBadgeVisitorEntityListStart(getBadge_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST, true));
          expect(deps.apiService.getBadgeVisitorEntity).toHaveBeenCalledWith(getBadge_1().id);
          expect(actionList[1]).toEqual(actions.fetchBadgeVisitorEntityListSuccess(getBadgeVisitorEntity_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST, false));
        }
      );
    });

    it.skip('should catch errors', () => {
      deps.apiService.getBadgeVisitorEntity = () => throwError(error);
      return runEpic(
        fetchBadgeVisitorEntityListStart(ActionsObservable.of(actions.fetchBadgeVisitorEntityListStart(getBadge_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST, false, true, error.response));
        }
      );
    });
  });

  describe('searchProjectStart', () => {
    it.skip('should get epic for general search project', () => {
      return runEpic(searchProjectStart(ActionsObservable.of(actions.searchProjectStart({} as any, 'tempid')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT, true));
        expect(deps.apiService.searchProject).toHaveBeenCalledWith({});
        expect(actionList[1]).toEqual(generalState.actions.setRelationUiId('tempid', { searchResult: [] }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT, false));
      });
    });

    it.skip('should catch errors', () => {
      deps.apiService.searchProject = () => throwError(error);
      return runEpic(searchProjectStart(ActionsObservable.of(actions.searchProjectStart({} as any, 'tempid')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_PROJECT, false, true, error.response));
      });
    });
  });

  describe('updateProjectPaymentMethodStart', () => {
    it('should get epic for update project payment method start', () => {
      return runEpic(
        updateProjectPaymentMethodStart(
          ActionsObservable.of(actions.updateProjectPaymentMethodStart(getProject_1().id, getPaymentMethod_1().paymentMethodId)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD, true));
          expect(deps.apiService.updateProjectPaymentMethod).toHaveBeenCalledWith(getProject_1().id, getPaymentMethod_1().paymentMethodId);
          expect(actionList[1]).toEqual(generalState.actions.addToastStart('Payment Method updated successfully!', GeneralModel.ToastType.SUCCESS));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.updateProjectPaymentMethod = () => throwError(error);
      return runEpic(
        updateProjectPaymentMethodStart(
          ActionsObservable.of(actions.updateProjectPaymentMethodStart(getProject_1().id, getPaymentMethod_1().paymentMethodId)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(errorResponse.title, GeneralModel.ToastType.ERROR));
        }
      );
    });
  });
});
