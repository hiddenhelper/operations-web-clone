import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { invoiceState } from '../../../state-mgmt/invoice';

import { GENERAL } from '../../../../constants';
import InvoiceInformation from './InvoiceInformation';

export const mapStateToProps = (state: IRootState) => ({
  invoiceMap: state.invoice.invoiceMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE],
  downloadLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DOWNLOAD_INVOICE],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInvoiceInformation: (id: string) => dispatch(invoiceState.actions.fetchInvoiceStart(id)),
  downloadInvoice: (id: string, name: string) => dispatch(invoiceState.actions.downloadStart(id, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceInformation);
