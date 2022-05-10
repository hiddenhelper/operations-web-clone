import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { badgePrinterSystemState } from '../../../../../state-mgmt/badge-printer-system';

import BadgePrinterSystemTab from './BadgePrinterSystemTab';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  badgePrinterSystemMap: state.badgePrinterSystem.badgePrinterSystemMap,
  deviceCount: state.badgePrinterSystem.count,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_LIST],
  summaryLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_BADGE_PRINTER_SYSTEM_SUMMARY],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_ACCESS_CONTROL_SYSTEM],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
  fetchBadgePrinterSystemList: (query: GeneralModel.IQueryParams) => dispatch(badgePrinterSystemState.actions.fetchBadgePrinterSystemListStart(query)),
  fetchBadgePrinterSystemSummary: (id: string) => dispatch(badgePrinterSystemState.actions.fetchBadgePrintingSystemSummaryStart(id)),
  deleteBadgePrinterSystem: (id: string, query: GeneralModel.IQueryParams) =>
    dispatch(badgePrinterSystemState.actions.deleteBadgePrinterSystemStart(id, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgePrinterSystemTab);
