import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { authState } from '../../../state-mgmt/auth';
import { GENERAL } from '../../../../constants';
import Login from './Login';

export const mapStateToProps = (state: IRootState) => ({
  loadingStatus: state.general.loadingMap[GENERAL.LOADING_KEY.AUTH_LOGIN],
});

export const mapDispatchToProps = dispatch => ({
  login: (username: string, password: string) => dispatch(authState.actions.signInStart(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
