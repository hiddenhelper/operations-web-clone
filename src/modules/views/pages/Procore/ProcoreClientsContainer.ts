import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProcoreClients from './ProcoreClients';
import { IRootState } from '../../../state-mgmt/rootState';
import { GENERAL } from '../../../../constants';
import { procoreState } from '../../../state-mgmt/procore';

export const mapStateToProps = (state: IRootState) => ({
  clients: state.procore.clients,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROCORE_CLIENTS],
  userRole: state.auth.role,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProcoreClients: () => dispatch(procoreState.actions.getProcoreClientsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcoreClients);
