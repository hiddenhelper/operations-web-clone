import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getWorker_1, getWorkerActivity_1, getProject_1, getClient_1, getConsentForm_1, getWorkerObservation_1 } from '../../../test/entities';

describe('worker reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on worker ActionType.FETCH_WORKER_LIST_SUCCESS', () => {
    const worker = getWorker_1();
    expect(reducer(undefined, actions.fetchWorkerListSuccess([worker as any], 1))).toEqual({ ...initialState, workerMap: { [worker.id]: worker }, count: 1 });
  });

  it('should return a new state on worker ActionType.CLEAR_WORKER_MAP', () => {
    expect(reducer(undefined, actions.clearWorkerMap())).toEqual({ ...initialState, workerMap: {} });
  });

  it('should return a new state on worker ActionType.CLEAR_WORKER_ACTIVITY_LIST', () => {
    expect(reducer(undefined, actions.clearWorkerActivityList())).toEqual({ ...initialState, workerActivityList: [], workerActivityCount: 0 });
  });

  it('should return a new state on worker ActionType.CLEAR_WORKER_OBSERVATION_LIST', () => {
    expect(reducer(undefined, actions.clearWorkerObservationList())).toEqual({ ...initialState, workerObservationList: [], workerObservationCount: 0 });
  });

  it('should return a new state on worker ActionType.UPDATE_WORKER_SUCCESS', () => {
    const worker = getWorker_1();
    expect(reducer(undefined, actions.updateWorkerSuccess(worker as any))).toEqual({ ...initialState, workerMap: { [worker.id]: worker } });
  });

  it('should return a new state on worker ActionType.FETCH_ETHNICITY_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchEthnicityListSuccess(list as any))).toEqual({ ...initialState, ethnicityList: list });
  });

  it('should return a new state on worker ActionType.FETCH_LANGUAGE_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchLanguageListSuccess(list as any))).toEqual({ ...initialState, languageList: list });
  });

  it('should return a new state on worker ActionType.FETCH_TRADE_STATUSES_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchTradeStatusesSuccess(list as any))).toEqual({ ...initialState, tradeStatusesList: list });
  });

  it('should return a new state on worker ActionType.FETCH_SKILLED_TRADE_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchSkilledTradeListSuccess(list as any))).toEqual({ ...initialState, skilledTradeList: list });
  });

  it('should return a new state on worker ActionType.FETCH_IDENTIFICATION_TYPE_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchIdentificationTypeListSuccess(list as any))).toEqual({ ...initialState, identificationTypeList: list });
  });

  it('should return a new state on worker ActionType.FETCH_WORKER_ACTIVITY_SUCCESS', () => {
    const list = [getWorkerActivity_1()];
    expect(reducer(undefined, actions.fetchWorkerActivitySuccess(list, 1))).toEqual({ ...initialState, workerActivityList: list, workerActivityCount: 1 });
  });

  it('should return a new state on worker ActionType.FETCH_WORKER_OBSERVATIONS_SUCCESS', () => {
    const list = [getWorkerObservation_1()];
    expect(reducer(undefined, actions.fetchWorkerObservationsSuccess(list, 1))).toEqual({
      ...initialState,
      workerObservationList: list,
      workerObservationCount: 1,
    });
  });

  it('should return a new state on worker ActionType.FETCH_WORKER_PROJECT_LIST_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchProjectListSuccess(list as any))).toEqual({ ...initialState, projectList: list });
  });

  it('should return a new state on worker ActionType.FETCH_WORKER_PROJECT_LIST_SUCCESS', () => {
    const observation = getWorkerObservation_1();
    expect(reducer(undefined, actions.fetchWorkerObservationSuccess(observation))).toEqual({ ...initialState, observation });
  });

  it('should return a new state on worker ActionType.FETCH_PROJECT_WORKER_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectWorkerListSuccess(getProject_1().id, [getWorker_1()], 1))).toEqual({
      ...initialState,
      workerProjectMap: { [getProject_1().id]: [getWorker_1()].reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
      count: 1,
    });
  });

  it('should return a new state on worker ActionType.FETCH_CLIENT_WORKER_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchClientWorkerListSuccess(getClient_1().id, [getWorker_1()], 1))).toEqual({
      ...initialState,
      workerClientMap: { [getClient_1().id]: { [getWorker_1().id]: getWorker_1() } },
      count: 1,
    });
  });

  it('should return a new state on worker ActionType.FETCH_CONSENT_FORM_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchConsentFormSuccess(getConsentForm_1()))).toEqual({ ...initialState, consentForm: getConsentForm_1() });
  });

  it('should return a new state on worker ActionType.CLEAR_CONSENT_FORM', () => {
    expect(reducer({ ...initialState, consentForm: getConsentForm_1() }, actions.clearConsentForm())).toEqual({ ...initialState, consentForm: null });
  });

  it('should return a new state on worker ActionType.FETCH_GEOGRAPHIC_LOCATIONS_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name', type: 1 }];
    expect(reducer(undefined, actions.fetchGeographicLocationsListSuccess(list as any))).toEqual({ ...initialState, geographicLocationsList: list });
  });

  it('should return a new state on worker ActionType.FETCH_JOB_TITLES_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchJobTitlesSuccess(list as any))).toEqual({ ...initialState, jobTitlesList: list });
  });

  it('should return a new state on worker ActionType.FETCH_SOC_JOB_TITLES_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchSocJobTitlesSuccess(list as any))).toEqual({ ...initialState, socJobTitlesList: list });
  });

  it('should return a new state on worker ActionType.FETCH_LANGUAGE_TURNER_PROTOCOLS_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchLanguageTurnerProtocolsSuccess(list as any))).toEqual({ ...initialState, languageTurnerProtocolsList: list });
  });
});
