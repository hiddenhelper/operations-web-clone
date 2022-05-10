import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../models';
import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

import NewActiveProjects from './NewActiveProjects';

export const mapStateToProps = (state: IRootState) => ({
  locationWidget: state.statistics.locationStatistics,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_ACTIVE_LOCATIONS_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchActiveProjects: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchActiveProjectsStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewActiveProjects);
