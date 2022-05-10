import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { authState } from '../../../state-mgmt/auth';
import GuestHeader from './GuestHeader';
import { clientState } from 'modules/state-mgmt/client';

export const mapStateToProps = (state: IRootState) => ({
  client: state.client.clientMap,
  user: state.auth.session,
  clientMap: state.client.clientMap,
  companyId: state.auth.companyId,
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authState.actions.signOutStart()),
  fetchClient: (id: string) => dispatch(clientState.actions.fetchClientStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestHeader);
