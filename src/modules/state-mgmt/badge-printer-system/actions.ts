import { BadgePrintingSystemModel, GeneralModel } from '../../models';

export enum ActionType {
  FETCH_BADGE_PRINTER_SYSTEM_START = '[badgePrintingSystem] fetch badge printer system start',
  FETCH_BADGE_PRINTER_SYSTEM_LIST_START = '[badgePrintingSystem] fetch badge printer system  liststart',
  FETCH_BADGE_PRINTER_SYSTEM_LIST_SUCCESS = '[badgePrintingSystem] fetch badge printer system list success',
  SAVE_BADGE_PRINTER_SYSTEM_START = '[badgePrintingSystem] save badge printer system start',
  UPDATE_BADGE_PRINTER_SYSTEM_START = '[badgePrintingSystem] update badge printer system system start',
  SAVE_BADGE_PRINTER_SYSTEM_SUCCESS = '[badgePrintingSystem] save badge printer system system success',
  CLEAR_BADGE_PRINTER_SYSTEM_MAP = '[badgePrintingSystem] clear badge printer system map',
  DELETE_BADGE_PRINTER_SYSTEM_START = '[badgePrintingSystem] delete badge printer system start',
  FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_START = '[badgePrintingSystem] fetch badge printer system summary start',
  FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_SUCCESS = '[badgePrintingSystem] fetch badge printer system summary success',
  FETCH_BADGE_PRINTER_SYSTEM_PROJECT_LIST_START = '[badgePrintingSystem] fetch badge printer system project list start',
  FETCH_PROJECT_BADGE_PRINTER_SYSTEM_LIST_START = '[badgePrintingSystem] fetch project badge printer system list start',
  UPDATE_BADGE_PRINTER_SYSTEM_DATE_START = '[badgePrintingSystem] update badge printer system date start',
}

export const actions = {
  fetchBadgePrinterSystemStart: (id: string) => ({ type: ActionType.FETCH_BADGE_PRINTER_SYSTEM_START, payload: { id } }),
  fetchBadgePrinterSystemListStart: (query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_BADGE_PRINTER_SYSTEM_LIST_START,
    payload: { query },
  }),
  fetchBadgePrinterSystemListSuccess: (list: BadgePrintingSystemModel.IBadgePrintingSystem[], count: number) => ({
    type: ActionType.FETCH_BADGE_PRINTER_SYSTEM_LIST_SUCCESS,
    payload: { list, count },
  }),
  fetchBadgePrintingSystemSummaryStart: (id: string) => ({ type: ActionType.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_START, payload: { id } }),
  fetchBadgePrinterSystemSummarySuccess: (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) => ({
    type: ActionType.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY_SUCCESS,
    payload: { badgePrinterSystem },
  }),
  saveBadgePrinterSystemStart: (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) => ({
    type: ActionType.SAVE_BADGE_PRINTER_SYSTEM_START,
    payload: { badgePrinterSystem },
  }),
  updateBadgePrinterSystemStart: (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) => ({
    type: ActionType.UPDATE_BADGE_PRINTER_SYSTEM_START,
    payload: { badgePrinterSystem },
  }),
  saveBadgePrinterSystemSuccess: (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) => ({
    type: ActionType.SAVE_BADGE_PRINTER_SYSTEM_SUCCESS,
    payload: { badgePrinterSystem },
  }),
  clearBadgePrinterSystemMap: () => ({
    type: ActionType.CLEAR_BADGE_PRINTER_SYSTEM_MAP,
    payload: {},
  }),
  deleteBadgePrinterSystemStart: (id: string, query) => ({
    type: ActionType.DELETE_BADGE_PRINTER_SYSTEM_START,
    payload: { id, query },
  }),
  fetchBadgePrintingSystemProjectListStart: (query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_BADGE_PRINTER_SYSTEM_PROJECT_LIST_START,
    payload: { query },
  }),
  fetchProjectBadgePrintingSystemListStart: (id: string, page: number, limit: number) => ({
    type: ActionType.FETCH_PROJECT_BADGE_PRINTER_SYSTEM_LIST_START,
    payload: { id, page, limit },
  }),
  updateBadgePrintingSystemDateStart: (projectId: string, id: string, date: string) => ({
    type: ActionType.UPDATE_BADGE_PRINTER_SYSTEM_DATE_START,
    payload: { projectId, id, date },
  }),
};
