import { TrainingModel, GeneralModel, FileModel } from '../../models';

export enum ActionType {
  FETCH_TRAINING_START = '[training] fetch training list start',
  FETCH_TRAINING_SUCCESS = '[training] fetch training list success',
  ADD_WORKER_TRAINING_START = '[training] add worker training start',
  ADD_WORKER_TRAINING_SUCCESS = '[training] add worker training success',
  UPDATE_WORKER_TRAINING_START = '[training] update worker training start',
  UPDATE_WORKER_TRAINING_SUCCESS = '[training] update worker training success',
  DELETE_WORKER_TRAINING_START = '[training] delete worker training start',
  DELETE_WORKER_TRAINING_SUCCESS = '[training] delete worker training success',
  FETCH_WORKER_TRAINING_LIST_START = '[training] fetch worker training list start',
  FETCH_WORKER_TRAINING_LIST_SUCCESS = '[training] fetch worker training list success',
  FETCH_WORKER_TRAINING_DETAIL_START = '[training] fetch worker training detail start',
  FETCH_WORKER_TRAINING_DETAIL_SUCCESS = '[training] fetch worker training detail success',
  UPLOAD_WORKER_TRAINING_LIST_START = '[training] upload worker training list start',
  CLEAR_WORKER_MAP = '[training] clear worker map',
}

export const actions = {
  fetchTrainingListStart: () => ({ type: ActionType.FETCH_TRAINING_START, payload: {} }),
  fetchTrainingListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_TRAINING_SUCCESS, payload: { list } }),
  addWorkerTrainingStart: (id: string, training: TrainingModel.IWorkerTraining, uploadId: string) => ({
    type: ActionType.ADD_WORKER_TRAINING_START,
    payload: { id, training, uploadId },
  }),
  addWorkerTrainingSuccess: (training: { workerId: string; workerTrainingId: string }) => ({
    type: ActionType.ADD_WORKER_TRAINING_SUCCESS,
    payload: { training },
  }),
  updateWorkerTrainingStart: (id: string, training: TrainingModel.IWorkerTraining, uploadId: string) => ({
    type: ActionType.UPDATE_WORKER_TRAINING_START,
    payload: { id, training, uploadId },
  }),
  updateWorkerTrainingSuccess: (training: TrainingModel.IWorkerTraining) => ({
    type: ActionType.UPDATE_WORKER_TRAINING_SUCCESS,
    payload: { training },
  }),
  deleteWorkerTrainingStart: (workerId: string, trainingId: string) => ({
    type: ActionType.DELETE_WORKER_TRAINING_START,
    payload: { workerId, trainingId },
  }),
  deleteWorkerTrainingSuccess: (training: TrainingModel.IWorkerTraining) => ({
    type: ActionType.DELETE_WORKER_TRAINING_SUCCESS,
    payload: { training },
  }),
  fetchWorkerTrainingListStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKER_TRAINING_LIST_START,
    payload: { id, query },
  }),
  fetchWorkerTrainingListSuccess: (list: TrainingModel.IWorkerTraining[], count: number) => ({
    type: ActionType.FETCH_WORKER_TRAINING_LIST_SUCCESS,
    payload: { list, count },
  }),
  fetchWorkerTrainingDetailStart: (id: string, trainId: string) => ({ type: ActionType.FETCH_WORKER_TRAINING_DETAIL_START, payload: { id, trainId } }),
  fetchWorkerTrainingDetailSuccess: (training: TrainingModel.IWorkerTraining) => ({
    type: ActionType.FETCH_WORKER_TRAINING_DETAIL_SUCCESS,
    payload: { training },
  }),
  uploadWorkerTrainingListStart: (workerId: string, trainingId: string, list: FileModel.IFile[]) => ({
    type: ActionType.UPLOAD_WORKER_TRAINING_LIST_START,
    payload: { workerId, trainingId, list },
  }),
  clearWorkerMap: () => ({ type: ActionType.CLEAR_WORKER_MAP, payload: {} }),
};
