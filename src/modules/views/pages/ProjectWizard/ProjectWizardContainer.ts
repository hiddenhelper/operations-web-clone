import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GeneralModel, ProjectModel, ClientModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { certificationState } from '../../../state-mgmt/certification';
import { projectState } from '../../../state-mgmt/project';
import { generalState } from '../../../state-mgmt/general';
import { clientState } from '../../../state-mgmt/client';
import { fileState } from '../../../state-mgmt/file';
import { trainingState } from '../../../state-mgmt/training';

import ProjectWizard from './ProjectWizard';

export const mapStateToProps = (state: IRootState) => ({
  projectMap: state.project.projectMap,
  categoryList: state.project.categoryList,
  regionList: state.project.regionList,
  fcaNaeList: state.project.fcaNaeList,
  timeZoneList: state.general.timeZoneList,
  trainingList: state.training.trainingList,
  certificationList: state.certification.certificationList,
  clientMap: state.client.clientMap,
  mwbeList: state.client.mwbeList,
  consentFormFields: state.project.consentFormFields,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROJECT],
  searchLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT],
  sendForApprovalLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SEND_APPROVE_PROJECT],
  approveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.APPROVE_PROJECT],
  billingTierList: state.project.billingTierList,
  loadingMap: state.general.loadingMap,
  fileMap: state.file.fileMap,
  uploadBadgesLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPLOAD_PROJECT_BADGES],
  userRole: state.auth.role,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProject: (id: string) => dispatch(projectState.actions.fetchDraftProjectStart(id)),
  saveProject: (project: Partial<ProjectModel.IProject>, stepKey: string) => dispatch(projectState.actions.saveProjectStart(project, stepKey)),
  updateDraftProject: (project: Partial<ProjectModel.IProject>) => dispatch(projectState.actions.updateDraftProjectStart(project)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT)),
  clearRelationMap: () => dispatch(generalState.actions.clearRelationMap()),
  fetchCategoryList: () => dispatch(projectState.actions.fetchCategoryListStart()),
  fetchRegionList: () => dispatch(projectState.actions.fetchRegionListStart()),
  fetchNaeList: () => dispatch(projectState.actions.fetchNaeListStart()),
  fetchCertificationList: () => dispatch(certificationState.actions.fetchCertificationListStart()),
  fetchTrainingList: () => dispatch(trainingState.actions.fetchTrainingListStart()),
  fetchMwbeList: () => dispatch(clientState.actions.fetchMWbeListStart()),
  fetchConsentFormFields: () => dispatch(projectState.actions.fetchConsentFormFieldsStart()),
  searchCompanies: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(clientState.actions.searchClientStart(query, tempId)),
  createCompany: (client: ClientModel.IClient, step: GeneralModel.IStep, tempId: string) =>
    dispatch(clientState.actions.saveClientStart(client, step, false, tempId)),
  sendProjectForApproval: (id: string) => dispatch(projectState.actions.sendApproveProjectStart(id)),
  approveProject: (id: string) => dispatch(projectState.actions.approveProjectStart(id)),
  fetchBillingTierList: () => dispatch(projectState.actions.fetchBillingTierListStart()),
  fetchTimeZoneList: () => dispatch(generalState.actions.fetchTimeZoneListStart()),
  addProjectBadges: (id: string, files: string[]) => dispatch(projectState.actions.addProjectBadgesStart(id, files)),
  clearFileMap: () => dispatch(fileState.actions.clearMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWizard);
