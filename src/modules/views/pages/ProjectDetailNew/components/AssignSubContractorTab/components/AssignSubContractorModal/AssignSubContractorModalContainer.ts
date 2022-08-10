import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GeneralModel, ProjectModel } from '../../../../../../../models';
import { GENERAL } from '../../../../../../../../constants';
import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { clientState } from '../../../../../../../state-mgmt/client';
import { projectState } from '../../../../../../../state-mgmt/project';
import { generalState } from '../../../../../../../state-mgmt/general';

import AssignSubContractorModal from './AssignSubContractorModal';

export const mapStateToProps = (state: IRootState) => ({
  userCompanyId: state.auth.currentCompanyId,
  userRole: state.auth.role,
  subContractorMap: state.general.modalMap,
  count: state.general.modalCount,
  uiRelationMap: state.general.uiRelationMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT_SUBCONTRACTOR_LIST],
  assignLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_CLIENT_PROJECT],
  isFcaUser: state.auth.isFcaUser,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSubContractorList: (query: GeneralModel.IQueryParams) => dispatch(clientState.actions.fetchSubcontractorListStart(query)),
  assignSubcontractor: (id: string, list: ProjectModel.IAssignClientProject[], sponsorId: string) =>
    dispatch(projectState.actions.assignClientProjectStart(id, list, sponsorId)),
  searchCompanies: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(clientState.actions.searchClientStart(query, tempId)),
  clearRelationMap: () => dispatch(generalState.actions.clearRelationMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignSubContractorModal);
