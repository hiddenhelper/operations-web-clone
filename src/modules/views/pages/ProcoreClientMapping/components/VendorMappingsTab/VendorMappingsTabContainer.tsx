import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GENERAL } from '../../../../../../constants';
import { procoreState } from '../../../../../state-mgmt/procore';
import { IRootState } from '../../../../../state-mgmt/rootState';
import VendorMappingsTab from './VendorMappingsTab';

export const mapStateToProps = (state: IRootState) => ({
  procoreVendors: state.procore.procoreVendors,
  procoreVendorMappings: state.procore.procoreVendorMappings,
  procoreVendorsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROCORE_VENDORS],
  procoreVendorMappingsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROCORE_VENDOR_MAPPINGS],
  procoreVendorMappingsSaving: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROCORE_VENDOR_MAPPINGS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProcoreVendors: (clientId: string) => dispatch(procoreState.actions.fetchProcoreVendorsStart(clientId)),
  fetchProcoreVendorMappings: (clientId: string) => dispatch(procoreState.actions.fetchProcoreVendorMappingsStart(clientId)),
  saveProcoreVendorMappings: (clientId: string, mappings: any[]) => dispatch(procoreState.actions.saveProcoreVendorMappingsStart(clientId, mappings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorMappingsTab);
