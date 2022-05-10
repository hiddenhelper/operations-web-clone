import { Epic, ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';

import { GENERAL, LANG } from '../../../constants';
import { generalState } from '../general';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { handleError, handleToastError } from '../core/operators';
import { ToastType } from '../../models/general';
import { GeneralModel } from '../../models';

export const fetchPaymentMethodsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PAYMENT_METHODS_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS, true)),
        deps.apiService.getPaymentMethods().pipe(map(res => actions.fetchPaymentMethodsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS))
    )
  );

export const createPaymentMethodStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.CREATE_PAYMENT_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT, true)),
        deps.apiService.createPayment(payload.id).pipe(map(res => actions.createPaymentSuccess(res))),
        of(
          generalState.actions.setLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT, false),
          generalState.actions.addToastStart('Payment method saved successfully!', ToastType.SUCCESS)
        )
      ).pipe(handleToastError(GENERAL.LOADING_KEY.CREATE_PAYMENT))
    )
  );

export const deletePaymentMethodsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_PAYMENT_METHOD_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, true)),
        deps.apiService.deletePayment(payload.id).pipe(map(res => actions.deletePaymentSuccess(payload.id))),
        of(actions.fetchPaymentMethodsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, false)),
        of(generalState.actions.addToastStart('Payment method deleted successfully!', ToastType.SUCCESS))
      ).pipe(
        handleError(GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD, error =>
          [
            error.response.errorCode !== LANG.EN.ERROR_CODES.PAYMENT_METHOD_ASSIGNED_TO_PROJECTS &&
              generalState.actions.addToastStart(error.response.title, GeneralModel.ToastType.ERROR),
          ].filter(Boolean)
        )
      )
    )
  );

export const replaceAndDeletePaymentMethodStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.REPLACE_AND_DELETE_PAYMENT_METHOD_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.REPLACE_AND_DELETE_PAYMENT_METHOD, true)),
        deps.apiService.replacePayment(payload.toDeleteId, payload.toReplaceWithId).pipe(map(res => actions.deletePaymentSuccess(payload.id))),
        of(actions.fetchPaymentMethodsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.REPLACE_AND_DELETE_PAYMENT_METHOD, false)),
        of(generalState.actions.addToastStart('Payment method replaced and deleted successfully!', ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.REPLACE_AND_DELETE_PAYMENT_METHOD))
    )
  );

export const epics = [fetchPaymentMethodsStart, createPaymentMethodStart, deletePaymentMethodsStart, replaceAndDeletePaymentMethodStart];
