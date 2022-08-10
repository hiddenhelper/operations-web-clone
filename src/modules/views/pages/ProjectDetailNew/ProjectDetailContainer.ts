import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ProjectNewModel } from '../../../models';
import { GENERAL } from '../../../../constants';

import { IRootState } from '../../../state-mgmt/rootState';
import { projectNewState } from '../../../state-mgmt/project-new';
import { generalState } from '../../../state-mgmt/general';
import { certificationState } from '../../../state-mgmt/certification';
import { trainingState } from '../../../state-mgmt/training';

import ProjectDetail from './ProjectDetail';
import { statisticsState } from '../../../state-mgmt/statistics';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  projectMap: state.projectNew.projectMap,
  categoryList: state.projectNew.categoryList,
  regionList: state.projectNew.regionList,
  fcaNaeList: state.projectNew.fcaNaeList,
  timeZoneList: state.general.timeZoneList,
  billingTierList: state.projectNew.billingTierList,
  certificationList: state.certification.certificationList,
  trainingList: state.training.trainingList,
  consentFormFields: state.projectNew.consentFormFields,
  projectStatistics: state.statistics.projectDetailStatistics,
  projectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT],
  updateProjectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROJECT],
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS],
  updatePaymentMethodLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD],
  currentUserPermissions: state.auth.session?.permissions,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProject: (id: string) => dispatch(projectNewState.actions.fetchProjectStart(id)),
  updateProject: (project: Partial<ProjectNewModel.IProject>) => dispatch(projectNewState.actions.updateProjectStart(project)),
  fetchCategoryList: () => dispatch(projectNewState.actions.fetchCategoryListStart()),
  fetchRegionList: () => dispatch(projectNewState.actions.fetchRegionListStart()),
  fetchNaeList: () => dispatch(projectNewState.actions.fetchNaeListStart()),
  fetchBillingTierList: () => dispatch(projectNewState.actions.fetchBillingTierListStart()),
  fetchCertificationList: () => dispatch(certificationState.actions.fetchCertificationListStart()),
  fetchTrainingList: () => dispatch(trainingState.actions.fetchTrainingListStart()),
  fetchProjectStatistics: (id: string) => dispatch(statisticsState.actions.fetchProjectDetailStatisticsStart(id)),
  archiveProject: (id: string) => dispatch(projectNewState.actions.archiveProjectStart(id)),
  unarchiveProject: (id: string) => dispatch(projectNewState.actions.unarchiveProjectStart(id)),
  clearProjectMap: () => dispatch(projectNewState.actions.clearProjectMap()),
  clearLoadingMap: () => dispatch(generalState.actions.clearLoadingMap()),
  clearLoading: (key: string) => dispatch(generalState.actions.clear(key)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT)),
  clearModalMap: () => dispatch(generalState.actions.setModalMap([], 0)),
  fetchConsentFormFields: () => dispatch(projectNewState.actions.fetchConsentFormFieldsStart()),
  clearProjectStatistics: () => dispatch(statisticsState.actions.clearProjectDetailStatistics()),
  fetchTimeZoneList: () => dispatch(generalState.actions.fetchTimeZoneListStart()),
  updateProjectPaymentMethod: (projectId: string, paymentMethodId: string) =>
    dispatch(projectNewState.actions.updateProjectPaymentMethodStart(projectId, paymentMethodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
