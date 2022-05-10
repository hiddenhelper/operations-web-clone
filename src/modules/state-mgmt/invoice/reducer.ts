import { initialState, IState } from './state';
import { ActionType } from './actions';
import { deleteObjectItem } from '../../../utils/generalUtils';
import { InvoiceModel } from '../../models';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }) => {
  switch (type) {
    case ActionType.FETCH_INVOICE_LIST_SUCCESS:
      return { ...state, invoiceMap: payload.list.reduce((total, item, index) => ({ ...total, [item.id]: { ...item, index } }), {}), count: payload.count };
    case ActionType.FETCH_SERVICE_TYPE_LIST_SUCCESS:
      return { ...state, serviceList: payload.list.filter(item => item.name !== 'Convenience Fee') };
    case ActionType.FETCH_INVOICE_SUCCESS:
    case ActionType.FETCH_INVOICE_SUMMARY_SUCCESS:
      return {
        ...state,
        invoiceMap: {
          ...state.invoiceMap,
          [payload.invoice.id]: { ...state.invoiceMap[payload.invoice.id], ...payload.invoice },
        },
      };
    case ActionType.DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoiceMap: deleteObjectItem(state.invoiceMap, payload.id),
      };
    case ActionType.PAY_INVOICE_SUCCESS:
    case ActionType.MARK_AS_PAID_INVOICE_SUCCESS:
      return {
        ...state,
        invoiceMap: {
          ...state.invoiceMap,
          [payload.id]: {
            ...state.invoiceMap[payload.id],
            status: InvoiceModel.InvoiceStatus.PAID,
          },
        },
      };
    case ActionType.CLEAR_INVOICE_MAP:
      return { ...state, invoiceMap: {} };
    default:
      return state;
  }
};
