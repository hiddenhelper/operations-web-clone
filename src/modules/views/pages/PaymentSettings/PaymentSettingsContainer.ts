import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import Settings from './PaymentSettings';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
});

export default connect(mapStateToProps)(Settings);
