import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '../../../state-mgmt/rootState';
import ResetPassword from './ResetPassword';
import { userState } from '../../../state-mgmt/user';
import { GENERAL } from '../../../../constants';
import { generalState } from '../../../state-mgmt/general';

export const mapStateToProps = (state: IRootState) => ({
  loadingStatus: state.general.loadingMap[GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  confirmResetPassword: (token: string, email: string, password: string) => dispatch(userState.actions.confirmResetPasswordStart(token, email, password)),
  clearLoading: (key: string) => dispatch(generalState.actions.clear(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
