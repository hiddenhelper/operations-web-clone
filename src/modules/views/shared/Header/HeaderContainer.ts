import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { authState } from '../../../state-mgmt/auth';
import { clientState } from '../../../state-mgmt/client';
import { push } from 'connected-react-router';
import Header from './Header';

export const mapStateToProps = (state: IRootState) => ({
  user: state.auth.session,
  accountData: state.user.accountData,
  companyId: state.auth.currentCompanyId,
  selfCompany: state.client.selfCompany,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
  currentUserPermissions: state.auth.session?.permissions,
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authState.actions.signOutStart()),
  navigate: (path: string) => dispatch(push(path)),
  fetchSelfClient: () => dispatch(clientState.actions.fetchSelfClientStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
