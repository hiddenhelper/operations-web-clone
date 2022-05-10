import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { clientState } from '../../../state-mgmt/client';
import { generalState } from '../../../state-mgmt/general';
import { invoiceState } from '../../../state-mgmt/invoice';
import { projectState } from '../../../state-mgmt/project';

import { GeneralModel } from '../../../models';
import InvoiceForm from './InvoiceForm';

export const mapStateToProps = (state: IRootState) => ({
  uiRelationMap: state.general.uiRelationMap,
  serviceList: state.invoice.serviceList,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCompanies: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(clientState.actions.searchClientStart(query, tempId)),
  searchProjects: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(projectState.actions.searchProjectStart(query, tempId)),
  fetchServices: () => dispatch(invoiceState.actions.fetchServiceTypeListStart()),
  clearRelationMap: () => dispatch(generalState.actions.clearRelationMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
