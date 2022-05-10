import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getWorkerCertification_1 } from '../../../test/entities';

describe('certification reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on project ActionType.FETCH_CERTIFICATION_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchCertificationListSuccess(list as any))).toEqual({ ...initialState, certificationList: list });
  });

  it('should return a new state on client ActionType.FETCH_WORKER_CERTIFICATION_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchWorkerCertificationListSuccess([getWorkerCertification_1()], 1))).toEqual({
      ...initialState,
      workerMap: { [getWorkerCertification_1().id]: getWorkerCertification_1() },
      count: 1,
    });
  });

  it('should return a new state on client ActionType.FETCH_WORKER_CERTIFICATION_DETAIL_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchWorkerCertificationDetailSuccess(getWorkerCertification_1()))).toEqual({
      ...initialState,
      workerMap: { [getWorkerCertification_1().id]: getWorkerCertification_1() },
    });
  });

  it('should return a new state on client ActionType.CLEAR_WORKER_MAP', () => {
    expect(reducer({ ...initialState, workerMap: { [getWorkerCertification_1().id]: getWorkerCertification_1() } }, actions.clearWorkerMap())).toEqual({
      ...initialState,
      workerMap: {},
    });
  });
});
