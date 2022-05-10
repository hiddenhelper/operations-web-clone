import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import NewBadgesByLocation from './NewBadgesByLocation';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_LOCATION_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBadgeLocation: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchBadgeLocationStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBadgesByLocation);
