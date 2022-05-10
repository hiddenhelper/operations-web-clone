import { initialState, IState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }) => {
  switch (type) {
    case ActionType.FETCH_PAYMENT_METHODS_SUCCESS:
      return { ...state, paymentMethod: payload.paymentMethods };
    case ActionType.CREATE_PAYMENT_SUCCESS:
      return { ...state, paymentMethod: [...state.paymentMethod, payload.paymentMethod] };
    case ActionType.CLEAR_PAYMENT:
      return { ...state, paymentMethod: [], isPaymentMethodCreated: false };
    default:
      return state;
  }
};
