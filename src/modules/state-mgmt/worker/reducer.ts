import { initialState, IState } from './state';
import { ActionType } from './actions';
import { preloadWorker, preloadConsentForm } from '../../../utils/workerUtils';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }) => {
  switch (type) {
    case ActionType.FETCH_WORKER_LIST_SUCCESS:
      return { ...state, workerMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: preloadWorker(item) }), {}), count: payload.count };
    case ActionType.UPDATE_WORKER_SUCCESS:
      return { ...state, workerMap: { ...state.workerMap, [payload.worker.id]: preloadWorker(payload.worker) } };
    case ActionType.FETCH_ETHNICITY_SUCCESS:
      return { ...state, ethnicityList: payload.list };
    case ActionType.FETCH_LANGUAGE_SUCCESS:
      return { ...state, languageList: payload.list };
    case ActionType.FETCH_SKILLED_TRADE_SUCCESS:
      return { ...state, skilledTradeList: payload.list };
    case ActionType.FETCH_IDENTIFICATION_TYPE_SUCCESS:
      return { ...state, identificationTypeList: payload.list };
    case ActionType.FETCH_WORKER_PROJECT_LIST_SUCCESS:
      return { ...state, projectList: payload.list };
    case ActionType.FETCH_WORKER_ACTIVITY_SUCCESS:
      return { ...state, workerActivityList: payload.list, workerActivityCount: payload.count };
    case ActionType.FETCH_WORKER_OBSERVATIONS_SUCCESS:
      return { ...state, workerObservationList: payload.list, workerObservationCount: payload.count };
    case ActionType.FETCH_WORKER_OBSERVATION_SUCCESS:
      return { ...state, observation: payload.observation };
    case ActionType.CLEAR_WORKER_MAP:
      return { ...state, workerMap: {}, workerProjectMap: {}, count: null };
    case ActionType.CLEAR_WORKER_ACTIVITY_LIST:
      return { ...state, workerActivityList: [], workerActivityCount: 0 };
    case ActionType.CLEAR_WORKER_OBSERVATION_LIST:
      return { ...state, workerObservationList: [], workerObservationCount: 0 };
    case ActionType.FETCH_PROJECT_WORKER_LIST_SUCCESS:
      return {
        ...state,
        workerProjectMap: { [payload.projectId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_CLIENT_WORKER_LIST_SUCCESS:
      return {
        ...state,
        workerClientMap: { [payload.clientId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_CONSENT_FORM_SUCCESS:
      return { ...state, consentForm: preloadConsentForm(payload.consentForm) };
    case ActionType.CLEAR_CONSENT_FORM:
      return { ...state, consentForm: null };
    case ActionType.FETCH_GEOGRAPHIC_LOCATIONS_SUCCESS:
      return { ...state, geographicLocationsList: payload.list };
    case ActionType.FETCH_JOB_TITLES_SUCCESS:
      return { ...state, jobTitlesList: payload.list };
    case ActionType.FETCH_SOC_JOB_TITLES_SUCCESS:
      return { ...state, socJobTitlesList: payload.list };
    case ActionType.FETCH_TRADE_STATUSES_SUCCESS:
      return { ...state, tradeStatusesList: payload.list };
    case ActionType.FETCH_LANGUAGE_TURNER_PROTOCOLS_SUCCESS:
      return { ...state, languageTurnerProtocolsList: payload.list };
    default:
      return state;
  }
};
