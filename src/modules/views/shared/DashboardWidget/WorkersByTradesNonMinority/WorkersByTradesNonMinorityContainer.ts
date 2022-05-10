import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../models';
import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

import WorkersByTradesNonMinority from './WorkersByTradesNonMinority';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_BY_TRADES_NON_MINORITY],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersByTradesNonMinority: (key: string, query: GeneralModel.IQueryParams) =>
    dispatch(statisticsState.actions.fetchWorkersByTradesNonMinorityStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersByTradesNonMinority);
