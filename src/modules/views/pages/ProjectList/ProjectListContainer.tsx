import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { GeneralModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { projectState } from '../../../state-mgmt/project';
import { statisticsState } from '../../../state-mgmt/statistics';

import ProjectList from './ProjectList';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  isFcaUser: state.auth.isFcaUser,
  projectMap: state.project.projectMap,
  projectCount: state.project.count,
  projectStatistics: state.statistics.projectStatistics,
  invoiceStatistics: state.statistics.invoiceStatistics,
  listLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_LIST],
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_SUMMARY],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_PROJECT],
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_STATISTICS],
  currentFilter: state.project.currentFilter,
  currentUserPermissions: state.auth.session?.permissions,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectList: (query: GeneralModel.IQueryParams) => dispatch(projectState.actions.fetchProjectListStart(query)),
  fetchProjectSummary: (id: string) => dispatch(projectState.actions.fetchProjectSummaryStart(id)),
  fetchProjectStatistics: () => dispatch(statisticsState.actions.fetchProjectStatisticsStart()),
  fetchInvoiceStatistics: () => dispatch(statisticsState.actions.fetchInvoiceStatisticsStart()),
  clearProjectMap: () => dispatch(projectState.actions.clearProjectMap()),
  clearProjectStatistics: () => dispatch(statisticsState.actions.clearProjectStatistics()),
  clearInvoiceStatistics: () => dispatch(statisticsState.actions.clearInvoiceStatistics()),
  deleteProject: (id: string, query: GeneralModel.IQueryParams) => dispatch(projectState.actions.deleteProjectStart(id, query)),
  navigate: (path: string) => dispatch(push(path)),
  updateCurrentFilter: (filter: string) => dispatch(projectState.actions.updateCurrentFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
