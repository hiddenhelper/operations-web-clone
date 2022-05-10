import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { IEpicDependencies } from '../rootState';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { coreState } from '../core';
import { generalState } from '../general';
import {
  fetchCertificationListStart,
  fetchWorkerCertificationListStart,
  fetchWorkerCertificationDetailStart,
  addWorkerCertificationStart,
  updateWorkerCertificationStart,
  deleteWorkerCertificationStart,
  uploadWorkerCertificationStart,
} from './epics';
import { actions } from './actions';
import { GENERAL } from '../../../constants';
import { getWorkerCertification_1, getWorker_1, getCertification_1, getUploadFile_1, getFileResource_2, getFileResource_1 } from '../../../test/entities';
import { ToastType } from '../../models/general';
import { fileState } from '../file';

describe('certification epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('fetchCertificationListStart', () => {
    it('should get epic for project fetch certifications', () => {
      return runEpic(fetchCertificationListStart(ActionsObservable.of(actions.fetchCertificationListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, true));
        expect(deps.apiService.getCertifications).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchCertificationListSuccess([getCertification_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getCertifications = () => throwError(error);
      return runEpic(fetchCertificationListStart(ActionsObservable.of(actions.fetchCertificationListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, false, true, error));
      });
    });
  });

  describe('fetchWorkerCertificationListStart', () => {
    it('should get epic for worker fetch worker certification list', () => {
      return runEpic(
        fetchWorkerCertificationListStart(ActionsObservable.of(actions.fetchWorkerCertificationListStart(getWorker_1().id, {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, true));
          expect(deps.apiService.getWorkerCertificationList).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchWorkerCertificationListSuccess([getWorkerCertification_1()], 1));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerCertificationList = () => throwError(error);
      return runEpic(
        fetchWorkerCertificationListStart(ActionsObservable.of(actions.fetchWorkerCertificationListStart(getWorker_1().id, {})), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, false, true, error));
        }
      );
    });
  });

  describe('fetchWorkerCertificationDetailStart', () => {
    it('should get epic for worker fetch worker certification list', () => {
      return runEpic(
        fetchWorkerCertificationDetailStart(
          ActionsObservable.of(actions.fetchWorkerCertificationDetailStart(getWorker_1().id, getWorkerCertification_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, true));
          expect(deps.apiService.getWorkerCertification).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchWorkerCertificationDetailSuccess(getWorkerCertification_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerCertification = () => throwError(error);
      return runEpic(
        fetchWorkerCertificationDetailStart(
          ActionsObservable.of(actions.fetchWorkerCertificationDetailStart(getWorker_1().id, getWorkerCertification_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, false, true, error));
        }
      );
    });
  });

  describe('addWorkerCertificationStart', () => {
    const uploadId = 'upload-test-id';
    const stateMgmt = { value: { file: { fileMap: {} } } } as any;
    it('should get epic for worker add certification', () => {
      stateMgmt.value.file.fileMap = {};
      return runEpic(
        addWorkerCertificationStart(
          ActionsObservable.of(actions.addWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), uploadId)),
          stateMgmt,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(deps.apiService.addWorkerCertification).toHaveBeenCalledWith(getWorker_1().id, getWorkerCertification_1());
          expect(actionList[1]).toEqual(actions.addWorkerCertificationSuccess(getWorkerCertification_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION, false));
        }
      );
    });

    it('should get epic for worker add certification and upload files', () => {
      stateMgmt.value.file.fileMap = { [uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } };
      return runEpic(
        addWorkerCertificationStart(
          ActionsObservable.of(actions.addWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), uploadId)),
          stateMgmt,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(deps.apiService.addWorkerCertification).toHaveBeenCalledWith(getWorker_1().id, getWorkerCertification_1());
          expect(actionList[1]).toEqual(
            actions.uploadWorkerCertificationListStart(getWorker_1().id, getWorkerCertification_1().id, Object.values(stateMgmt.value.file.fileMap[uploadId]))
          );
          expect(actionList[2]).toEqual(actions.addWorkerCertificationSuccess(getWorkerCertification_1()));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION, false));
        }
      );
    });

    it('should get epic for worker update certification and upload files', () => {
      stateMgmt.value.file = { fileMap: { [uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } }, defaultFilesToRemove: [getFileResource_1().fileId] };
      return runEpic(
        updateWorkerCertificationStart(
          ActionsObservable.of(actions.updateWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), uploadId)),
          stateMgmt,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.UPDATE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(deps.apiService.deleteWorkerCertificationFiles).toHaveBeenCalledWith(
            getWorker_1().id,
            getWorkerCertification_1().id,
            stateMgmt.value.file.defaultFilesToRemove
          );
          expect(deps.apiService.updateWorkerCertification).toHaveBeenCalledWith(getWorker_1().id, getWorkerCertification_1());
          expect(actionList[1]).toEqual(
            actions.uploadWorkerCertificationListStart(getWorker_1().id, getWorkerCertification_1().id, Object.values(stateMgmt.value.file.fileMap[uploadId]))
          );
          expect(actionList[2]).toEqual(actions.updateWorkerCertificationSuccess(getWorkerCertification_1()));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION, false));
        }
      );
    });

    it('should get epic for worker delete certification', () => {
      return runEpic(
        deleteWorkerCertificationStart(
          ActionsObservable.of(actions.deleteWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1().id)),
          stateMgmt,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, true));
          expect(deps.apiService.deleteWorkerCertification).toHaveBeenCalledWith(getWorker_1().id, getWorkerCertification_1().id);
          expect(actionList[1]).toEqual(actions.deleteWorkerCertificationSuccess(getWorkerCertification_1()));
          expect(actionList[2]).toEqual(generalState.actions.addToastStart('Certification deleted successfully!', ToastType.SUCCESS));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.addWorkerCertification = () => throwError(error);
      return runEpic(
        addWorkerCertificationStart(
          ActionsObservable.of(actions.addWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), 'uploadId')),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, ToastType.ERROR));
        }
      );
    });

    it('should catch errors on update', () => {
      deps.apiService.updateWorkerCertification = () => throwError(error);
      return runEpic(
        updateWorkerCertificationStart(
          ActionsObservable.of(actions.updateWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), 'uploadId')),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.UPDATE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, ToastType.ERROR));
        }
      );
    });

    it('should catch errors on delete', () => {
      deps.apiService.deleteWorkerCertification = () => throwError(error);
      return runEpic(
        deleteWorkerCertificationStart(
          ActionsObservable.of(actions.deleteWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1().id)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, false, true, error));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart(error.title, ToastType.ERROR));
        }
      );
    });
  });

  describe('uploadWorkerCertificationStart', () => {
    const fileList = [{ file: { name: 'test.png' } } as any];
    it('should get epic for worker fetch upload worker certification', () => {
      return runEpic(
        uploadWorkerCertificationStart(
          ActionsObservable.of(actions.uploadWorkerCertificationListStart(getWorker_1().id, getWorkerCertification_1().id, fileList)),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(deps.apiService.getWorkerCertificationResource).toHaveBeenCalled();
          expect(actionList[1]).toEqual(
            fileState.actions.uploadFileListStart([getFileResource_1(), getFileResource_2()], fileList, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION)
          );
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getWorkerCertificationResource = () => throwError(error);
      return runEpic(
        uploadWorkerCertificationStart(
          ActionsObservable.of(actions.uploadWorkerCertificationListStart(getWorker_1().id, getWorkerCertification_1().id, [])),
          {} as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST,
              true,
              false,
              undefined,
              GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
            )
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST, false, true, error));
        }
      );
    });
  });
});
