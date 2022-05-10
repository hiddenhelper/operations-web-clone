import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { GeneralModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { workerState } from '../../../state-mgmt/worker';
import { statisticsState } from '../../../state-mgmt/statistics';
import { clientState } from '../../../state-mgmt/client';

import WorkerList from './WorkerList';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  workerMap: state.worker.workerMap,
  workersCount: state.worker.count,
  workerStatistics: state.statistics.workerStatistics,
  uiRelationMap: state.general.uiRelationMap,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_LIST],
  clientSearchLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT],
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_STATISTICS],
  workerLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkerList: (query: GeneralModel.IQueryParams) => dispatch(workerState.actions.fetchWorkerListStart(query)),
  fetchWorkerStatistics: () => dispatch(statisticsState.actions.fetchWorkerStatisticsStart()),
  fetchWorkerSummary: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  clearWorkerMap: () => dispatch(workerState.actions.clearWorkerMap()),
  clearWorkerStatistics: () => dispatch(statisticsState.actions.clearWorkerStatistics()),
  searchCompanies: (query: GeneralModel.IQueryParams) => dispatch(clientState.actions.searchClientStart(query, 'clientWorker')),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerList);
