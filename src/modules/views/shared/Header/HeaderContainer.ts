import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { authState } from '../../../state-mgmt/auth';
import { push } from 'connected-react-router';
import Header from './Header';

export const mapStateToProps = (state: IRootState) => ({
  user: state.auth.session,
  userRole: state.auth.role,
  accountData: state.user.accountData,
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authState.actions.signOutStart()),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
