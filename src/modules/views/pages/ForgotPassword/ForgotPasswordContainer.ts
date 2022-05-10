import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '../../../state-mgmt/rootState';
import ForgotPassword from './ForgotPassword';
import { userState } from '../../../state-mgmt/user';
import { GENERAL } from '../../../../constants';
import { generalState } from '../../../state-mgmt/general';

export const mapStateToProps = (state: IRootState) => ({
  loadingStatus: state.general.loadingMap[GENERAL.LOADING_KEY.RESET_PASSWORD],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPassword: (email: string) => dispatch(userState.actions.resetPasswordStart(email)),
  clearLoading: (key: string) => dispatch(generalState.actions.clear(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
