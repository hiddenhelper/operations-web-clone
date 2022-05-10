import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import WorkerDetail from './WorkerDetail';

import { GENERAL } from '../../../../constants';
import { workerState } from '../../../state-mgmt/worker';
import { generalState } from '../../../state-mgmt/general';
import { IRootState } from '../../../state-mgmt/rootState';

export const mapStateToProps = (state: IRootState) => ({
  workerMap: state.worker.workerMap,
  userRole: state.auth.role,
  workerLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
  fetchWorker: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  clearWorkerMap: () => dispatch(workerState.actions.clearWorkerMap()),
  clearLoadingMap: () => dispatch(generalState.actions.clearLoadingMap()),
  clearWorkerActivityList: () => dispatch(workerState.actions.clearWorkerActivityList()),
  clearWorkerObservationList: () => dispatch(workerState.actions.clearWorkerObservationList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerDetail);
