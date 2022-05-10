import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import NewBadgesByProject from './NewBadgesByProject';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECTS_BAGE_PROJECT_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBadgeProject: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchBadgeProjectStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBadgesByProject);
