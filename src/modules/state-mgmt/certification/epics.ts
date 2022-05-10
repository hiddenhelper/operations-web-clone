import { Epic, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { concat, of, EMPTY } from 'rxjs';

import { GENERAL } from '../../../constants';
import { generalState } from '../general';
import { fileState } from '../file';
import { coreState } from '../core';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { FileModel, GeneralModel } from '../../models';
import { isEmpty } from 'utils';
import { ToastType } from 'modules/models/general';

export const fetchCertificationListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CERTIFICATION_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, true)),
        deps.apiService.getCertifications().pipe(map(res => actions.fetchCertificationListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CERTIFICATION_LIST, false, true, error))
        )
      )
    )
  );

export const fetchWorkerCertificationListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_CERTIFICATION_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, true)),
        deps.apiService
          .getWorkerCertificationList(payload.id, payload.query)
          .pipe(map(res => actions.fetchWorkerCertificationListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION, false, true, error))
        )
      )
    )
  );

export const fetchWorkerCertificationDetailStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_CERTIFICATION_DETAIL_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, true)),
        deps.apiService.getWorkerCertification(payload.id, payload.certId).pipe(map(res => actions.fetchWorkerCertificationDetailSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_CERTIFICATION_SUMMARY, false, true, error))
        )
      )
    )
  );

export const addWorkerCertificationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ADD_WORKER_CERTIFICATION_START),
    mergeMap(({ payload }) =>
      concat(
        of(
          generalState.actions.setLoading(
            GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION,
            true,
            false,
            undefined,
            GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
          )
        ),
        deps.apiService.addWorkerCertification(payload.id, payload.certification).pipe(
          mergeMap(res => {
            const filteredFiles = state$?.value?.file?.fileMap[payload.uploadId]
              ? Object.values(state$.value.file.fileMap[payload.uploadId]).filter(file => file.status !== FileModel.FileStatus.FAIL)
              : [];
            return [
              filteredFiles.length > 0 && actions.uploadWorkerCertificationListStart(payload.id, res.id, filteredFiles),
              actions.addWorkerCertificationSuccess(res),
            ].filter(Boolean);
          })
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const updateWorkerCertificationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_WORKER_CERTIFICATION_START),
    mergeMap(({ payload }) =>
      concat(
        of(
          generalState.actions.setLoading(
            GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION,
            true,
            false,
            undefined,
            GENERAL.TRACE_KEY.UPDATE_UPLOAD_WORKER_CERTIFICATION
          )
        ),
        isEmpty(state$?.value?.file?.defaultFilesToRemove)
          ? EMPTY
          : deps.apiService
              .deleteWorkerCertificationFiles(payload.id, payload.certification.id, state$?.value?.file?.defaultFilesToRemove)
              .pipe(mergeMap(() => EMPTY)),
        deps.apiService.updateWorkerCertification(payload.id, payload.certification).pipe(
          mergeMap(res => {
            const filteredFiles = state$?.value?.file?.fileMap[payload.uploadId]
              ? Object.values(state$.value.file.fileMap[payload.uploadId]).filter(file => file.status !== FileModel.FileStatus.FAIL)
              : [];
            return [
              filteredFiles.length > 0 && actions.uploadWorkerCertificationListStart(payload.id, res.id, filteredFiles),
              actions.updateWorkerCertificationSuccess(res),
            ].filter(Boolean);
          })
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_CERTIFICATION, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const deleteWorkerCertificationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_WORKER_CERTIFICATION_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, true)),
        deps.apiService
          .deleteWorkerCertification(payload.workerId, payload.certificationId)
          .pipe(
            mergeMap(res => [
              actions.deleteWorkerCertificationSuccess(res),
              generalState.actions.addToastStart(`Certification deleted successfully!`, ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_CERTIFICATION, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const uploadWorkerCertificationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_WORKER_CERTIFICATION_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(
          generalState.actions.setLoading(
            GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST,
            true,
            false,
            undefined,
            GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION
          )
        ),
        deps.apiService
          .getWorkerCertificationResource(
            payload.workerId,
            payload.certificationId,
            payload.list.map(file => file.file.name)
          )
          .pipe(map(response => fileState.actions.uploadFileListStart(response, payload.list, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_CERTIFICATION_LIST, false, true, error))
        )
      )
    )
  );

export const epics = [
  fetchCertificationListStart,
  fetchWorkerCertificationListStart,
  fetchWorkerCertificationDetailStart,
  addWorkerCertificationStart,
  uploadWorkerCertificationStart,
  updateWorkerCertificationStart,
  deleteWorkerCertificationStart,
];
