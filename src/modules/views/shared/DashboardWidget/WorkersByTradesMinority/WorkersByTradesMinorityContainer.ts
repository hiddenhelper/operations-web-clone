import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../models';
import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

import WorkersByTradesMinority from './WorkersByTradesMinority';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_MINORITY],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersByTradesMinority: (key: string, query: GeneralModel.IQueryParams) =>
    dispatch(statisticsState.actions.fetchWorkersByTradesMinorityStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersByTradesMinority);
