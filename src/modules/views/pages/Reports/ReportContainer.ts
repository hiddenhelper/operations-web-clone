import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '../../../state-mgmt/rootState';
import Report from './Report';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
