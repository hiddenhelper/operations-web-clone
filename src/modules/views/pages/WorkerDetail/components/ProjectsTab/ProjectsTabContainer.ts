import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ProjectsTab from './ProjectsTab';

import { GeneralModel } from '../../../../../models';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { GENERAL } from '../../../../../../constants';
import { projectState } from '../../../../../state-mgmt/project';

export const mapStateToProps = (state: IRootState) => ({
  projectMap: state.project.projectWorkerMap,
  count: state.project.count,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER_PROJECT],
  updateLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE],
  updateBadgeDataLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE_DATA],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchWorkerProjectListStart(id, query)),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTab);
