import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getInvoice_1 } from '../../../test/entities';
import { InvoiceModel } from '../../models';

describe('invoice reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on project ActionType.FETCH_INVOICE_LIST_SUCCESS', () => {
    const list = [getInvoice_1()];
    expect(reducer(undefined, actions.fetchInvoiceListSuccess(list as any, 1))).toEqual({
      ...initialState,
      invoiceMap: { [getInvoice_1().id]: { ...getInvoice_1(), index: 0 } },
      count: 1,
    });
  });

  it('should return a new state on project ActionType.FETCH_SERVICE_TYPE_LIST_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchServiceTypeListSuccess(list as any))).toEqual({ ...initialState, serviceList: list });
  });

  it('should return a new state on project ActionType.CLEAR_INVOICE_MAP', () => {
    expect(reducer(undefined, actions.clearInvoiceMap())).toEqual({ ...initialState, invoiceMap: {} });
  });

  it('should return a new state on project ActionType.FETCH_INVOICE_SUMMARY_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchInvoiceSummarySuccess(getInvoice_1()))).toEqual({
      ...initialState,
      invoiceMap: { [getInvoice_1().id]: getInvoice_1() },
    });
  });

  it('should return a new state on project ActionType.FETCH_INVOICE_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchInvoiceSuccess(getInvoice_1()))).toEqual({
      ...initialState,
      invoiceMap: { [getInvoice_1().id]: getInvoice_1() },
    });
  });

  it('should return a new state on project ActionType.DELETE_INVOICE_SUCCESS', () => {
    expect(reducer(undefined, actions.deleteInvoiceSuccess(getInvoice_1().id))).toEqual({
      ...initialState,
      invoiceMap: {},
    });
  });

  it('should return a new state on project ActionType.MARK_AS_PAID_INVOICE_SUCCESS', () => {
    expect(reducer(undefined, actions.markAsPaidInvoiceSuccess(getInvoice_1().id))).toEqual({
      ...initialState,
      invoiceMap: {
        [getInvoice_1().id]: { status: InvoiceModel.InvoiceStatus.PAID },
      },
    });
  });

  it('should return a new state on project ActionType.PAY_INVOICE_SUCCESS', () => {
    expect(reducer(undefined, actions.payInvoiceSuccess(getInvoice_1().id))).toEqual({
      ...initialState,
      invoiceMap: {
        [getInvoice_1().id]: { status: InvoiceModel.InvoiceStatus.PAID },
      },
    });
  });
});
