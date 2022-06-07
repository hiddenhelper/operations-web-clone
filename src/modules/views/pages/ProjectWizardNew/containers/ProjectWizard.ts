import { projectNewState } from 'modules/state-mgmt/project-new';
import { connect } from 'react-redux';
import { IRootState } from 'modules/state-mgmt/rootState';
import ProjectWizard from '../components/ProjectWizard';
import { GENERAL } from '../../../../../constants';
import { certificationState } from 'modules/state-mgmt/certification';
import { trainingState } from 'modules/state-mgmt/training';
import { fileState } from 'modules/state-mgmt/file';

const mapStateToProps = (state: IRootState) => ({
  projectMap: state.projectNew.projectMap,
  loadingMap: state.general.loadingMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROJECT],
  categoryList: state.projectNew.categoryList,
  regionList: state.projectNew.regionList,
  fcaNaeList: state.projectNew.fcaNaeList,
  trainingList: state.training.trainingList,
  certificationList: state.certification.certificationList,
  fileMap: state.file.fileMap,
  consentFormFields: state.projectNew.consentFormFields,
});

const mapDispatchToProps = {
  saveProject: projectNewState.actions.saveProjectStart,
  updateDraftProject: projectNewState.actions.updateDraftProjectStart,
  fetchProject: projectNewState.actions.fetchDraftProjectStart,
  fetchCategoryList: projectNewState.actions.fetchCategoryListStart,
  fetchRegionList: projectNewState.actions.fetchRegionListStart,
  fetchNaeList: projectNewState.actions.fetchNaeListStart,
  fetchCertificationList: certificationState.actions.fetchCertificationListStart,
  fetchTrainingList: trainingState.actions.fetchTrainingListStart,
  addProjectBadges: projectNewState.actions.addProjectBadgesStart,
  clearFileMap: fileState.actions.clearMap,
  fetchConsentFormFields: projectNewState.actions.fetchConsentFormFieldsStart,
  approveProject: projectNewState.actions.approveProjectStart,
  sendProjectForApproval: projectNewState.actions.sendApproveProjectStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWizard);
