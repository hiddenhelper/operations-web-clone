import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import Trainings from './Trainings';

export const mapStateToProps = (state: IRootState) => ({
  pieStatisticsMap: state.statistics.pieStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKERS_TRAININGS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkersTrainings: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchWorkersTrainingsStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trainings);
