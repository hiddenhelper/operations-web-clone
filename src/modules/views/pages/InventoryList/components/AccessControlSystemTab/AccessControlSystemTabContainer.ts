import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { GENERAL } from '../../../../../../constants';
import { GeneralModel } from '../../../../../models';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { accessControlSystemState } from '../../../../../state-mgmt/access-control-system';
import AccessControlSystemTab from './AccessControlSystemTab';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  accessControlSystemMap: state.accessControlSystem.accessControlSystemMap,
  deviceCount: state.accessControlSystem.count,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST],
  summaryLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
  fetchAccessControlSystemList: (query: GeneralModel.IQueryParams) => dispatch(accessControlSystemState.actions.fetchAccessControlSystemListStart(query)),
  fetchAccessControlSystemSummary: (id: string) => dispatch(accessControlSystemState.actions.fetchAccessControlSystemSummaryStart(id)),
  deleteAccessControlSystem: (id: string, query: GeneralModel.IQueryParams) =>
    dispatch(accessControlSystemState.actions.deleteAccessControlSystemStart(id, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccessControlSystemTab);
