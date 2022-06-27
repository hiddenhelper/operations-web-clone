import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { badgeState } from '../../../../../state-mgmt/badge';
import { projectState } from '../../../../../state-mgmt/project';
import { generalState } from '../../../../../state-mgmt/general';

import { BadgeModel, GeneralModel } from '../../../../../models';
import VisitorTab from './VisitorsTab';

export const mapStateToProps = (state: IRootState) => ({
  visitorMap: state.badge.badgeVisitorMap,
  visitorCount: state.badge.count,
  projectBadgeVisitorLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR_LIST],
  saveBadgeVisitorLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR],
  updateLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR],
  updateBadgeDataLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE_DATA],
  badgeVisitorEntityLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE_VISITOR_ENTITY_LIST],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveBadgeVisitor: (id: string, number: number) => dispatch(badgeState.actions.createBadgeVisitorStart(id, number)),
  unassignBadgeVisitor: (id: string, badgeVisitor: BadgeModel.IBadgeVisitor) => dispatch(badgeState.actions.unassignProjectBadgeVisitorStart(id, badgeVisitor)),
  clearProjectMap: () => dispatch(badgeState.actions.clearBadge()),
  fetchProjectBadgeVisitorList: (id: string, query: GeneralModel.IQueryParams) => dispatch(badgeState.actions.fetchProjectBadgeVisitorListStart(id, query)),
  fetchBadgeVisitorEntityList: (id: string) => dispatch(projectState.actions.fetchBadgeVisitorEntityListStart(id)),
  clearSaveBadgeLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitorTab);
