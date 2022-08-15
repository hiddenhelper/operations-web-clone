import { Epic, ofType } from 'redux-observable';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { map, mergeMap, tap } from 'rxjs/operators';
import { concat, EMPTY, of } from 'rxjs';
import { generalState } from '../general';
import { GENERAL, LANG } from '../../../constants';
import { push } from 'connected-react-router';
import { handleError, handleToastError } from '../core/operators';
import { actions, ActionType } from './actions';
import { GeneralModel } from '../../models';
import { getWorkerAssignQuery } from '../../../utils/workerUtils';

export const saveWorkerStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_WORKER_START),
    mergeMap(({ payload }) => {
      const isFcaUser = state$.value.auth.isFcaUser;
      return concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true)),
        (isFcaUser ? deps.apiService.saveWorker(payload.worker) : deps.apiService.saveSelfWorker(payload.worker)).pipe(
          mergeMap(res =>
            of(
              actions.fetchWorkerListSuccess([res], 1),
              push('/workers', { success: true }),
              generalState.actions.addToastStart('Worker created successfully! Invitation sent.', GeneralModel.ToastType.SUCCESS)
            )
          )
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false))
      ).pipe(
        handleError(GENERAL.LOADING_KEY.SAVE_WORKER, error =>
          [
            error.response.errorCode !== LANG.EN.ERROR_CODES.WORKER_ALREADY_EXISTS &&
              generalState.actions.addToastStart(error.response.title, GeneralModel.ToastType.ERROR),
          ].filter(Boolean)
        )
      );
    })
  );

export const updateWorkerStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_WORKER_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, true)),
        deps.apiService
          .updateWorker(payload.worker)
          .pipe(
            mergeMap(res =>
              of(
                actions.updateWorkerSuccess(res),
                push(`/workers/detail/${payload.worker.id}`, { success: true }),
                generalState.actions.addToastStart('Worker updated successfully!', GeneralModel.ToastType.SUCCESS)
              )
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_WORKER, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_WORKER, ['WORKER_IS_ASSIGNED_TO_ACTIVE_PROJECT']))
    )
  );

export const fetchWorkerStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER, true)),
        deps.apiService.getWorker(payload.id).pipe(map(worker => actions.updateWorkerSuccess(worker))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER))
    )
  );

export const fetchWorkerListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_LIST_START),
    mergeMap(({ payload }) => {
      const isFcaUser = state$.value.auth.isFcaUser;
      return concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true)),
        (isFcaUser ? deps.apiService.getWorkerList(payload.query) : deps.apiService.getSelfWorkerList(payload.query)).pipe(
          map(res => actions.fetchWorkerListSuccess(res.items, res.totalResults))
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_LIST));
    })
  );

export const fetchProjectWorkerListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_WORKER_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST, true)),
        deps.apiService.getProjectWorkerList(payload).pipe(map(res => actions.fetchProjectWorkerListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST))
    )
  );

export const fetchEthnicityListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ETHNICITY_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST, true)),
        deps.apiService.getEthnicities().pipe(map(res => actions.fetchEthnicityListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_ETHNICITY_LIST))
    )
  );

export const fetchLanguageListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_LANGUAGE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST, true)),
        deps.apiService.getLanguages().pipe(map(res => actions.fetchLanguageListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_LANGUAGE_LIST))
    )
  );

export const fetchSkilledTradeListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SKILLED_TRADE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST, true)),
        deps.apiService.getSkilledTrades().pipe(map(res => actions.fetchSkilledTradeListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_SKILLED_TRADE_LIST))
    )
  );

export const fetchIdentificationTypeListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_IDENTIFICATION_TYPE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE, true)),
        deps.apiService.getIdentificationTypes().pipe(map(res => actions.fetchIdentificationTypeListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_IDENTIFICATION_TYPE))
    )
  );

export const fetchWorkerProjectListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_PROJECT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST, true)),
        deps.apiService.getWorkerProjectNameList(payload.id).pipe(map(res => actions.fetchProjectListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT_LIST))
    )
  );

export const fetchWorkerProjectAssignListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_PROJECT_ASSIGN_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, true)),
        deps.apiService.getWorkerList(getWorkerAssignQuery(payload.query)).pipe(map(res => generalState.actions.setModalMap(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_LIST))
    )
  );

export const fetchClientWorkerListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_WORKER_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST, true)),
        deps.apiService
          .getClientWorkerList(payload.id, payload.query)
          .pipe(map(res => actions.fetchClientWorkerListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST))
    )
  );

export const fetchWorkerActivityListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_ACTIVITY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST, true)),
        deps.apiService.getWorkerActivityList(payload.id, payload.query).pipe(map(res => actions.fetchWorkerActivitySuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_ACTIVITY_LIST))
    )
  );

export const fetchWorkerObservationListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_OBSERVATIONS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST, true)),
        deps.apiService
          .getWorkerObservationList(payload.id, payload.query)
          .pipe(map(res => actions.fetchWorkerObservationsSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION_LIST))
    )
  );

export const fetchConsentFormStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CONSENT_FORM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, true)),
        (payload.isEditable
          ? deps.apiService.getEditableConsentForm(payload.workerId, payload.projectId)
          : deps.apiService.getConsentForm(payload.workerId, payload.projectId)
        ).pipe(map(res => actions.fetchConsentFormSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_CONSENT_FORM, []))
    )
  );

export const saveConsentFormStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_CONSENT_FORM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, true)),
        deps.apiService
          .saveConsentForm(payload.workerId, payload.projectId, payload.data)
          .pipe(
            mergeMap(res => [
              actions.fetchConsentFormSuccess(res),
              generalState.actions.addToastStart('Consent form edited successfully!', GeneralModel.ToastType.SUCCESS),
            ])
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM, []))
    )
  );

export const fetchWorkerObservationStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_WORKER_OBSERVATION_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION, true)),
        deps.apiService.getWorkerObservation(payload.workerId, payload.id).pipe(map(res => actions.fetchWorkerObservationSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION))
    )
  );

export const downloadConsentFormStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DOWNLOAD_CONSENT_FORM_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM, true)),
        deps.apiService.downloadConsentForm(payload.id, payload.projectId).pipe(
          tap(res => deps.fileService.download(`${payload.name}.pdf`, res.newFile)),
          mergeMap(() => EMPTY)
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.DOWNLOAD_CONSENT_FORM))
    )
  );

export const fetchGeographicLocationsListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_GEOGRAPHIC_LOCATIONS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS, true)),
        deps.apiService.getGeographicLocationsList().pipe(map(res => actions.fetchGeographicLocationsListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_GEOGRAPHIC_LOCATIONS))
    )
  );

export const fetchJobTitlesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_JOB_TITLES_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_JOB_TITLES, true)),
        deps.apiService.getJobTitles().pipe(map(res => actions.fetchJobTitlesSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_JOB_TITLES, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_JOB_TITLES))
    )
  );

export const fetchSocJobTitlesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SOC_JOB_TITLES_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES, true)),
        deps.apiService.getSocJobTitles().pipe(map(res => actions.fetchSocJobTitlesSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_SOC_JOB_TITLES))
    )
  );

export const fetchTradeStatusesStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_TRADE_STATUSES_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES, true)),
        deps.apiService.getTradeStatuses().pipe(map(res => actions.fetchTradeStatusesSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_TRADE_STATUSES))
    )
  );

export const fetchLanguageTurnerProtocolsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_LANGUAGE_TURNER_PROTOCOLS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS, true)),
        deps.apiService.getLanguageTurnerProtocols().pipe(map(res => actions.fetchLanguageTurnerProtocolsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_LANGUAGE_TURNER_PROTOCOLS))
    )
  );

export const epics = [
  saveWorkerStart,
  fetchWorkerStart,
  updateWorkerStart,
  fetchWorkerListStart,
  fetchEthnicityListStart,
  fetchLanguageListStart,
  fetchSkilledTradeListStart,
  fetchIdentificationTypeListStart,
  fetchWorkerProjectListStart,
  fetchProjectWorkerListStart,
  fetchClientWorkerListStart,
  fetchWorkerProjectAssignListStart,
  fetchConsentFormStart,
  saveConsentFormStart,
  fetchWorkerActivityListStart,
  fetchWorkerObservationListStart,
  fetchWorkerObservationStart,
  downloadConsentFormStart,
  fetchGeographicLocationsListStart,
  fetchJobTitlesStart,
  fetchSocJobTitlesStart,
  fetchTradeStatusesStart,
  fetchLanguageTurnerProtocolsStart,
];
