import { PaymentModel } from '../../models';

export enum ActionType {
  FETCH_PAYMENT_METHODS_START = '[payment] fetch payment methods start',
  FETCH_PAYMENT_METHODS_SUCCESS = '[payment] fetch payment methods success',
  CREATE_PAYMENT_START = '[payment] create payment start',
  CREATE_PAYMENT_SUCCESS = '[payment] create payment success',
  CLEAR_PAYMENT = '[payment] clear payment',
  DELETE_PAYMENT_METHOD_START = '[payment] delete payment',
  DELETE_PAYMENT_METHOD_SUCCESS = '[payment] delete payment method success',
  REPLACE_AND_DELETE_PAYMENT_METHOD_START = '[payment] replace and delete payment method',
}

export const actions = {
  fetchPaymentMethodsStart: () => ({ type: ActionType.FETCH_PAYMENT_METHODS_START, payload: {} }),
  fetchPaymentMethodsSuccess: (paymentMethods: PaymentModel.IPaymentMethod[]) => ({
    type: ActionType.FETCH_PAYMENT_METHODS_SUCCESS,
    payload: { paymentMethods },
  }),
  createPaymentStart: (id: string) => ({ type: ActionType.CREATE_PAYMENT_START, payload: { id } }),
  createPaymentSuccess: (paymentMethod: PaymentModel.IPaymentMethod) => ({ type: ActionType.CREATE_PAYMENT_SUCCESS, payload: { paymentMethod } }),
  clearPayment: () => ({ type: ActionType.CLEAR_PAYMENT, payload: {} }),
  deletePaymentStart: (id: string) => ({ type: ActionType.DELETE_PAYMENT_METHOD_START, payload: { id } }),
  deletePaymentSuccess: (id: string) => ({ type: ActionType.DELETE_PAYMENT_METHOD_SUCCESS, payload: { id } }),
  replaceAndDeletePaymentStart: (toDeleteId: string, toReplaceWithId: string) => ({
    type: ActionType.REPLACE_AND_DELETE_PAYMENT_METHOD_START,
    payload: { toDeleteId, toReplaceWithId },
  }),
};
