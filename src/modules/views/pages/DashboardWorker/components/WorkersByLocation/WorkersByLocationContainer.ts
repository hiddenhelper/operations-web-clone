import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import WorkersByLocation from './WorkersByLocation';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_BY_LOCATION],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersByLocation: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchWorkersByLocationStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersByLocation);
