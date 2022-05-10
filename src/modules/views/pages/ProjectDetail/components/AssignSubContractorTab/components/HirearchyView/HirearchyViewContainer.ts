import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../../../../../constants';
import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { clientState } from '../../../../../../../state-mgmt/client';

import HirearchyView from './HirearchyView';

export const mapStateToProps = (state: IRootState) => ({
  hirearchyMap: state.client.clientProjectHirearchyMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_CLIENT_HIREARCHY_LIST],
  assignClientLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectClientHirearchyList: (id: string) => dispatch(clientState.actions.fetchProjectClientHirearchyListStart(id)),
  clearClientMap: () => dispatch(clientState.actions.clearClientMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HirearchyView);
