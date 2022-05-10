import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import CertificationTab from './CertificationTab';

import { GENERAL } from '../../../../../../constants';
import { workerState } from '../../../../../state-mgmt/worker';
import { certificationState } from '../../../../../state-mgmt/certification';
import { generalState } from '../../../../../state-mgmt/general';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { CertificationModel, GeneralModel } from '../../../../../models';
import { projectState } from '../../../../../state-mgmt/project';
import { fileState } from '../../../../../state-mgmt/file';

export const mapStateToProps = (state: IRootState) => ({
  certificationMap: state.certification.workerMap,
  fileMap: state.file.fileMap,
  count: state.certification.count,
  certificationList: state.certification.certificationList,
  projectList: state.worker.projectList,
  projectWorkerMap: state.project.projectWorkerMap,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION],
  saveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION],
  updateLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION],
  loadingMap: state.general.loadingMap,
  detailLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY],
  defaultFilesToRemove: state.file.defaultFilesToRemove,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWorkerCertification: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) =>
    dispatch(certificationState.actions.addWorkerCertificationStart(id, certification, uploadId)),
  updateWorkerCertification: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) =>
    dispatch(certificationState.actions.updateWorkerCertificationStart(id, certification, uploadId)),
  deleteWorkerCertification: (workerId: string, certificationId: string) =>
    dispatch(certificationState.actions.deleteWorkerCertificationStart(workerId, certificationId)),
  fetchCertificationList: () => dispatch(certificationState.actions.fetchCertificationListStart()),
  fetchWorkerCertificationList: (id: string, query: GeneralModel.IQueryParams) =>
    dispatch(certificationState.actions.fetchWorkerCertificationListStart(id, query)),
  fetchWorkerCertificationDetail: (id: string, certId: string) => dispatch(certificationState.actions.fetchWorkerCertificationDetailStart(id, certId)),
  fetchProjectList: (id: string) => dispatch(workerState.actions.fetchProjectListStart(id)),
  addCertificationSuccess: () => dispatch(generalState.actions.addToastStart('Certification added successfully!', GeneralModel.ToastType.SUCCESS)),
  updateCertificationSuccess: () => dispatch(generalState.actions.addToastStart('Certification updated successfully!', GeneralModel.ToastType.SUCCESS)),
  clearLoading: () => {
    dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION));
    dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION));
    dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION));
  },
  fetchWorker: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchWorkerProjectListStart(id, query)),
  clearFileMap: (uploadId: string) => dispatch(fileState.actions.clearUploadMap(uploadId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CertificationTab);
