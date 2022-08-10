import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import Sidebar from './Sidebar';

export const mapStateToProps = (state: IRootState) => ({
  location: state.router.location,
  currentUserPermissions: state.auth.session?.permissions,
});

export default connect(mapStateToProps, null)(Sidebar);
