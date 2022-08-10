import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { projectNewState } from '../../../../../state-mgmt/project-new';
import { badgePrinterSystemState } from '../../../../../state-mgmt/badge-printer-system';

import { BadgePrintingSystemModel, GeneralModel } from '../../../../../models';
import BadgePrintingSystemTab from './BadgePrintingSystemTab';

export const mapStateToProps = (state: IRootState) => ({
  badgePrintingSystemMap: state.badgePrinterSystem.badgePrinterSystemMap,
  badgePrintingSystemCount: state.badgePrinterSystem.count,
  modalMap: state.general.modalMap,
  modalCount: state.general.modalCount,
  currentUserPermissions: state.auth.session?.permissions,
  badgePrintingSystemSummaryLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY],
  loadBadgePrintingSystemModalLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST],
  unassignBadgePrintingSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT],
  badgePrintingSystemProjectLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST],
  badgePrintingSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECT_BADGE_PRINTING_SYSTEM_LIST],
  assignBadgePrintingSystemLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  assignBadgePrintingSystem: (projectId: string, list: BadgePrintingSystemModel.IBadgePrintingSystemUpdateDate[]) =>
    dispatch(projectNewState.actions.assignBadgePrintingProjectStart(projectId, list)),
  fetchBadgePrintingSystemList: (query: GeneralModel.IQueryParams) => dispatch(badgePrinterSystemState.actions.fetchBadgePrintingSystemProjectListStart(query)),
  fetchBadgePrintingSystemSummary: (id: string) => dispatch(badgePrinterSystemState.actions.fetchBadgePrintingSystemSummaryStart(id)),
  unAssignBadgePrintingSystem: (projectId: string, id: string) => dispatch(projectNewState.actions.unAssignBadgePrintingSystemStart(projectId, id)),
  updateBadgePrintingSystemDate: (projectId: string, id: string, date: string) =>
    dispatch(badgePrinterSystemState.actions.updateBadgePrintingSystemDateStart(projectId, id, date)),
  fetchProjectBadgePrintingSystemList: (id: string, pageNumber: number, pageSize: number) =>
    dispatch(badgePrinterSystemState.actions.fetchProjectBadgePrintingSystemListStart(id, pageNumber, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgePrintingSystemTab);
