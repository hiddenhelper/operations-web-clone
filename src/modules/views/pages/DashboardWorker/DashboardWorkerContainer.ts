import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { statisticsState } from '../../../state-mgmt/statistics';

import DashboardWorker from './DashboardWorker';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearStatistics: () => dispatch(statisticsState.actions.clearStatistics()),
});

export default connect(null, mapDispatchToProps)(DashboardWorker);
