import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { GeneralModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { clientState } from '../../../state-mgmt/client';
import { statisticsState } from '../../../state-mgmt/statistics';

import ClientList from './ClientList';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  clientMap: state.client.clientMap,
  clientCount: state.client.count,
  mwbeList: state.client.mwbeList,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_LIST],
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_SUMMARY],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_CLIENT],
  clientStatistics: state.statistics.clientStatistics,
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMwbe: () => dispatch(clientState.actions.fetchMWbeListStart()),
  fetchClientSummary: (id: string) => dispatch(clientState.actions.fetchClientSummaryStart(id)),
  fetchClientList: (query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchClientListStart(query)),
  clearClientMap: () => dispatch(clientState.actions.clearClientMap()),
  deleteClient: (id: string, query: GeneralModel.IQueryParams) => dispatch(clientState.actions.deleteClientStart(id, query)),
  fetchClientStatistics: () => dispatch(statisticsState.actions.fetchClientStatisticsStart()),
  clearClientStatistics: () => dispatch(statisticsState.actions.clearClientStatistics()),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
