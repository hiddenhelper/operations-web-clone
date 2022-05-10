import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import InvoicesTab from './InvoicesTab';

import { GeneralModel, InvoiceModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { clientState } from '../../../state-mgmt/client';
import { generalState } from '../../../state-mgmt/general';
import { invoiceState } from '../../../state-mgmt/invoice';
import { projectState } from '../../../state-mgmt/project';

export const mapStateToProps = (state: IRootState) => ({
  invoiceMap: state.invoice.invoiceMap,
  clientMap: state.client.clientProjectMap,
  projectMap: state.project.projectClientMap,
  count: state.invoice.count,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE_LIST],
  saveInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_INVOICE],
  editInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.EDIT_INVOICE],
  confirmInvoiceLoading: state.general.loadingMap[GENERAL.LOADING_KEY.CONFIRM_INVOICE],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectInvoiceList: (projectId: string, query: GeneralModel.IQueryParams) =>
    dispatch(invoiceState.actions.fetchInvoiceListStart({ ...query, projectId })),
  fetchClientInvoiceList: (clientId: string, query: GeneralModel.IQueryParams) => dispatch(invoiceState.actions.fetchInvoiceListStart({ ...query, clientId })),
  fetchProjectClientList: (id: string, query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchProjectClientListStart(id, query)),
  fetchClientProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchClientProjectListStart(id, query)),
  saveInvoice: (invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep, queryParams?: GeneralModel.IQueryParams) =>
    dispatch(invoiceState.actions.saveInvoiceStart(invoice, action, queryParams)),
  clearLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_INVOICE)),
  clearConfirmLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.CONFIRM_INVOICE)),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesTab);
