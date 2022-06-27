import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GeneralModel, ProjectModel } from '../../../../../../../models';
import { GENERAL } from '../../../../../../../../constants';
import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { clientState } from '../../../../../../../state-mgmt/client';

import ListView from './ListView';

export const mapStateToProps = (state: IRootState) => ({
  clientMap: state.client.clientProjectMap,
  clientCount: state.client.count,
  userRole: state.auth.role,
  mwbeList: state.client.mwbeList,
  clientLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_LIST],
  assignClientLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT],
  projectClientSummaryLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_SUMMARY],
  taxConditionLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROJECT_CLIENT_TAX_CONDITION],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectClientList: (id: string, query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchProjectClientListStart(id, query)),
  fetchProjectClientSummary: (projectId: string, clientId: string) => dispatch(clientState.actions.fetchProjectClientSummaryStart(projectId, clientId)),
  updateTaxCondition: (projectId: string, taxCondition: ProjectModel.IClientTaxCondition) =>
    dispatch(clientState.actions.updateProjectClientTaxConditionStart(projectId, taxCondition)),
  fetchMwbe: () => dispatch(clientState.actions.fetchMWbeListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
