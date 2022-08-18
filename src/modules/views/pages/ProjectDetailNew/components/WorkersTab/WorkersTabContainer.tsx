import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '../../../../../state-mgmt/rootState';

import { GeneralModel, WorkerModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { workerState } from '../../../../../state-mgmt/worker';
import { projectState } from '../../../../../state-mgmt/project';
import { clientState } from '../../../../../state-mgmt/client';

import WorkersTab from './WorkersTab';

export const mapStateToProps = (state: IRootState) => ({
  workerMap: state.worker.workerMap,
  workerProjectMap: state.worker.workerProjectMap,
  clientMap: state.client.clientProjectMap,
  workerCount: state.worker.count,
  modalMap: state.general.modalMap,
  modalCount: state.general.modalCount,
  projectWorkersLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_WORKER_LIST],
  loadWorkerModalLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_LIST],
  assignLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_WORKER_PROJECT],
  summaryLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER],
  countryList: state.general.countryList,
  isFcaUser: state.auth.isFcaUser,
  assignWorkerProjectError: state.general.loadingMap?.assignWorkerProject,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectWorkerList: (id: string, query: GeneralModel.IQueryParams) => dispatch(workerState.actions.fetchProjectWorkerListStart(id, query)),
  fetchWorkerList: (query: GeneralModel.IQueryParams) => dispatch(workerState.actions.fetchWorkerProjectAssignListStart(query)),
  fetchWorkerSummary: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  assignWorker: (projectId: string, list: Partial<WorkerModel.IWorker>[]) => dispatch(projectState.actions.assignWorkerProjectStart(projectId, list)),
  fetchProjectClientList: (id: string, query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchProjectClientListStart(id, query)),
  clearWorkerMap: () => dispatch(workerState.actions.clearWorkerMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersTab);
