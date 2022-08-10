import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ClientModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { clientState } from '../../../state-mgmt/client';
import { generalState } from '../../../state-mgmt/general';

import ClientDetail from './ClientDetail';
import { statisticsState } from '../../../state-mgmt/statistics';

export const mapStateToProps = (state: IRootState) => ({
  clientMap: state.client.clientMap,
  mwbeList: state.client.mwbeList,
  tradeList: state.client.tradeList,
  clientStatistics: state.statistics.clientDetailStatistics,
  updateClientLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_CLIENT],
  clientLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT],
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_DETAIL_STATISTICS],
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClient: (id: string) => dispatch(clientState.actions.fetchClientStart(id)),
  clearClientMap: () => dispatch(clientState.actions.clearClientMap()),
  fetchMwbe: () => dispatch(clientState.actions.fetchMWbeListStart()),
  fetchTradeList: () => dispatch(clientState.actions.fetchTradesStart()),
  saveClient: (client: ClientModel.IClient) => dispatch(clientState.actions.updateClientStart(client)),
  archiveClient: (id: string) => dispatch(clientState.actions.archiveClientStart(id)),
  unarchiveClient: (id: string) => dispatch(clientState.actions.unarchiveClientStart(id)),
  fetchClientStatistics: (id: string) => dispatch(statisticsState.actions.fetchClientDetailStatisticsStart(id)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_CLIENT)),
  clearLoadingMap: () => dispatch(generalState.actions.clearLoadingMap()),
  clearClientStatistics: () => dispatch(statisticsState.actions.clearClientDetailStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
