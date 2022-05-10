import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import WorkersTab from './WorkersTab';

import { GENERAL } from '../../../../../../constants';
import { GeneralModel } from '../../../../../models';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { workerState } from '../../../../../state-mgmt/worker';
import { projectState } from '../../../../../state-mgmt/project';
import { generalState } from '../../../../../state-mgmt/general';

export const mapStateToProps = (state: IRootState) => ({
  workerClientMap: state.worker.workerClientMap,
  workerCount: state.worker.count,
  workerMap: state.worker.workerMap,
  uiRelationMap: state.general.uiRelationMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_WORKER_LIST],
  loadingSummary: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkerList: (id: string, query: GeneralModel.IQueryParams) => dispatch(workerState.actions.fetchClientWorkerListStart(id, query)),
  fetchWorkerSummary: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  searchProjectStart: (query: GeneralModel.IQueryParams, key: string) => dispatch(projectState.actions.searchProjectStart(query, key)),
  clearWorkerMap: () => dispatch(workerState.actions.clearWorkerMap()),
  clearRelationMap: () => dispatch(generalState.actions.clearRelationMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersTab);
