import { initialState, IState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }) => {
  switch (type) {
    case ActionType.FETCH_WORKER_CERTIFICATION_LIST_SUCCESS:
      return { ...state, workerMap: payload.list.reduce((total, item, index) => ({ ...total, [item.id]: { ...item, index } }), {}), count: payload.count };
    case ActionType.FETCH_WORKER_CERTIFICATION_DETAIL_SUCCESS:
      return { ...state, workerMap: { ...state.workerMap, [payload.certification.id]: { ...state[payload.certification.id], ...payload.certification } } };
    case ActionType.FETCH_CERTIFICATION_SUCCESS:
      return { ...state, certificationList: payload.list };
    case ActionType.CLEAR_WORKER_MAP:
      return { ...state, workerMap: {} };
    default:
      return state;
  }
};
