import { Epic, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { concat, EMPTY, of } from 'rxjs';

import { GENERAL } from '../../../constants';
import { generalState } from '../general';
import { fileState } from '../file';
import { coreState } from '../core';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { FileModel, GeneralModel } from '../../models';
import { isEmpty } from 'utils';
import { ToastType } from 'modules/models/general';

export const fetchTrainingListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_TRAINING_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, true)),
        deps.apiService.getTrainings().pipe(map(res => actions.fetchTrainingListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRAINING_LIST, false, true, error))
        )
      )
    )
  );

export const fetchWorkerTrainingListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_TRAINING_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, true)),
        deps.apiService.getWorkerTrainingList(payload.id, payload.query).pipe(map(res => actions.fetchWorkerTrainingListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING, false, true, error))
        )
      )
    )
  );

export const fetchWorkerTrainingDetailStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_TRAINING_DETAIL_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, true)),
        deps.apiService.getWorkerTraining(payload.id, payload.trainId).pipe(map(res => actions.fetchWorkerTrainingDetailSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_TRAINING_SUMMARY, false, true, error))
        )
      )
    )
  );

export const addWorkerTrainingStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.ADD_WORKER_TRAINING_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING)),
        deps.apiService.addWorkerTraining(payload.id, payload.training).pipe(
          mergeMap(res => {
            const filteredFiles = state$?.value?.file?.fileMap[payload.uploadId]
              ? Object.values(state$.value.file.fileMap[payload.uploadId]).filter(file => file.status !== FileModel.FileStatus.FAIL)
              : [];
            return [
              filteredFiles.length > 0 && actions.uploadWorkerTrainingListStart(payload.id, res[0]?.workerTrainingId, filteredFiles),
              actions.addWorkerTrainingSuccess(res[0]),
            ].filter(Boolean);
          })
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const updateWorkerTrainingStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_WORKER_TRAINING_START),
    mergeMap(({ payload }) =>
      concat(
        of(
          generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, true, false, undefined, GENERAL.TRACE_KEY.UPDATE_UPLOAD_WORKER_TRAINING)
        ),
        isEmpty(state$?.value?.file?.defaultFilesToRemove)
          ? EMPTY
          : deps.apiService.deleteWorkerTrainingFiles(payload.id, payload.training.id, state$?.value?.file?.defaultFilesToRemove).pipe(mergeMap(() => EMPTY)),
        deps.apiService.updateWorkerTraining(payload.id, payload.training).pipe(
          mergeMap(res => {
            const filteredFiles = state$?.value?.file?.fileMap[payload.uploadId]
              ? Object.values(state$.value.file.fileMap[payload.uploadId]).filter(file => file.status !== FileModel.FileStatus.FAIL)
              : [];
            return [
              filteredFiles.length > 0 && actions.uploadWorkerTrainingListStart(payload.id, res.id, filteredFiles),
              actions.updateWorkerTrainingSuccess(res),
            ].filter(Boolean);
          })
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_WORKER_TRAINING, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const deleteWorkerTrainingStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_WORKER_TRAINING_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, true)),
        deps.apiService
          .deleteWorkerTraining(payload.workerId, payload.trainingId)
          .pipe(
            mergeMap(res => [actions.deleteWorkerTrainingSuccess(res), generalState.actions.addToastStart(`Training deleted successfully!`, ToastType.SUCCESS)])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, false))
      ).pipe(
        catchError(error =>
          of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_WORKER_TRAINING, false, true, error),
            generalState.actions.addToastStart(error.title, GeneralModel.ToastType.ERROR)
          )
        )
      )
    )
  );

export const uploadWorkerTrainingStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_WORKER_TRAINING_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(
          generalState.actions.setLoading(
            GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST,
            true,
            false,
            undefined,
            GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING
          )
        ),
        deps.apiService
          .getWorkerTrainingResource(
            payload.workerId,
            payload.trainingId,
            payload.list.map(file => file.file.name)
          )
          .pipe(map(response => fileState.actions.uploadFileListStart(response, payload.list, GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_WORKER_TRAINING_LIST, false, true, error))
        )
      )
    )
  );

export const epics = [
  fetchTrainingListStart,
  fetchWorkerTrainingListStart,
  fetchWorkerTrainingDetailStart,
  addWorkerTrainingStart,
  uploadWorkerTrainingStart,
  updateWorkerTrainingStart,
  deleteWorkerTrainingStart,
];
