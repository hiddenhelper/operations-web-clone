import { procoreState } from 'modules/state-mgmt/procore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GENERAL } from '../../../../constants';
import { clientState } from '../../../state-mgmt/client';
import { IRootState } from '../../../state-mgmt/rootState';

import ProcoreMapping from './ProcoreMapping';

export const mapStateToProps = (state: IRootState) => ({
  clientLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CLIENT],
  clientMap: state.client.clientMap,
  procoreSaveReportFrequencyLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_PROCORE_REPORT_FREQUENCY],
  procoreReportFrequency: state.procore.procoreReportFrequency,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClient: (companyId: string) => dispatch(clientState.actions.fetchClientStart(companyId)),
  fetchProcoreReportFrequency: (clientId: string) => dispatch(procoreState.actions.fetchProcoreReportFrequencyStart(clientId)),
  saveProcoreReportFrequency: (clientId: string, frequency: number) => dispatch(procoreState.actions.saveProcoreReportFrequencyStart(clientId, frequency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcoreMapping);
