import { Epic, ofType } from 'redux-observable';
import { of, concat } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { GENERAL } from '../../../constants';
import { actions, ActionType } from './actions';
import { coreState } from '../core';
import { generalState } from '../general';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { handleToastError } from '../core/operators';
import { ToastType } from '../../models/general';
import { ProcoreErrorKeys } from 'modules/models/procore';

const ProcoreErrorsArray = [ProcoreErrorKeys.UNABLE_TO_CONNECT_WITH_PROCORE, ProcoreErrorKeys.PROCORE_VALIDATION_ERROR];

export const fetchStatusProcore: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.PROCORE_STATUS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE, true)),
        deps.apiService.getStatusProcore().pipe(map(res => actions.getStatusProcoreSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROCORE, ProcoreErrorsArray))
    )
  );

export const fetchProcoreReportFrequency: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROCORE_REPORT_FREQUENCY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_REPORT_FREQUENCY, true)),
        deps.apiService.getReportFrequency(payload).pipe(map(res => actions.fetchProcoreReportFrequencySuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_REPORT_FREQUENCY, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROCORE_REPORT_FREQUENCY))
    )
  );

export const saveProcoreReportFrequency: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_PROCORE_REPORT_FREQUENCY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_REPORT_FREQUENCY, true)),
        deps.apiService.saveReportFrequency(payload.clientId, payload.frequency).pipe(map(res => actions.saveProcoreReportFrequencySuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_REPORT_FREQUENCY, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_PROCORE_REPORT_FREQUENCY))
    )
  );

export const fetchProcoreProjects: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROCORE_PROJECTS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, true)),
        deps.apiService.getProcoreProjects(payload).pipe(map(res => actions.fetchProcoreProjectsSuccess(payload, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS, ProcoreErrorsArray))
    )
  );

export const fetchProcoreProjectMappings: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROCORE_PROJECT_MAPPINGS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, true)),
        deps.apiService.getProcoreProjectMappings(payload).pipe(map(res => actions.fetchProcoreProjectMappingsSuccess(payload, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS, ProcoreErrorsArray))
    )
  );

export const fetchProcoreVendors: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROCORE_VENDORS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, true)),
        deps.apiService.getProcoreVendors(payload).pipe(map(res => actions.fetchProcoreVendorsSuccess(payload, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS, ProcoreErrorsArray))
    )
  );

export const fetchProcoreVendorMappings: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROCORE_VENDOR_MAPPINGS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, true)),
        deps.apiService.getProcoreVendorMappings(payload).pipe(map(res => actions.fetchProcoreVendorMappingsSuccess(payload, res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS, ProcoreErrorsArray))
    )
  );

export const saveProcoreProjectMappings: Epic<any, any, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_PROCORE_PROJECT_MAPPINGS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_PROJECT_MAPPINGS, true)),
        deps.apiService
          .saveProcoreProjectMappings(payload.clientId, payload.mappings)
          .pipe(map(res => actions.saveProcoreProjectMappingsSuccess(payload, res)))
          .pipe(map(res => actions.fetchProcoreProjectMappingsStart(payload.clientId))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_PROJECT_MAPPINGS, false)),
        of(generalState.actions.addToastStart(`Project Mappings updated successfully!`, ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_PROCORE_PROJECT_MAPPINGS, ProcoreErrorsArray))
    )
  );

export const saveProcoreVendorMappings: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_PROCORE_VENDOR_MAPPINGS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, true)),
        deps.apiService.saveProcoreVendorMappings(payload.clientId, payload.mappings).pipe(map(res => actions.saveProcoreVendorMappingsSuccess(payload, res))),
        of(actions.fetchProcoreVendorMappingsStart(payload.clientId)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, false)),
        of(generalState.actions.addToastStart(`Vendor Mappings updated successfully!`, ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS, ProcoreErrorsArray))
    )
  );

export const connectProcore: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.CONNECT_PROCORE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE, true)),
        deps.apiService.connectProcore(payload).pipe(map(res => actions.connectProcoreSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_PROCORE, false)),
        of(generalState.actions.addToastStart(`Procore connected successfully! FC Analytics and Procore are now connected.`, ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_PROCORE, ProcoreErrorsArray))
    )
  );

export const disconnectProcore: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DISCONNECT_PROCORE_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DISCONNECT_PROCORE, true)),
        deps.apiService.disconnectProcore().pipe(map(res => actions.disconnectProcoreSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DISCONNECT_PROCORE, false)),
        of(generalState.actions.addToastStart(`Procore disconnected successfully! FC Analytics and Procore and now disconnected.`, ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.DISCONNECT_PROCORE))
    )
  );

export const fetchProcoreClients: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROCORE_CLIENTS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, true)),
        deps.apiService.getProcoreClients().pipe(map(res => actions.getProcoreClientsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS, false, true, error))
        )
      )
    )
  );

export const epics = [
  fetchProcoreClients,
  fetchStatusProcore,
  connectProcore,
  disconnectProcore,
  fetchProcoreProjects,
  fetchProcoreReportFrequency,
  fetchProcoreProjectMappings,
  fetchProcoreVendors,
  fetchProcoreVendorMappings,
  saveProcoreProjectMappings,
  saveProcoreVendorMappings,
  saveProcoreReportFrequency,
];
