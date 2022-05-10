import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getBadgeHistory_1, getBadge_1, getProject_1, getVisitorProject_1 } from '../../../test/entities';
import { BadgeModel } from '../../models';

describe('badge reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on badge ActionType.FETCH_BADGE_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchBadgeSuccess(getBadge_1()))).toEqual({ ...initialState, badgeMap: { [getBadge_1().id]: getBadge_1() } });
  });

  it('should return a new state on auth ActionType.CLEAR_MAP', () => {
    expect(reducer({ badgeMap: { [getBadge_1().id]: getBadge_1() }, badgeVisitorMap: {}, count: 1, historyList: [] }, actions.clearBadge())).toEqual({
      ...initialState,
      badgeMap: {},
      badgeVisitorMap: {},
      count: null,
      historyList: [],
    });
  });

  it('should return a new state on auth ActionType.UPDATE_BADGE_SUCCESS', () => {
    expect(reducer(undefined, actions.updateBadgeSuccess(getBadge_1().id, BadgeModel.BadgeStatus.ACTIVE))).toEqual({
      ...initialState,
      badgeMap: { [getBadge_1().id]: { status: BadgeModel.BadgeStatus.ACTIVE } },
    });
  });

  it('should return a new state on project ActionType.FETCH_PROJECT_BADGE_VISITOR_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectBadgeVisitorListSuccess(getProject_1().id, [getVisitorProject_1()], 1))).toEqual({
      ...initialState,
      badgeVisitorMap: { [getProject_1().id]: { [getVisitorProject_1().id]: getVisitorProject_1() } },
      count: 1,
    });
  });

  it('should return a new state on project ActionType.FETCH_BADGE_HISTORY_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchBadgeHistorySuccess([getBadgeHistory_1()], 1))).toEqual({
      ...initialState,
      historyList: [getBadgeHistory_1()],
      count: 1,
    });
  });

  it('should return a new state on project ActionType.CLEAR_BADGE_HISTORY', () => {
    expect(reducer(undefined, actions.clearBadgeHistory())).toEqual({
      ...initialState,
      historyList: [],
      count: 0,
    });
  });
});
