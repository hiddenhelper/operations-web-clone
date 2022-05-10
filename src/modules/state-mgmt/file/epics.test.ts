import { ActionsObservable } from 'redux-observable';
import { of, throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { uploadFileListStart, uploadFileStart } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getUploadFile_1, getFileResource_1, getUploadFile_3 } from '../../../test/entities';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';

describe('file epics', () => {
  let deps: IEpicDependencies;
  let error;

  beforeEach(() => {
    Date.now = jest.fn(() => 123456);
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('uploadFileListStart', () => {
    it('should get epic for upload file list', () => {
      return runEpic(
        uploadFileListStart(ActionsObservable.of(actions.uploadFileListStart([getFileResource_1()], [getUploadFile_1()])), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_FILE_LIST, true, false, undefined, undefined));
          expect(actionList[1]).toEqual(actions.uploadFileStart(getUploadFile_1(), getFileResource_1().url, getFileResource_1().fileId));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_FILE_LIST, false));
        }
      );
    });
  });

  describe('uploadFileStart', () => {
    it('should get epic for upload file progress', () => {
      return runEpic(
        uploadFileStart(ActionsObservable.of(actions.uploadFileStart(getUploadFile_1(), getFileResource_1().url, getFileResource_1().fileId)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(getFileResource_1().url, true, false, undefined, undefined));
          expect(actionList[1]).toEqual(actions.uploadProgress(getUploadFile_1()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(getFileResource_1().url, false));
        }
      );
    });

    it('should get epic for upload file confirm', () => {
      deps.apiService.uploadFile = jest.fn().mockReturnValue(of(getUploadFile_3()));
      return runEpic(
        uploadFileStart(ActionsObservable.of(actions.uploadFileStart(getUploadFile_1(), getFileResource_1().url, getFileResource_1().fileId)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(getFileResource_1().url, true, false, undefined, undefined));
          expect(actionList[1]).toEqual(actions.uploadProgress(getUploadFile_3()));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(getFileResource_1().url, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.uploadFile = () => throwError(error);
      return runEpic(
        uploadFileStart(ActionsObservable.of(actions.uploadFileStart(getUploadFile_1(), getFileResource_1().url, getFileResource_1().fileId)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(getFileResource_1().url, true, false, undefined, undefined));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(actions.uploadProgress(error));
        }
      );
    });
  });
});
