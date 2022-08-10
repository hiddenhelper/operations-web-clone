import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { clientState } from '../../../state-mgmt/client';
import { generalState } from '../../../state-mgmt/general';
import { userState } from '../../../state-mgmt/user';
import { GeneralModel, ClientModel } from '../../../models';

import ClientWizard from './ClientWizard';

export const mapStateToProps = (state: IRootState) => ({
  clientMap: state.client.clientMap,
  mwbeList: state.client.mwbeList,
  tradeList: state.client.tradeList,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_CLIENT],
  sendForApprovalLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SEND_APPROVE_CLIENT],
  approveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.APPROVE_CLIENT],
  countryList: state.general.countryList,
  groupList: state.user.groupList,
  currentUserRole: state.auth.role,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClient: (id: string) => dispatch(clientState.actions.fetchDraftClientStart(id)),
  fetchMwbe: () => dispatch(clientState.actions.fetchMWbeListStart()),
  fetchTradeList: () => dispatch(clientState.actions.fetchTradesStart()),
  saveClient: (client: ClientModel.IClient, step: GeneralModel.IStep) => dispatch(clientState.actions.saveClientStart(client, step)),
  updateClient: (client: ClientModel.IClient) => dispatch(clientState.actions.updateDraftClientStart(client)),
  sendClientForApproval: (id: string) => dispatch(clientState.actions.sendApproveClientStart(id)),
  approveClient: (id: string) => dispatch(clientState.actions.approveClientStart(id)),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_CLIENT)),
  clearClientMap: () => dispatch(clientState.actions.clearClientMap()),
  fetchGroupSearch: (query: any) => dispatch(userState.actions.fetchGroupSearchStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientWizard);
