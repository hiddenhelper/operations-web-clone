import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { statisticsState } from '../../../state-mgmt/statistics';

import Dashboard from './Dashboard';

export const mapStateToProps = (state: IRootState) => ({
  newBadges: state.statistics.newBadges,
  grossRevenue: state.statistics.grossRevenue,
  workersActivity: state.statistics.workersActivity,
  newBadgesLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_NEW_BADGES],
  grossRevenueLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE],
  workersActivityLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_STATISTICS],
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
  currentUserPermissions: state.auth.session?.permissions,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchNewBadges: () => dispatch(statisticsState.actions.fetchNewBadgesStart()),
  fetchWorkersActivity: () => dispatch(statisticsState.actions.fetchWorkersActivityStart()),
  fetchGrossRevenue: () => dispatch(statisticsState.actions.fetchGrossRevenueStart()),
  clearStatistics: () => dispatch(statisticsState.actions.clearStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
