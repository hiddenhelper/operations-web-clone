import { mapStateToProps, mapDispatchToProps } from './WorkerWizardContainer';
import { getInitialState } from '../../../../test/rootState';
import { workerState } from '../../../state-mgmt/worker';
import { getWorker_1 } from '../../../../test/entities';
import { generalState } from '../../../state-mgmt/general';
import { GENERAL } from '../../../../constants';
import { clientState } from '../../../state-mgmt/client';
import { push } from 'connected-react-router';

describe('WorkerWizardContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      workersMap: getInitialState().worker.workerMap,
      company: getInitialState().client.selfCompany,
      ethnicityList: getInitialState().worker.ethnicityList,
      languageList: getInitialState().worker.languageList,
      skilledTradeList: getInitialState().worker.skilledTradeList,
      identificationTypeList: getInitialState().worker.identificationTypeList,
      uiRelationMap: getInitialState().general.uiRelationMap,
      loading: undefined,
      saveLoading: undefined,
      searchLoading: undefined,
      countryList: [],
      geographicLocationsList: getInitialState().worker.geographicLocationsList,
      isFcaUser: getInitialState().auth.isFcaUser,
      isAdmin: getInitialState().auth.isAdmin,
      selfCompany: getInitialState().client.selfCompany,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      saveWorker: expect.any(Function),
      updateWorker: expect.any(Function),
      fetchWorker: expect.any(Function),
      fetchEthnicityList: expect.any(Function),
      fetchLanguageList: expect.any(Function),
      fetchSkilledTradeList: expect.any(Function),
      fetchIdentificationTypeList: expect.any(Function),
      searchCompanies: expect.any(Function),
      clearErrors: expect.any(Function),
      clearWorkersMap: expect.any(Function),
      navigate: expect.any(Function),
      fetchCompany: expect.any(Function),
      fetchGeographicLocationsList: expect.any(Function),
    });
  });

  it('should dispatch saveWorker start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const worker = getWorker_1();
    props.saveWorker(worker);
    expect(dispatch).toBeCalledWith(workerState.actions.saveWorkerStart(worker));
  });

  it('should dispatch updateWorker start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const worker = getWorker_1();
    props.updateWorker(worker);
    expect(dispatch).toBeCalledWith(workerState.actions.updateWorkerStart(worker));
  });

  it('should dispatch fetchWorker start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = getWorker_1().id;
    props.fetchWorker(id);
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerStart(id));
  });

  it('should dispatch fetchEthnicityList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchEthnicityList();
    expect(dispatch).toBeCalledWith(workerState.actions.fetchEthnicityListStart());
  });

  it('should dispatch fetchLanguageList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchLanguageList();
    expect(dispatch).toBeCalledWith(workerState.actions.fetchLanguageListStart());
  });

  it('should dispatch fetchSkilledTradeList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchSkilledTradeList();
    expect(dispatch).toBeCalledWith(workerState.actions.fetchSkilledTradeListStart());
  });

  it('should dispatch fetchIdentificationTypeList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchIdentificationTypeList();
    expect(dispatch).toBeCalledWith(workerState.actions.fetchIdentificationTypeListStart());
  });

  it('should dispatch searchClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = { isDeveloper: false };
    props.searchCompanies(query, '');
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart(query, ''));
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_WORKER));
  });

  it('should dispatch clearWorkersMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearWorkersMap();
    expect(dispatch).toBeCalledWith(workerState.actions.clearWorkerMap());
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/path');
    expect(dispatch).toBeCalledWith(push('/path'));
  });

  it('should dispatch fetchCompany start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchCompany();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchSelfClientStart());
  });

  it('should dispatch fetchGeographicLocationsList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchGeographicLocationsList();
    expect(dispatch).toBeCalledWith(workerState.actions.fetchGeographicLocationsListStart());
  });
});
