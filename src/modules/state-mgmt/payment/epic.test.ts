import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { IEpicDependencies } from '../rootState';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { coreState } from '../core';
import { generalState } from '../general';
import { fetchPaymentMethodsStart, createPaymentMethodStart, deletePaymentMethodsStart, replaceAndDeletePaymentMethodStart } from './epics';
import { actions } from './actions';
import { GENERAL } from '../../../constants';
import { getPaymentMethod_1 } from '../../../test/entities';
import { ToastType } from '../../models/general';

describe('payment epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = { response: new Error('scary error'), title: 'error title' };
    deps = getDeps();
  });

  describe('fetchPaymentMethodStart', () => {
    it('should get epic for payment fetch paymentMethod', () => {
      return runEpic(fetchPaymentMethodsStart(ActionsObservable.of(actions.fetchPaymentMethodsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS, true));
        expect(deps.apiService.getPaymentMethods).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchPaymentMethodsSuccess([getPaymentMethod_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getPaymentMethods = () => throwError(error);
      return runEpic(fetchPaymentMethodsStart(ActionsObservable.of(actions.fetchPaymentMethodsStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS, false, true, error.response));
      });
    });
  });

  describe('createPaymentMethodStart', () => {
    it('should get epic for payment create paymentMethod', () => {
      return runEpic(createPaymentMethodStart(ActionsObservable.of(actions.createPaymentStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT, true));
        expect(deps.apiService.createPayment).toHaveBeenCalledWith('id');
        expect(actionList[1]).toEqual(actions.createPaymentSuccess(getPaymentMethod_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.createPayment = () => throwError(error);
      return runEpic(createPaymentMethodStart(ActionsObservable.of(actions.createPaymentStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT, false, true, error.response));
      });
    });
  });

  describe('delete payment method', () => {
    it('should get epic for delete paymentMethod', () => {
      return runEpic(deletePaymentMethodsStart(ActionsObservable.of(actions.deletePaymentStart('cardId')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, true));
        expect(deps.apiService.deletePayment).toHaveBeenCalledWith('cardId');
        expect(actionList[2]).toEqual(actions.fetchPaymentMethodsStart());
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, false));
        expect(actionList[4]).toEqual(generalState.actions.addToastStart('Payment method deleted successfully!', ToastType.SUCCESS));
      });
    });

    it('should get epic for replace paymentMethod', () => {
      return runEpic(
        replaceAndDeletePaymentMethodStart(ActionsObservable.of(actions.replaceAndDeletePaymentStart('cardId', 'cardId2')), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.REPLACE_AND_DELETE_PAYMENT_METHOD, true));
          expect(deps.apiService.replacePayment).toHaveBeenCalledWith('cardId', 'cardId2');
          expect(actionList[2]).toEqual(actions.fetchPaymentMethodsStart());
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.REPLACE_AND_DELETE_PAYMENT_METHOD, false));
          expect(actionList[4]).toEqual(generalState.actions.addToastStart('Payment method replaced and deleted successfully!', ToastType.SUCCESS));
        }
      );
    });

    it('should catch errors while delete paymentMethods', () => {
      deps.apiService.deletePayment = () => throwError(error);
      return runEpic(deletePaymentMethodsStart(ActionsObservable.of(actions.deletePaymentStart('cardId')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, false, true, error.response));
      });
    });
  });
});
