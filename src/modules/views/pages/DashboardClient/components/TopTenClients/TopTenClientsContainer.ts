import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import TopTenClients from './TopTenClients';

export const mapStateToProps = (state: IRootState) => ({
  clientTopTenWidget: state.statistics.clientTopTenStatistics,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENTS_TOP_TEN_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClientTopTen: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchClientTopTenStart(query)),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopTenClients);
