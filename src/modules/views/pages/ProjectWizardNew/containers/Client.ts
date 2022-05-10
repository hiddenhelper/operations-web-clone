import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../../constants';
import { IRootState } from '../../../../state-mgmt/rootState';
import { generalState } from '../../../../state-mgmt/general';
import { clientState } from '../../../../state-mgmt/client';
import { GeneralModel, ClientModel } from '../../../../models';
import Client from '../components/Client';

export const mapStateToProps = (state: IRootState) => ({
  clientMap: state.client.clientMap,
  reviewMode: state.projectNew.reviewMode,
  mwbeList: state.client.mwbeList,
  searchLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT],
  uiRelationMap: state.general.uiRelationMap,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMwbeList: () => dispatch(clientState.actions.fetchMWbeListStart()),
  setRelationUiId: (key: string, value: any) => dispatch(generalState.actions.setRelationUiId(key, value)),
  searchCompanies: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(clientState.actions.searchClientStart(query, tempId)),
  createCompany: (client: ClientModel.IClient, step: GeneralModel.IStep, tempId: string) =>
    dispatch(clientState.actions.saveClientStart(client, step, false, tempId)),
  clearClientErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_CLIENT)),
  clearRelationMap: () => dispatch(generalState.actions.clearRelationMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
