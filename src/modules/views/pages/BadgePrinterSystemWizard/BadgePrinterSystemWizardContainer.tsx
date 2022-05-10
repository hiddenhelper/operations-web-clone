import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { generalState } from '../../../state-mgmt/general';
import { badgePrinterSystemState } from '../../../state-mgmt/badge-printer-system';
import { BadgePrintingSystemModel } from '../../../models';
import BadgePrinterSystemWizard from './BadgePrinterSystemWizard';

export const mapStateToProps = (state: IRootState) => ({
  badgePrinterSystemMap: state.badgePrinterSystem.badgePrinterSystemMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBadgePrinterSystem: (id: string) => dispatch(badgePrinterSystemState.actions.fetchBadgePrinterSystemStart(id)),
  saveBadgePrinterSystem: (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) =>
    dispatch(badgePrinterSystemState.actions.saveBadgePrinterSystemStart(badgePrinterSystem)),
  updateBadgePrinterSystem: (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) =>
    dispatch(badgePrinterSystemState.actions.updateBadgePrinterSystemStart(badgePrinterSystem)),
  clearBadgePrinterSystemMap: () => dispatch(badgePrinterSystemState.actions.clearBadgePrinterSystemMap()),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgePrinterSystemWizard);
