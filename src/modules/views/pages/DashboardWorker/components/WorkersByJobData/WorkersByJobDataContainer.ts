import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import WorkersByJobData from './WorkersByJobData';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_BY_JOB_DATA],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersByJobDataStart: (key: string, query: GeneralModel.IQueryParams, filter: GeneralModel.IJobFilter) =>
    dispatch(statisticsState.actions.fetchWorkersByJobDataStart(key, query, filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersByJobData);
