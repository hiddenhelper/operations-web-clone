import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GENERAL } from '../../../../../../../../constants';
import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { badgeState } from '../../../../../../../state-mgmt/badge';
import { generalState } from '../../../../../../../state-mgmt/general';

import VisitorBadgeModal from './VisitorBadgeModal';
import { BadgeModel } from '../../../../../../../models';

export const mapStateToProps = (state: IRootState) => ({
  badgeMap: state.badge.badgeMap,
  badgeLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_VISITOR],
  updateLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE],
  assignLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_PROJECT_BADGE_VISITOR],
  updateBadgeDataLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UPDATE_BADGE_DATA],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBadge: (id: string) => dispatch(badgeState.actions.fetchBadgeVisitorStart(id)),
  revokeBadge: (id: string, reason: string) => dispatch(badgeState.actions.revokeBadgeStart(id, reason)),
  printVisitorBadge: (badgeId: string) => dispatch(badgeState.actions.printVisitorBadgeStart(badgeId)),
  clearBadge: () => dispatch(badgeState.actions.clearBadge()),
  clearUpdateLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE)),
  updateBadge: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => dispatch(badgeState.actions.updateVisitorBadgeStart(id, badge)),
  clearUpdateBadgeLoading: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitorBadgeModal);
