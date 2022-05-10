import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ConsentForm from './ConsentForm';

import { IRootState } from '../../../../../../../state-mgmt/rootState';
import { GENERAL } from '../../../../../../../../constants';
import { workerState } from '../../../../../../../state-mgmt/worker';
import { generalState } from '../../../../../../../state-mgmt/general';
import { ConsentFormModel } from '../../../../../../../models';

export const mapStateToProps = (state: IRootState) => ({
  consentForm: state.worker.consentForm,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_CONSENT_FORM],
  saveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_CONSENT_FORM],
  countryList: state.general.countryList,
  jobTitlesList: state.worker.jobTitlesList,
  socJobTitlesList: state.worker.socJobTitlesList,
  tradeStatusesList: state.worker.tradeStatusesList,
  languageTurnerProtocolsList: state.worker.languageTurnerProtocolsList,
  skilledTradeList: state.worker.skilledTradeList,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM)),
  fetchConsentForm: (workerId: string, projectId: string, isEditable: boolean) =>
    dispatch(workerState.actions.fetchConsentFormStart(workerId, projectId, isEditable)),
  saveConsentForm: (workerId: string, projectId: string, data: ConsentFormModel.IProjectInformationForm) =>
    dispatch(workerState.actions.saveConsentFormStart(workerId, projectId, data)),
  downloadConsentForm: (id: string, projectId: string, name: string) => dispatch(workerState.actions.downloadConsentFormStart(id, projectId, name)),
  fetchJobTitles: () => dispatch(workerState.actions.fetchJobTitlesStart()),
  fetchSocJobTitles: () => dispatch(workerState.actions.fetchSocJobTitlesStart()),
  fetchTradeStatuses: () => dispatch(workerState.actions.fetchTradeStatusesStart()),
  fetchLanguageTurnerProtocols: () => dispatch(workerState.actions.fetchLanguageTurnerProtocolsStart()),
  fetchSkilledTrades: () => dispatch(workerState.actions.fetchSkilledTradeListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsentForm);
