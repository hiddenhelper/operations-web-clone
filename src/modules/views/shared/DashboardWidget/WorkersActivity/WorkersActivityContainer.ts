import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../models';
import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

import WorkersActivity from './WorkersActivity';

export const mapStateToProps = (state: IRootState) => ({
  linePieStatisticsMap: state.statistics.linePieStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_WORKERS_ACTIVITY_WIDGET_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersActivity: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchProjectWorkersActivityStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersActivity);
