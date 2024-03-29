import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { userState } from '../../../../../state-mgmt/user';
import { projectState } from '../../../../../state-mgmt/project';
import { clientState } from '../../../../../state-mgmt/client';
import { generalState } from '../../../../../state-mgmt/general';
import { UserModel, ProjectModel, GeneralModel } from '../../../../../models';

import AssignUser from './AssignUser';

export const mapStateToProps = (state: IRootState) => ({
  userCompanyId: state.auth.currentCompanyId,
  currentUserRole: state.auth.role,
  userRoleList: state.user.roleList,
  userMap: state.general.modalMap,
  clientMap: state.client.clientMap,
  clientProjectMap: state.client.clientProjectMap,
  count: state.general.modalCount,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST],
  assignLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT],
  saveUserLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_USER],
  updateUserLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_USER],
  fetchUserloading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_USER_PROFILE],
  groupList: state.user.groupList,
  companyUserProfile: state.user.companyUserProfile,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserProjectList: (query: GeneralModel.IQueryParams) => dispatch(userState.actions.fetchUserProjectListStart(query)),
  fetchUserRoleList: () => dispatch(userState.actions.fetchRoleListStart()),
  fetchClientList: (id: string) => dispatch(clientState.actions.fetchUserClientListStart(id, {} as any)),
  assignUser: (id: string, list: ProjectModel.IProjectAssignUser[]) => dispatch(projectState.actions.assignUserProjectStart(id, list)),
  fetchProjectClientList: (id: string, query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchProjectClientListStart(id, query)),
  fetchGroupSearch: (query: any) => dispatch(userState.actions.fetchGroupSearchStart(query)),
  saveUser: (companyId, user: UserModel.IUser) => dispatch(userState.actions.saveUserStart(companyId, user)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_USER)),
  updateUserProfile: (companyId: string, companyUserId: string, user: UserModel.IAccount) =>
    dispatch(userState.actions.updateUserProfileStart(companyId, companyUserId, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignUser);
