import { Epic, ofType } from 'redux-observable';
import { of, concat, from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { GENERAL } from '../../../constants';
import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { generalState } from '../general';
import { coreState } from '../core';
import { IFile, IUploadFileListStartPayload, IS3FileResponse } from 'modules/models/file';

export const uploadFileStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_FILE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(payload.url, true, false, undefined, payload.traceId)),
        deps.apiService.uploadFile(payload.file, payload.url).pipe(
          mergeMap(file => {
            if (file.progress < 100) {
              return of(actions.uploadProgress(file));
            }
            return deps.apiService.uploadConfirm(payload.fileId).pipe(map(() => actions.uploadProgress(file)));
          }),
          catchError(error => of(coreState.actions.epicError(error), actions.uploadProgress(error)))
        ),
        of(generalState.actions.setLoading(payload.url, false))
      )
    )
  );

export const uploadFileListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_FILE_LIST_START),
    mergeMap(({ payload }: { payload: IUploadFileListStartPayload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_FILE_LIST, true, false, undefined, payload.traceId)),
        from(payload.fileList).pipe(
          map((file: IFile, index: number) => {
            const fileName = file.file.name;
            const filteredRemoteFile: IS3FileResponse = payload.list.filter(remoteFile => remoteFile.fileName === fileName)[0];
            const result = filteredRemoteFile || payload.list[index];
            return actions.uploadFileStart(file, result.url, result.fileId, payload.traceId);
          })
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_FILE_LIST, false))
      )
    )
  );

export const epics = [uploadFileListStart, uploadFileStart];
