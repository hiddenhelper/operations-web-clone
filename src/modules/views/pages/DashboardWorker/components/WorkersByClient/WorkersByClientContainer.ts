import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import WorkersByClient from './WorkersByClient';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_BY_CLIENT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersByClient: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchWorkersByClientStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersByClient);
