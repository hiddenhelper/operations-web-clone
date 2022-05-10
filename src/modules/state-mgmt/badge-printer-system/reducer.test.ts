import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';

describe('badge-printer-system reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on auth ActionType.FETCH_BADGE_PRINTER_SYSTEM_LIST_SUCCESS', () => {
    const badgePrinterSystem = { id: 'string' };
    expect(reducer(undefined, actions.fetchBadgePrinterSystemListSuccess([badgePrinterSystem as any], 1))).toEqual({
      ...initialState,
      badgePrinterSystemMap: { [badgePrinterSystem.id]: { ...badgePrinterSystem, index: 0 } },
      count: 1,
    });
  });

  it('should return a new state on auth ActionType.SAVE_BADGE_PRINTER_SYSTEM_SUCCESS', () => {
    const badgePrinterSystem = { id: 'string' };
    expect(reducer(undefined, actions.saveBadgePrinterSystemSuccess(badgePrinterSystem as any))).toEqual({
      ...initialState,
      badgePrinterSystemMap: { [badgePrinterSystem.id]: badgePrinterSystem },
    });
  });

  it('should return a new state on auth ActionType.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_SUCCESS', () => {
    const badgePrinterSystem = { id: 'string' };
    expect(reducer(undefined, actions.fetchBadgePrinterSystemSummarySuccess(badgePrinterSystem as any))).toEqual({
      ...initialState,
      badgePrinterSystemMap: { [badgePrinterSystem.id]: badgePrinterSystem },
    });
  });

  it('should return a new state on client ActionType.CLEAR_BADGE_PRINTER_SYSTEM_MAP', () => {
    expect(reducer(undefined, actions.clearBadgePrinterSystemMap())).toEqual({ ...initialState, badgePrinterSystemMap: {}, count: 0 });
  });
});
