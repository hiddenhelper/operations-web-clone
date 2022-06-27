import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import UsersTab from './UsersTab';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { userState } from '../../../../../state-mgmt/user';
import { clientState } from '../../../../../state-mgmt/client';

export const mapStateToProps = (state: IRootState) => ({
  userMap: state.user.userProjectMap,
  clientMap: state.client.clientProjectMap,
  userCount: state.user.count,
  userLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST],
  assignUserLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_USER_PROJECT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserList: (id: string, query: GeneralModel.IQueryParams) => dispatch(userState.actions.fetchProjectUserListStart(id, query)),
  fetchProjectClientList: (id: string, query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchProjectClientListStart(id, query)),
  clearUserMap: () => dispatch(userState.actions.clearUserMap()),
  fetchUserProfile: (companyId: string, companyUserId: string) => dispatch(userState.actions.fetchUserProfileStart(companyId, companyUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
