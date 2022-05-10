import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ObservationsTab from './ObservationsTab';

import { GeneralModel } from '../../../../../models';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { projectState } from '../../../../../state-mgmt/project';
import { workerState } from '../../../../../state-mgmt/worker';
import { GENERAL } from '../../../../../../constants';

export const mapStateToProps = (state: IRootState) => ({
  workerObservationList: state.worker.workerObservationList,
  projectMap: state.project.projectWorkerMap,
  workerObservationCount: state.worker.workerObservationCount,
  observationDetail: state.worker.observation,
  detailLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_OBSERVATION],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkerObservations: (id: string, query: GeneralModel.IQueryParams) => dispatch(workerState.actions.fetchWorkerObservationListStart(id, query)),
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchWorkerProjectListStart(id, query)),
  fetchObservationDetail: (workerId: string, id: string) => dispatch(workerState.actions.fetchWorkerObservationStart(workerId, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObservationsTab);
