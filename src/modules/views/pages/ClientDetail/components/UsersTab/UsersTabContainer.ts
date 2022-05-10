import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import UsersTab from './UsersTab';

import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { userState } from '../../../../../state-mgmt/user';

export const mapStateToProps = (state: IRootState) => ({
  userMap: state.user.userClientMap,
  userCount: state.user.count,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserList: (id: string, pageNumber: number, pageSize: number) => dispatch(userState.actions.fetchClientUserListStart(id, pageNumber, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
