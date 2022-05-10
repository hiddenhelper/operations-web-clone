import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../models';
import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

import TopTenProjects from './TopTenProjects';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  projectTopTenWidget: state.statistics.projectTopTenStatistics,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECTS_TOP_TEN_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectTopTen: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchProjectTopTenStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopTenProjects);
