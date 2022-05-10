import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import RoleGuard from './RoleGuard';

export const mapStateToProps = (state: IRootState) => ({
  currentUserRole: state.auth.role,
});

export default connect(mapStateToProps, null)(RoleGuard);
