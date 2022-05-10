import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ProjectModel } from '../../../models';
import { GENERAL } from '../../../../constants';

import { IRootState } from '../../../state-mgmt/rootState';
import { projectState } from '../../../state-mgmt/project';
import { generalState } from '../../../state-mgmt/general';
import { certificationState } from '../../../state-mgmt/certification';
import { trainingState } from '../../../state-mgmt/training';

import ProjectDetail from './ProjectDetail';
import { statisticsState } from '../../../state-mgmt/statistics';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  projectMap: state.project.projectMap,
  categoryList: state.project.categoryList,
  regionList: state.project.regionList,
  fcaNaeList: state.project.fcaNaeList,
  timeZoneList: state.general.timeZoneList,
  billingTierList: state.project.billingTierList,
  certificationList: state.certification.certificationList,
  trainingList: state.training.trainingList,
  consentFormFields: state.project.consentFormFields,
  projectStatistics: state.statistics.projectDetailStatistics,
  projectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT],
  updateProjectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROJECT],
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS],
  updatePaymentMethodLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProject: (id: string) => dispatch(projectState.actions.fetchProjectStart(id)),
  updateProject: (project: Partial<ProjectModel.IProject>) => dispatch(projectState.actions.updateProjectStart(project)),
  fetchCategoryList: () => dispatch(projectState.actions.fetchCategoryListStart()),
  fetchRegionList: () => dispatch(projectState.actions.fetchRegionListStart()),
  fetchNaeList: () => dispatch(projectState.actions.fetchNaeListStart()),
  fetchBillingTierList: () => dispatch(projectState.actions.fetchBillingTierListStart()),
  fetchCertificationList: () => dispatch(certificationState.actions.fetchCertificationListStart()),
  fetchTrainingList: () => dispatch(trainingState.actions.fetchTrainingListStart()),
  fetchProjectStatistics: (id: string) => dispatch(statisticsState.actions.fetchProjectDetailStatisticsStart(id)),
  archiveProject: (id: string) => dispatch(projectState.actions.archiveProjectStart(id)),
  unarchiveProject: (id: string) => dispatch(projectState.actions.unarchiveProjectStart(id)),
  clearProjectMap: () => dispatch(projectState.actions.clearProjectMap()),
  clearLoadingMap: () => dispatch(generalState.actions.clearLoadingMap()),
  clearLoading: (key: string) => dispatch(generalState.actions.clear(key)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT)),
  clearModalMap: () => dispatch(generalState.actions.setModalMap([], 0)),
  fetchConsentFormFields: () => dispatch(projectState.actions.fetchConsentFormFieldsStart()),
  clearProjectStatistics: () => dispatch(statisticsState.actions.clearProjectDetailStatistics()),
  fetchTimeZoneList: () => dispatch(generalState.actions.fetchTimeZoneListStart()),
  updateProjectPaymentMethod: (projectId: string, paymentMethodId: string) =>
    dispatch(projectState.actions.updateProjectPaymentMethodStart(projectId, paymentMethodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
