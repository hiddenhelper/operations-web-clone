import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { IRootState } from '../../../state-mgmt/rootState';
import { userState } from '../../../state-mgmt/user';
import { GENERAL } from '../../../../constants';

import Register from './Register';

export const mapStateToProps = (state: IRootState) => ({
  loadingCreateStatus: state.general.loadingMap[GENERAL.LOADING_KEY.AUTH_SIGN_UP],
  loadingTokenStatus: state.general.loadingMap[GENERAL.LOADING_KEY.VALIDATE_TOKEN],
  email: state.user.email,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  validateToken: (token: string) => dispatch(userState.actions.validateTokenStart(token)),
  createAccount: (token: string, password: string) => dispatch(userState.actions.signUpStart(token, password)),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
