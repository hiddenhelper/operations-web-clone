import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import ClientsByTrades from './ClientsByTrades';

export const mapStateToProps = (state: IRootState) => ({
  topTenStatisticsMap: state.statistics.topTenStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENTS_BY_TRADES],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClientsByTrades: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchClientsByTradesStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsByTrades);
