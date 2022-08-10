import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import PermissionGuard from './PermissionGuard';

export const mapStateToProps = (state: IRootState) => ({
  currentUserPermissions: state.auth.session?.permissions,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, null)(PermissionGuard);
