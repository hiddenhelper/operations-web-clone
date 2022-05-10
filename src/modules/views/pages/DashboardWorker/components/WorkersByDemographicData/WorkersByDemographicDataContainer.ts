import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import WorkersByDemographicData from './WorkersByDemographicData';

export const mapStateToProps = (state: IRootState) => ({
  pieStatisticsMap: state.statistics.pieStatisticsMap,
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_BY_DEMOGRAPHIC_DATA],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersByDemographicData: (key: string, query: GeneralModel.IQueryParams, filter: GeneralModel.IDemographicFilter) =>
    dispatch(statisticsState.actions.fetchWorkersByDemographicDataStart(key, query, filter)),
  fetchWorkersByEthnicity: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchWorkersByEthnicityStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersByDemographicData);
