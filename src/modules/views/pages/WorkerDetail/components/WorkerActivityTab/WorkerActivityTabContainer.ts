import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import WorkerActivityTab from './WorkerActivityTab';

import { GeneralModel } from '../../../../../models';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { projectState } from '../../../../../state-mgmt/project';
import { workerState } from '../../../../../state-mgmt/worker';

export const mapStateToProps = (state: IRootState) => ({
  workerActivityList: state.worker.workerActivityList,
  projectMap: state.project.projectWorkerMap,
  workerActivityCount: state.worker.workerActivityCount,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkerActivity: (id: string, query: GeneralModel.IQueryParams) => dispatch(workerState.actions.fetchWorkerActivityStart(id, query)),
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchWorkerProjectListStart(id, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerActivityTab);
