import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../../../../../constants';
import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { badgeState } from '../../../../../../../state-mgmt/badge';
import { clientState } from '../../../../../../../state-mgmt/client';

import { BadgeModel, GeneralModel } from '../../../../../../../models';
import AssignVisitorBadgeModal from './AssignVisitorBadgeModal';

export const mapStateToProps = (state: IRootState) => ({
  entityList: state.project.badgeVisitorEntityList,
  uiRelationMap: state.general.uiRelationMap,
  clientListLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCompanies: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(clientState.actions.searchClientStart(query, tempId)),
  assignBadgeVisitor: (id: string, badgeVisitor: BadgeModel.IBadgeVisitor) => dispatch(badgeState.actions.assignProjectBadgeVisitorStart(id, badgeVisitor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignVisitorBadgeModal);
