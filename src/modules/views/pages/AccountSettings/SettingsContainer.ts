import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { userState } from '../../../state-mgmt/user';
import { generalState } from '../../../state-mgmt/general';
import { fileState } from '../../../state-mgmt/file';

import Settings from './Settings';
import { procoreState } from '../../../state-mgmt/procore';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  user: state.auth.session,
  accountData: state.user.accountData,
  fileMap: state.file.fileMap,
  saveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROFILE],
  changePasswordLoading: state.general.loadingMap[GENERAL.LOADING_KEY.CHANGE_PASSWORD],
  loadingMap: state.general.loadingMap,
  status: state.procore.status,
  countryList: state.general.countryList,
  saveProcoreLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROCORE],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePassword: (currentPassword: string, newPassword: string) => dispatch(userState.actions.changePasswordStart(currentPassword, newPassword)),
  updateProfile: (data: UserModel.IAccount) => dispatch(userState.actions.updateProfileStart(data)),
  updateProfilePhoto: () => dispatch(userState.actions.updateProfilePhotoStart()),
  getAccountData: () => dispatch(userState.actions.fetchProfileDataStart()),
  clearChangePasswordLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.CHANGE_PASSWORD)),
  clearFileUpload: () => dispatch(fileState.actions.clearMap()),
  getStatusProcore: () => dispatch(procoreState.actions.getStatusProcoreStart()),
  connectProcore: data => dispatch(procoreState.actions.connectProcoreStart(data)),
  disconnectProcore: () => dispatch(procoreState.actions.disconnectProcoreStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings as any);
