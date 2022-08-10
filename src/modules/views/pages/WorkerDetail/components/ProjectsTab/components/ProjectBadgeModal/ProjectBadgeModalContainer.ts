import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ProjectBadgeModal from './ProjectBadgeModal';

import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { badgeState } from '../../../../../../../state-mgmt/badge';
import { GENERAL } from '../../../../../../../../constants';
import { generalState } from '../../../../../../../state-mgmt/general';
import { BadgeModel } from '../../../../../../../models';

export const mapStateToProps = (state: IRootState) => ({
  badgeMap: state.badge.badgeMap,
  badgeLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE],
  updateLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE],
  updateBadgeDataLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE_DATA],
  printLoading: state.general.loadingMap[GENERAL.LOADING_KEY.PRINT_WORKER_BADGE],
  currentUserRole: state.auth.role,
  currentUserPermissions: state.auth.session?.permissions,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBadge: (id: string) => dispatch(badgeState.actions.fetchBadgeStart(id)),
  activateBadge: (id: string, tagId: string) => dispatch(badgeState.actions.activateBadgeStart(id, tagId)),
  deactivateBadge: (id: string, reason: string) => dispatch(badgeState.actions.deactivateBadgeStart(id, reason)),
  revokeBadge: (id: string, reason: string) => dispatch(badgeState.actions.revokeBadgeStart(id, reason)),
  updateBadge: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => dispatch(badgeState.actions.updateProjectBadgeStart(id, badge)),
  clearBadge: () => dispatch(badgeState.actions.clearBadge()),
  clearUpdateLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE)),
  clearUpdateBadgeLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA)),
  printWorkerBadge: (badgeId: string) => dispatch(badgeState.actions.printWorkerBadgeStart(badgeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBadgeModal);
