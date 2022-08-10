import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GeneralModel } from '../../../../../../models';
import { GENERAL } from '../../../../../../../constants';
import { IRootState } from '../../../../../../state-mgmt/rootState';
import { badgeState } from '../../../../../../state-mgmt/badge';

import BadgeHistoryTab from './BadgeHistoryTab';

export const mapStateToProps = (state: IRootState) => ({
  historyList: state.badge.historyList,
  count: state.badge.count,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE_HISTORY],
  currentUserPermissions: state.auth.session?.permissions,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBadgeHistory: (id: string, query: GeneralModel.IQueryParams) => dispatch(badgeState.actions.fetchBadgeHistoryStart(id, query)),
  clearBadgeHistory: () => dispatch(badgeState.actions.clearBadgeHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgeHistoryTab);
