import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getWorkerTraining_1 } from '../../../test/entities';

describe('training reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on project ActionType.FETCH_TRAINING_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchTrainingListSuccess(list as any))).toEqual({ ...initialState, trainingList: list });
  });

  it('should return a new state on client ActionType.FETCH_WORKER_TRAINING_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchWorkerTrainingListSuccess([getWorkerTraining_1()], 1))).toEqual({
      ...initialState,
      workerMap: { [getWorkerTraining_1().id]: getWorkerTraining_1() },
      count: 1,
    });
  });

  it('should return a new state on client ActionType.FETCH_WORKER_TRAINING_DETAIL_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchWorkerTrainingDetailSuccess(getWorkerTraining_1()))).toEqual({
      ...initialState,
      workerMap: { [getWorkerTraining_1().id]: getWorkerTraining_1() },
    });
  });

  it('should return a new state on client ActionType.CLEAR_WORKER_MAP', () => {
    expect(reducer({ ...initialState, workerMap: { [getWorkerTraining_1().id]: getWorkerTraining_1() } }, actions.clearWorkerMap())).toEqual({
      ...initialState,
      workerMap: {},
    });
  });
});
