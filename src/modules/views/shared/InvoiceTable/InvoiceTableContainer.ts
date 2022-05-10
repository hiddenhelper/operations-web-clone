import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import InvoiceTable from './InvoiceTable';

import { InvoiceModel, GeneralModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { invoiceState } from '../../../state-mgmt/invoice';

export const mapStateToProps = (state: IRootState) => ({
  invoiceMap: state.invoice.invoiceMap,
  invoiceCount: state.invoice.count,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE_LIST],
  invoiceDetailLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_INVOICE],
  markAsPaidLoading: state.general.loadingMap[GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE],
  payLoading: state.general.loadingMap[GENERAL.LOADING_KEY.PAY_INVOICE],
  voidLoading: state.general.loadingMap[GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE],
  confirmInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.CONFIRM_INVOICE],
  userRole: state.auth.role,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInvoice: (id: string) => dispatch(invoiceState.actions.fetchInvoiceStart(id)),
  saveInvoice: (invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep) => dispatch(invoiceState.actions.saveInvoiceStart(invoice, action)),
  editInvoice: (id: string, invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep) =>
    dispatch(invoiceState.actions.editInvoiceStart(id, invoice, action)),
  payInvoice: (id: string, params: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.payInvoiceStart(id, params)),
  deleteInvoice: (id: string, params: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.deleteInvoiceStart(id, params)),
  markAsPaidInvoice: (id: string, params: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.markAsPaidInvoiceStart(id, params)),
  markAsVoidInvoice: (id: string, params: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.markAsVoidInvoiceStart(id, params)),
  confirmInvoice: (id: string, params: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.confirmInvoiceStart(id, params)),
  fetchInvoiceSummary: (id: string) => dispatch(invoiceState.actions.fetchInvoiceSummaryStart(id)),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTable);
