import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getPaymentMethod_1 } from '../../../test/entities';

describe('payment reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on project ActionType.FETCH_PAYMENT_METHODS_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchPaymentMethodsSuccess([getPaymentMethod_1()]))).toEqual({ ...initialState, paymentMethod: [getPaymentMethod_1()] });
  });

  it('should return a new state on project ActionType.CREATE_PAYMENT_SUCCESS', () => {
    expect(reducer(undefined, actions.createPaymentSuccess(getPaymentMethod_1()))).toEqual({
      ...initialState,
      paymentMethod: [getPaymentMethod_1()],
    });
  });

  it('should return a new state on project ActionType.CLEAR_PAYMENT', () => {
    expect(reducer(undefined, actions.clearPayment())).toEqual({ ...initialState, paymentMethod: [], isPaymentMethodCreated: false });
  });
});
