import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import ClientsRevenue from './ClientsRevenue';

export const mapStateToProps = (state: IRootState) => ({
  grossRevenueWidgetStatistics: state.statistics.grossRevenueWidgetStatistics,
  grossRevenueWidgetLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_REVENUE_WIDGET_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClientRevenueWidget: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchClientRevenueWidgetStatisticsStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsRevenue);
