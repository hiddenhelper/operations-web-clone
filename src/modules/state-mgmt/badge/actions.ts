import { BadgeModel, GeneralModel } from '../../models';

export enum ActionType {
  FETCH_BADGE_START = '[badge] fetch badge start',
  FETCH_BADGE_SUCCESS = '[badge] fetch badge success',
  APPROVE_BADGE_START = '[badge] approve badge start',
  REVOKE_BADGE_START = '[badge] revoke badge start',
  DEACTIVATE_BADGE_START = '[badge] deactivate badge start',
  UPDATE_BADGE_SUCCESS = '[badge] update badge success',
  UPDATE_VISITOR_BADGE_SUCCESS = '[badge] update visitor badge success',
  CLEAR_MAP = '[badge] clear badge map',
  FETCH_PROJECT_BADGE_VISITOR_LIST_START = '[badge] fetch project badge visitor list start',
  FETCH_PROJECT_BADGE_VISITOR_LIST_SUCCESS = '[badge] fetch project badge visitor list success',
  FETCH_BADGE_VISITOR_START = '[badge] fetch badge visitor start',
  SAVE_PROJECT_BADGE_VISITOR_START = '[badge] save project badge visitor start',
  SAVE_PROJECT_BADGE_VISITOR_SUCCESS = '[badge] save project badge visitor success',
  ASSIGN_PROJECT_BADGE_VISITOR_START = '[badge] assign project badge visitor start',
  UNASSIGN_PROJECT_BADGE_VISITOR_START = '[badge] unassign project badge visitor start',
  UPDATE_PROJECT_BADGE_START = '[badge] update project badge start',
  UPDATE_VISITOR_BADGE_START = '[badge] update visitor badge start',
  UPDATE_PROJECT_BADGE_SUCCESS = '[badge] update project badge success',
  PRINT_WORKER_BADGE_START = '[badge] print worker badge start',
  PRINT_VISITOR_BADGE_START = '[badge] print visitor badge start',
  FETCH_BADGE_HISTORY_START = '[badge] fetch badge history start',
  FETCH_BADGE_HISTORY_SUCCESS = '[badge] fetch badge history success',
  CLEAR_BADGE_HISTORY = '[badge] clear badge history',
}

export const actions = {
  fetchBadgeStart: (id: string) => ({ type: ActionType.FETCH_BADGE_START, payload: { id } }),
  fetchBadgeSuccess: (badge: BadgeModel.IBadge) => ({ type: ActionType.FETCH_BADGE_SUCCESS, payload: { badge } }),
  updateBadgeSuccess: (id: string, status: BadgeModel.BadgeStatus) => ({ type: ActionType.UPDATE_BADGE_SUCCESS, payload: { id, status } }),
  activateBadgeStart: (id: string, tagId: string) => ({ type: ActionType.APPROVE_BADGE_START, payload: { id, status: BadgeModel.BadgeStatus.ACTIVE, tagId } }),
  revokeBadgeStart: (id: string, reason: string) => ({ type: ActionType.REVOKE_BADGE_START, payload: { id, status: BadgeModel.BadgeStatus.REVOKED, reason } }),
  deactivateBadgeStart: (id: string, reason: string) => ({
    type: ActionType.DEACTIVATE_BADGE_START,
    payload: { id, status: BadgeModel.BadgeStatus.DEACTIVATE, reason },
  }),
  clearBadge: () => ({ type: ActionType.CLEAR_MAP, payload: {} }),
  fetchProjectBadgeVisitorListStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECT_BADGE_VISITOR_LIST_START,
    payload: { id, query },
  }),
  fetchProjectBadgeVisitorListSuccess: (projectId: string, list: BadgeModel.IBadgeVisitor[], count: number) => ({
    type: ActionType.FETCH_PROJECT_BADGE_VISITOR_LIST_SUCCESS,
    payload: { projectId, list, count },
  }),
  fetchBadgeVisitorStart: (id: string) => ({
    type: ActionType.FETCH_BADGE_VISITOR_START,
    payload: { id },
  }),
  createBadgeVisitorStart: (id: string, number: number) => ({
    type: ActionType.SAVE_PROJECT_BADGE_VISITOR_START,
    payload: { id, number },
  }),
  createBadgeSuccess: () => ({
    type: ActionType.SAVE_PROJECT_BADGE_VISITOR_SUCCESS,
    payload: {},
  }),
  assignProjectBadgeVisitorStart: (id: string, badgeVisitor: BadgeModel.IBadgeVisitor) => ({
    type: ActionType.ASSIGN_PROJECT_BADGE_VISITOR_START,
    payload: { id, badgeVisitor },
  }),
  unassignProjectBadgeVisitorStart: (id: string, badgeVisitor: BadgeModel.IBadgeVisitor) => ({
    type: ActionType.UNASSIGN_PROJECT_BADGE_VISITOR_START,
    payload: { id, badgeVisitor },
  }),
  updateProjectBadgeStart: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => ({
    type: ActionType.UPDATE_PROJECT_BADGE_START,
    payload: { id, badge },
  }),
  updateVisitorBadgeStart: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => ({
    type: ActionType.UPDATE_VISITOR_BADGE_START,
    payload: { id, badge },
  }),
  updateProjectBadgeSuccess: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => ({
    type: ActionType.UPDATE_PROJECT_BADGE_SUCCESS,
    payload: { id, badge },
  }),
  printWorkerBadgeStart: (badgeId: string) => ({ type: ActionType.PRINT_WORKER_BADGE_START, payload: { badgeId } }),
  printVisitorBadgeStart: (badgeId: string) => ({ type: ActionType.PRINT_VISITOR_BADGE_START, payload: { badgeId } }),
  fetchBadgeHistoryStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_BADGE_HISTORY_START,
    payload: { id, query },
  }),
  fetchBadgeHistorySuccess: (list: BadgeModel.IBadgeHistory[], count: number) => ({ type: ActionType.FETCH_BADGE_HISTORY_SUCCESS, payload: { list, count } }),
  clearBadgeHistory: () => ({ type: ActionType.CLEAR_BADGE_HISTORY, payload: {} }),
};
