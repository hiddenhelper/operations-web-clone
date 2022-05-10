import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import Sidebar from './Sidebar';

export const mapStateToProps = (state: IRootState) => ({
  location: state.router.location,
  userRole: state.auth.role,
});

export default connect(mapStateToProps, null)(Sidebar);
