import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { IEpicDependencies } from '../rootState';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { coreState } from '../core';
import { generalState } from '../general';
import {
  fetchTrainingListStart,
  fetchWorkerTrainingListStart,
  fetchWorkerTrainingDetailStart,
  addWorkerTrainingStart,
  updateWorkerTrainingStart,
  deleteWorkerTrainingStart,
  uploadWorkerTrainingStart,
} from './epics';
import { actions } from './actions';
import { GENERAL } from '../../../constants';
import { getWorkerTraining_1, getWorker_1, getTraining_1, getUploadFile_1, getFileResource_2, getFileResource_1 } from '../../../test/entities';
import { ToastType } from '../../models/general';
import { fileState } from '../file';

describe('training epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('fetchTrainingListStart', () => {
    it('should get epic for project fetch trainings', () => {
      return runEpic(fetchTrainingListStart(ActionsObservable.of(actions.fetchTrainingListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, true));
        expect(deps.apiService.getTrainings).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTrainingListSuccess([getTraining_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getTrainings = () => throwError(error);
      return runEpic(fetchTrainingListStart(ActionsObservable.of(actions.fetchTrainingListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, false, true, error));
      });
    });
  });

  describe('fetchWorkerTrainingListStart', () => {
    it('should get epic for worker fetch worker training list', () => {
      return runEpic(fetchWorkerTrainingListStart(ActionsObservable.of(actions.fetchWorkerTrainingListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, true));
        expect(deps.apiService.getWorkerTrainingList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkerTrainingListSuccess([getWorkerTraining_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerTrainingList = () => throwError(error);
      return runEpic(fetchWorkerTrainingListStart(ActionsObservable.of(actions.fetchWorkerTrainingListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, false, true, error));
      });
    });
  });

  describe('fetchWorkerTrainingDetailStart', () => {
    it('should get epic for worker fetch worker training list', () => {
      return runEpic(fetchWorkerTrainingDetailStart(ActionsObservable.of(actions.fetchWorkerTrainingDetailStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, true));
        expect(deps.apiService.getWorkerTraining).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchWorkerTrainingDetailSuccess(getWorkerTraining_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerTraining = () => throwError(error);
      return runEpic(fetchWorkerTrainingDetailStart(ActionsObservable.of(actions.fetchWorkerTrainingDetailStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, false, true, error));
      });
    });
  });

  describe('addWorkerTrainingStart', () => {
    const uploadId = 'upload-test-id';
    const stateMgmt = { value: { file: { fileMap: {} } } } as any;
    it('should get epic for worker add training', () => {
      stateMgmt.value.file.fileMap = {};
      return runEpic(
        addWorkerTrainingStart(ActionsObservable.of(actions.addWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), uploadId)), stateMgmt, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING)
          );
          expect(deps.apiService.addWorkerTraining).toHaveBeenCalledWith(getWorker_1().id, getWorkerTraining_1());
          expect(actionList[1]).toEqual(actions.addWorkerTrainingSuccess({ workerId: getWorker_1().id, workerTrainingId: getWorkerTraining_1().id }));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, false));
        }
      );
    });

    it('should get epic for worker add training and upload files', () => {
      stateMgmt.value.file.fileMap = { [uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } };
      return runEpic(
        addWorkerTrainingStart(ActionsObservable.of(actions.addWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), uploadId)), stateMgmt, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING)
          );
          expect(deps.apiService.addWorkerTraining).toHaveBeenCalledWith(getWorker_1().id, getWorkerTraining_1());
          expect(actionList[1]).toEqual(
            actions.uploadWorkerTrainingListStart(getWorker_1().id, getWorkerTraining_1().id, Object.values(stateMgmt.value.file.fileMap[uploadId]))
          );
          expect(actionList[2]).toEqual(actions.addWorkerTrainingSuccess({ workerId: getWorker_1().id, workerTrainingId: getWorkerTraining_1().id }));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, false));
        }
      );
    });

    it('should get epic for worker update training and upload files', () => {
      stateMgmt.value.file = { fileMap: { [uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } }, defaultFilesToRemove: [getFileResource_1().fileId] };
      return runEpic(
        updateWorkerTrainingStart(ActionsObservable.of(actions.updateWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), uploadId)), stateMgmt, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.UPDATE_UPLOAD_WORKER_TRAINING)
          );
          expect(deps.apiService.deleteWorkerTrainingFiles).toHaveBeenCalledWith(
            getWorker_1().id,
            getWorkerTraining_1().id,
            stateMgmt.value.file.defaultFilesToRemove
          );
          expect(deps.apiService.updateWorkerTraining).toHaveBeenCalledWith(getWorker_1().id, getWorkerTraining_1());
          expect(actionList[1]).toEqual(
            actions.uploadWorkerTrainingListStart(getWorker_1().id, getWorkerTraining_1().id, Object.values(stateMgmt.value.file.fileMap[uploadId]))
          );
          expect(actionList[2]).toEqual(actions.updateWorkerTrainingSuccess(getWorkerTraining_1()));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, false));
        }
      );
    });

    it('should get epic for worker delete training', () => {
      return runEpic(
        deleteWorkerTrainingStart(ActionsObservable.of(actions.deleteWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1().id)), stateMgmt, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, true));
          expect(deps.apiService.deleteWorkerTraining).toHaveBeenCalledWith(getWorker_1().id, getWorkerTraining_1().id);
          expect(actionList[1]).toEqual(actions.deleteWorkerTrainingSuccess(getWorkerTraining_1()));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart(`Training deleted successfully!`, ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.addWorkerTraining = () => throwError(error);
      return runEpic(
        addWorkerTrainingStart(ActionsObservable.of(actions.addWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), 'uploadId')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING)
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, ToastType.ERROR));
        }
      );
    });

    it('should catch errors on update', () => {
      deps.apiService.updateWorkerTraining = () => throwError(error);
      return runEpic(
        updateWorkerTrainingStart(
          ActionsObservable.of(actions.updateWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), 'uploadId')),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.UPDATE_UPLOAD_WORKER_TRAINING)
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, ToastType.ERROR));
        }
      );
    });

    it('should catch errors on delete', () => {
      deps.apiService.deleteWorkerTraining = () => throwError(error);
      return runEpic(
        deleteWorkerTrainingStart(ActionsObservable.of(actions.deleteWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1().id)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, ToastType.ERROR));
        }
      );
    });
  });

  describe('uploadWorkerTrainingStart', () => {
    const fileList = [{ file: { name: 'test.png' } } as any];
    it('should get epic for worker fetch upload worker training', () => {
      return runEpic(
        uploadWorkerTrainingStart(
          ActionsObservable.of(actions.uploadWorkerTrainingListStart(getWorker_1().id, getWorkerTraining_1().id, fileList)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING
            )
          );
          expect(deps.apiService.getWorkerTrainingResource).toHaveBeenCalled();
          expect(actionList[1]).toEqual(
            fileState.actions.uploadFileListStart([getFileResource_1(), getFileResource_2()], fileList, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING)
          );
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerTrainingResource = () => throwError(error);
      return runEpic(
        uploadWorkerTrainingStart(ActionsObservable.of(actions.uploadWorkerTrainingListStart(getWorker_1().id, getWorkerTraining_1().id, [])), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING
            )
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST, false, true, error));
        }
      );
    });
  });
});
