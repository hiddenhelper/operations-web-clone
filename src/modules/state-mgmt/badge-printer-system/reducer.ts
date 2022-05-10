import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.FETCH_BADGE_PRINTER_SYSTEM_LIST_SUCCESS:
      return {
        ...state,
        badgePrinterSystemMap: payload.list.reduce((total, item, index) => ({ ...total, [item.id]: { ...item, index } }), {}),
        count: payload.count,
      };
    case ActionType.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_SUCCESS:
    case ActionType.SAVE_BADGE_PRINTER_SYSTEM_SUCCESS:
      return {
        ...state,
        badgePrinterSystemMap: {
          ...state.badgePrinterSystemMap,
          [payload.badgePrinterSystem.id]: { ...state.badgePrinterSystemMap[payload.badgePrinterSystem.id], ...payload.badgePrinterSystem },
        },
      };
    case ActionType.CLEAR_BADGE_PRINTER_SYSTEM_MAP:
      return { ...state, badgePrinterSystemMap: {}, count: 0 };
    default:
      return state;
  }
};
