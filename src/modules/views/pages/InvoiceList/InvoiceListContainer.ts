import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../constants';
import { InvoiceModel, GeneralModel } from '../../../models';
import { IRootState } from '../../../state-mgmt/rootState';
import { invoiceState } from '../../../state-mgmt/invoice';
import { statisticsState } from '../../../state-mgmt/statistics';

import InvoiceList from './InvoiceList';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  invoiceMap: state.invoice.invoiceMap,
  invoiceStatistics: state.statistics.invoiceStatistics,
  saveInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_INVOICE],
  editInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.EDIT_INVOICE],
  fetchInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE],
  payInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.PAY_INVOICE],
  invoiceStatisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveInvoice: (invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep) => dispatch(invoiceState.actions.saveInvoiceStart(invoice, action)),
  editInvoice: (id: string, invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep) =>
    dispatch(invoiceState.actions.editInvoiceStart(id, invoice, action)),
  fetchInvoiceList: (query: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.fetchInvoiceListStart(query)),
  fetchInvoiceStatistics: () => dispatch(statisticsState.actions.fetchInvoiceStatisticsStart()),
  clearInvoiceMap: () => dispatch(invoiceState.actions.clearInvoiceMap()),
  clearInvoiceStatistics: () => dispatch(statisticsState.actions.clearInvoiceStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
