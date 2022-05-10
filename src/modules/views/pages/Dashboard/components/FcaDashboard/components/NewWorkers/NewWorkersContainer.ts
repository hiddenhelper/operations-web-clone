import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../../../models';
import { GENERAL } from '../../../../../../../../constants';
import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../../../state-mgmt/statistics';

import NewWorkers from './NewWorkers';

export const mapStateToProps = (state: IRootState) => ({
  linePieStatisticsMap: state.statistics.linePieStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_ACTIVITY_WIDGET_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersActivityWidget: (key: string, query: GeneralModel.IQueryParams) =>
    dispatch(statisticsState.actions.fetchWorkersActivityWidgetStatisticsStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkers);
