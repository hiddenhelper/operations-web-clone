import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AccessControlSystemTab from './AccessControlSystemTab';

import { AccessControlSystemModel, GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { projectState } from '../../../../../state-mgmt/project';
import { accessControlSystemState } from '../../../../../state-mgmt/access-control-system';
import { generalState } from '../../../../../state-mgmt/general';

export const mapStateToProps = (state: IRootState) => ({
  projectAccessControlSystem: state.accessControlSystem.projectAccessControlSystem,
  accessControlSystemMap: state.accessControlSystem.accessControlSystemMap,
  accessControlSystemCount: state.accessControlSystem.count,
  modalMap: state.general.modalMap,
  modalCount: state.general.modalCount,
  assignAccessControlSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT],
  accessControlSystemSummaryLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY],
  assignLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT],
  loadAccessControlSystemModalLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_ACCESS_CONTROL_SYSTEM_LIST],
  unassignAccessControlSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT],
  accessControlSystemProjectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST],
  accessControlSystemAssignProjectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM],
  updateProjectAccessControlSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT],
  accessControlSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  assignAccessControlSystem: (projectId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) =>
    dispatch(projectState.actions.assignAcsProjectStart(projectId, acs)),
  fetchProjectAccessControlSystem: (projectId: string, acsId: string) =>
    dispatch(accessControlSystemState.actions.fetchProjectAccessControlSystemStart(projectId, acsId)),
  fetchAccessControlSystemList: (query: GeneralModel.IQueryParams) =>
    dispatch(accessControlSystemState.actions.fetchAccessControlSystemProjectListStart(query)),
  fetchProjectAccessControlSystemList: (id: string, query: GeneralModel.IQueryParams) =>
    dispatch(accessControlSystemState.actions.fetchProjectAccessControlSystemListStart(id, query)),
  fetchAccessControlSystemSummary: (acsId: string) => dispatch(accessControlSystemState.actions.fetchAccessControlSystemSummaryStart(acsId)),
  unAssignAccessControlSystem: (projectId: string, acsId: string) => dispatch(projectState.actions.unAssignAccessControlSystemStart(projectId, acsId)),
  updateAccessControlSystem: (projectId: string, acsId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) =>
    dispatch(accessControlSystemState.actions.updateProjectAccessControlSystemStart(projectId, acsId, acs)),
  clearLoading: (key: string) => dispatch(generalState.actions.clear(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccessControlSystemTab);
