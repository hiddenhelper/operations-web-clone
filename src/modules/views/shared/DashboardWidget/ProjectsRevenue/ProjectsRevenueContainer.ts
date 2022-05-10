import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../models';
import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../state-mgmt/statistics';

import ProjectsRevenue from './ProjectsRevenue';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  grossRevenueWidgetStatistics: state.statistics.grossRevenueWidgetStatistics,
  grossRevenueWidgetLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_GROSS_REVENUE_WIDGET_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchGrossRevenueWidget: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchGrossRevenueWidgetStatisticsStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsRevenue);
