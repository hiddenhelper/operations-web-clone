import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { authState } from '../../../state-mgmt/auth';
import ProtectedRoute from './ProtectedRoute';
import { clientState } from 'modules/state-mgmt/client';
import { userState } from 'modules/state-mgmt/user';

export const mapStateToProps = (state: IRootState) => ({
  authenticated: state.auth.authenticated,
  sessionChecked: state.auth.sessionChecked,
  currentUserPermissions: state.auth.session?.permissions,
  clientMap: state.client.clientMap,
  companyId: state.auth.currentCompanyId,
  companyUserId: state.auth.companyUserId,
});

export const mapDispatchToProps = dispatch => ({
  recoverSession: () => dispatch(authState.actions.recoverSessionStart()),
  fetchClient: (id: string) => dispatch(clientState.actions.fetchClientStart(id)),
  getAccountData: () => dispatch(userState.actions.fetchProfileDataStart()),
  fetchAdminPermission: (id: string) => dispatch(clientState.actions.fetchAdminPermissionStart(id)),
  fetchUserPermissions: (id: string) => dispatch(authState.actions.fetchUserPermissionsStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
