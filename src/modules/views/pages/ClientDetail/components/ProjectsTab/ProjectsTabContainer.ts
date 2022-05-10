import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ProjectsTab from './ProjectsTab';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { projectState } from '../../../../../state-mgmt/project';

export const mapStateToProps = (state: IRootState) => ({
  projectClientMap: state.project.projectClientMap,
  projectCount: state.project.count,
  projectMap: state.project.projectMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_PROJECT_LIST],
  loadingSummary: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectList: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchClientProjectListStart(id, query)),
  fetchProjectSummary: (id: string) => dispatch(projectState.actions.fetchProjectSummaryStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTab);
