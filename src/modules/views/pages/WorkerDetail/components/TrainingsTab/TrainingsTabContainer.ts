import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import TrainingsTab from './TrainingsTab';

import { GENERAL } from '../../../../../../constants';
import { workerState } from '../../../../../state-mgmt/worker';
import { trainingState } from '../../../../../state-mgmt/training';
import { generalState } from '../../../../../state-mgmt/general';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { TrainingModel, GeneralModel } from '../../../../../models';
import { projectState } from '../../../../../state-mgmt/project';
import { fileState } from '../../../../../state-mgmt/file';

export const mapStateToProps = (state: IRootState) => ({
  trainingMap: state.training.workerMap,
  fileMap: state.file.fileMap,
  count: state.training.count,
  trainingList: state.training.trainingList,
  projectList: state.worker.projectList,
  projectMap: state.project.projectWorkerMap,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING],
  saveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING],
  updateLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING],
  loadingMap: state.general.loadingMap,
  detailLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY],
  defaultFilesToRemove: state.file.defaultFilesToRemove,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWorkerTraining: (id: string, training: TrainingModel.IWorkerTraining, uploadId: string) =>
    dispatch(trainingState.actions.addWorkerTrainingStart(id, training, uploadId)),
  updateWorkerTraining: (id: string, training: TrainingModel.IWorkerTraining, uploadId: string) =>
    dispatch(trainingState.actions.updateWorkerTrainingStart(id, training, uploadId)),
  deleteWorkerTraining: (workerId: string, trainingId: string) => dispatch(trainingState.actions.deleteWorkerTrainingStart(workerId, trainingId)),
  fetchTrainingList: () => dispatch(trainingState.actions.fetchTrainingListStart()),
  fetchWorkerTrainingList: (id: string, query: GeneralModel.IQueryParams) => dispatch(trainingState.actions.fetchWorkerTrainingListStart(id, query)),
  fetchWorkerTrainingDetail: (id: string, certId: string) => dispatch(trainingState.actions.fetchWorkerTrainingDetailStart(id, certId)),
  fetchProjectList: (id: string) => dispatch(workerState.actions.fetchProjectListStart(id)),
  addTrainingSuccess: () => dispatch(generalState.actions.addToastStart('Training added successfully!', GeneralModel.ToastType.SUCCESS)),
  updateTrainingSuccess: () => dispatch(generalState.actions.addToastStart('Training updated successfully!', GeneralModel.ToastType.SUCCESS)),
  clearLoading: () => {
    dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING));
    dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING));
    dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING));
  },
  fetchWorker: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchWorkerProjectListStart(id, query)),
  clearFileMap: (uploadId: string) => dispatch(fileState.actions.clearUploadMap(uploadId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingsTab);
