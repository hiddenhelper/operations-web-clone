import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { GeneralModel, WorkerModel } from '../../../models';
import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { generalState } from '../../../state-mgmt/general';
import { workerState } from '../../../state-mgmt/worker';
import { clientState } from '../../../state-mgmt/client';

import WorkerWizard from './WorkerWizard';

export const mapStateToProps = (state: IRootState) => ({
  company: state.client.selfCompany,
  workersMap: state.worker.workerMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_WORKER],
  saveLoading: state.general.loadingMap[GENERAL.LOADING_KEY.SAVE_WORKER],
  searchLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH_CLIENT],
  ethnicityList: state.worker.ethnicityList,
  languageList: state.worker.languageList,
  skilledTradeList: state.worker.skilledTradeList,
  identificationTypeList: state.worker.identificationTypeList,
  uiRelationMap: state.general.uiRelationMap,
  countryList: state.general.countryList,
  geographicLocationsList: state.worker.geographicLocationsList,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveWorker: (worker: WorkerModel.IWorker) => dispatch(workerState.actions.saveWorkerStart(worker)),
  fetchCompany: () => dispatch(clientState.actions.fetchSelfClientStart()),
  updateWorker: (worker: WorkerModel.IWorker) => dispatch(workerState.actions.updateWorkerStart(worker)),
  fetchWorker: (id: string) => dispatch(workerState.actions.fetchWorkerStart(id)),
  fetchEthnicityList: () => dispatch(workerState.actions.fetchEthnicityListStart()),
  fetchLanguageList: () => dispatch(workerState.actions.fetchLanguageListStart()),
  fetchSkilledTradeList: () => dispatch(workerState.actions.fetchSkilledTradeListStart()),
  fetchIdentificationTypeList: () => dispatch(workerState.actions.fetchIdentificationTypeListStart()),
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_WORKER)),
  clearWorkersMap: () => dispatch(workerState.actions.clearWorkerMap()),
  searchCompanies: (query: GeneralModel.IQueryParams, tempId: string) => dispatch(clientState.actions.searchClientStart(query, tempId)),
  navigate: (path: string) => dispatch(push(path)),
  fetchGeographicLocationsList: () => dispatch(workerState.actions.fetchGeographicLocationsListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerWizard);
