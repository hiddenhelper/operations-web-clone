import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GENERAL } from '../../../../../../constants';
import { procoreState } from '../../../../../state-mgmt/procore';
import { IRootState } from '../../../../../state-mgmt/rootState';

import ProjectMappingsTab from './ProjectMappingsTab';

export const mapStateToProps = (state: IRootState) => ({
  procoreProjectsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECTS],
  procoreProjectMappingsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROCORE_PROJECT_MAPPINGS],
  procoreProjectMappingsSaving: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROCORE_PROJECT_MAPPINGS],
  procoreProjects: state.procore.procoreProjects,
  procoreProjectMappings: state.procore.procoreProjectMappings,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProcoreProjects: (clientId: string) => dispatch(procoreState.actions.fetchProcoreProjectsStart(clientId)),
  fetchProcoreProjectMappings: (clientId: string) => dispatch(procoreState.actions.fetchProcoreProjectMappingsStart(clientId)),
  saveProcoreProjectMappings: (clientId: string, mappings: any[]) => dispatch(procoreState.actions.saveProcoreProjectMappingsStart(clientId, mappings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMappingsTab);
