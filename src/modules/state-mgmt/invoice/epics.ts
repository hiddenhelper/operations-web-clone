import { Epic, ofType } from 'redux-observable';
import { IAction, IEpicDependencies, IRootState } from '../rootState';
import { actions, ActionType } from './actions';
import { map, mergeMap, tap } from 'rxjs/operators';
import { concat, of, EMPTY } from 'rxjs';
import { generalState } from '../general';
import { statisticsState } from '../statistics';
import { GENERAL, LANG } from '../../../constants';
import { GeneralModel, InvoiceModel } from '../../models';
import { handleError, handleToastError } from '../core/operators';
import { getConditionalDefaultValue, getQueryParamsFromString } from '../../../utils/generalUtils';

export const fetchInvoiceListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_INVOICE_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST, true)),
        deps.apiService.getInvoiceList(payload.query).pipe(map(res => actions.fetchInvoiceListSuccess(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST))
    )
  );

export const fetchServiceTypeListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_SERVICE_TYPE_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST, true)),
        deps.apiService.getServiceTypeList().pipe(map(res => actions.fetchServiceTypeListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST))
    )
  );

export const saveInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, true)),
        deps.apiService
          .saveInvoice(payload.invoice)
          .pipe(
            mergeMap(res =>
              [
                payload.action === InvoiceModel.InvoiceStep.CONFIRM ? actions.confirmInvoiceStart(res.id, payload.queryParams, false) : undefined,
                payload.action !== InvoiceModel.InvoiceStep.CONFIRM
                  ? actions.fetchInvoiceListStart(
                      getConditionalDefaultValue(!!payload.queryParams, payload.queryParams, getQueryParamsFromString(deps.history.location.search)) ||
                        InvoiceModel.defaultInvoiceSearch
                    )
                  : undefined,
                payload.action !== InvoiceModel.InvoiceStep.CONFIRM ? statisticsState.actions.fetchInvoiceStatisticsStart() : undefined,
                payload.action !== InvoiceModel.InvoiceStep.CONFIRM ? actions.saveInvoiceSuccess() : undefined,
              ].filter(Boolean)
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, false)),
        of(generalState.actions.addToastStart('Invoice created successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.SAVE_INVOICE))
    )
  );

export const editInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.EDIT_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, true)),
        deps.apiService
          .editInvoice(payload.id, payload.invoice)
          .pipe(
            mergeMap(res =>
              [
                payload.action === InvoiceModel.InvoiceStep.CONFIRM ? actions.confirmInvoiceStart(res.id, payload.queryParams, false) : undefined,
                payload.action !== InvoiceModel.InvoiceStep.CONFIRM
                  ? actions.fetchInvoiceListStart(getQueryParamsFromString(deps.history.location.search) || InvoiceModel.defaultInvoiceSearch)
                  : undefined,
                payload.action !== InvoiceModel.InvoiceStep.CONFIRM ? statisticsState.actions.fetchInvoiceStatisticsStart() : undefined,
                actions.editInvoiceSuccess(),
              ].filter(Boolean)
            )
          ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, false)),
        of(generalState.actions.addToastStart('Invoice updated successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.EDIT_INVOICE))
    )
  );

export const fetchInvoiceSummaryStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_INVOICE_SUMMARY_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY, true)),
        deps.apiService.getInvoiceSummary(payload.id).pipe(map(res => actions.fetchInvoiceSummarySuccess({ ...res, id: payload.id }))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY))
    )
  );

export const fetchInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE, true)),
        deps.apiService.getInvoice(payload.id).pipe(map(res => actions.fetchInvoiceSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_INVOICE))
    )
  );

export const deleteInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DELETE_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_INVOICE, true)),
        deps.apiService.deleteInvoice(payload.id).pipe(map(res => actions.deleteInvoiceSuccess(payload.id))),
        of(
          actions.fetchInvoiceListStart(
            getConditionalDefaultValue(!!payload.queryParams, payload.queryParams, getQueryParamsFromString(InvoiceModel.defaultInvoiceSearch))
          )
        ),
        of(statisticsState.actions.fetchInvoiceStatisticsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_INVOICE, false)),
        of(generalState.actions.addToastStart('Invoice deleted successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.DELETE_INVOICE))
    )
  );

export const markInvoiceAsPaidStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.MARK_AS_PAID_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE, true)),
        deps.apiService.markInvoiceAsPaid(payload.id).pipe(map(res => actions.markAsPaidInvoiceSuccess(payload.id))),
        of(
          actions.fetchInvoiceListStart(
            getConditionalDefaultValue(!!payload.queryParams, payload.queryParams, getQueryParamsFromString(InvoiceModel.defaultInvoiceSearch))
          )
        ),
        of(statisticsState.actions.fetchInvoiceStatisticsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE, false)),
        of(generalState.actions.addToastStart('Invoice marked as paid successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE))
    )
  );

export const payInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.PAY_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.PAY_INVOICE, true)),
        deps.apiService.payInvoice(payload.id).pipe(map(() => actions.payInvoiceSuccess(payload.id))),
        of(
          actions.fetchInvoiceListStart(
            getConditionalDefaultValue(!!payload.queryParams, payload.queryParams, getQueryParamsFromString(deps.history.location.search)) ||
              InvoiceModel.defaultInvoiceSearch
          )
        ),
        of(statisticsState.actions.fetchInvoiceStatisticsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.PAY_INVOICE, false)),
        of(generalState.actions.addToastStart('Invoice paid successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(
        handleToastError(GENERAL.LOADING_KEY.PAY_INVOICE, ['PAYMENT_METHOD_NOT_ASSIGNED', 'PAYMENT_FAILED'], undefined, {
          PAYMENT_FAILED: LANG.EN.ERRORS.STRIPE.PAYMENT_FAILED,
        })
      )
    )
  );

export const confirmInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.CONFIRM_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, true)),
        deps.apiService.confirmInvoice(payload.id).pipe(map(() => actions.confirmInvoiceSuccess())),
        of(
          actions.fetchInvoiceListStart(
            getConditionalDefaultValue(!!payload.queryParams, payload.queryParams, getQueryParamsFromString(deps.history.location.search)) ||
              InvoiceModel.defaultInvoiceSearch
          )
        ),
        of(statisticsState.actions.fetchInvoiceStatisticsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, false)),
        payload.showConfirmation ? of(generalState.actions.addToastStart('Invoice confirmed successfully!', GeneralModel.ToastType.SUCCESS)) : EMPTY
      ).pipe(handleToastError(GENERAL.LOADING_KEY.CONFIRM_INVOICE))
    )
  );

export const markInvoiceAsVoidStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.MARK_AS_VOID_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE, true)),
        deps.apiService.markInvoiceAsVoid(payload.id).pipe(map(res => actions.markAsVoidInvoiceSuccess(payload.id))),
        of(
          actions.fetchInvoiceListStart(
            getConditionalDefaultValue(!!payload.queryParams, payload.queryParams, getQueryParamsFromString(InvoiceModel.defaultInvoiceSearch))
          )
        ),
        of(statisticsState.actions.fetchInvoiceStatisticsStart()),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE, false)),
        of(generalState.actions.addToastStart('Invoice voided successfully!', GeneralModel.ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE))
    )
  );

export const downloadInvoiceStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.DOWNLOAD_INVOICE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE, true)),
        deps.apiService.downloadInvoice(payload.id).pipe(
          tap(res => deps.fileService.download(`${payload.name}.pdf`, res.newFile)),
          mergeMap(() => EMPTY)
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE))
    )
  );

export const epics = [
  fetchInvoiceListStart,
  fetchServiceTypeListStart,
  saveInvoiceStart,
  fetchInvoiceSummaryStart,
  deleteInvoiceStart,
  markInvoiceAsPaidStart,
  fetchInvoiceStart,
  editInvoiceStart,
  payInvoiceStart,
  confirmInvoiceStart,
  markInvoiceAsVoidStart,
  downloadInvoiceStart,
];
