import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IRootState } from '../../../state-mgmt/rootState';
import { generalState } from '../../../state-mgmt/general';
import { AccessControlSystemModel } from '../../../models';
import { accessControlSystemState } from '../../../state-mgmt/access-control-system';
import AccessControlSystemWizard from './AccessControlSystemWizard';
import { GENERAL } from '../../../../constants';

export const mapStateToProps = (state: IRootState) => ({
  accessControlSystemMap: state.accessControlSystem.accessControlSystemMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveAccessControlSystem: (accessControlSystem: AccessControlSystemModel.IAccessControlSystem) =>
    dispatch(accessControlSystemState.actions.saveAccessControlSystemStart(accessControlSystem)),
  updateAccessControlSystem: (accessControlSystem: AccessControlSystemModel.IAccessControlSystem) =>
    dispatch(accessControlSystemState.actions.updateAccessControlSystemStart(accessControlSystem)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM)),
  fetchAccessControlSystem: (id: string) => dispatch(accessControlSystemState.actions.fetchAccessControlSystemSummaryStart(id)),
  clearAccessControlSystemMap: () => dispatch(accessControlSystemState.actions.clearAccessControlSystemMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccessControlSystemWizard);
