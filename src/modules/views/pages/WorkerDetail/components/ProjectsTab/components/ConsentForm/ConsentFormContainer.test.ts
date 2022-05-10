import { getProject_1, getWorker_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import { generalState } from '../../../../../../../state-mgmt/general';
import { workerState } from '../../../../../../../state-mgmt/worker';
import { GENERAL } from '../../../../../../../../constants';
import { mapStateToProps, mapDispatchToProps } from './ConsentFormContainer';

describe('ConsentFormContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      consentForm: getInitialState().worker.consentForm,
      countryList: [],
      jobTitlesList: [],
      languageTurnerProtocolsList: [],
      loadingMap: undefined,
      loading: undefined,
      saveLoading: undefined,
      skilledTradeList: [],
      socJobTitlesList: [],
      tradeStatusesList: [],
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      clearErrors: expect.any(Function),
      downloadConsentForm: expect.any(Function),
      fetchConsentForm: expect.any(Function),
      fetchJobTitles: expect.any(Function),
      fetchLanguageTurnerProtocols: expect.any(Function),
      fetchSkilledTrades: expect.any(Function),
      fetchSocJobTitles: expect.any(Function),
      fetchTradeStatuses: expect.any(Function),
      saveConsentForm: expect.any(Function),
    });
  });

  it('should dispatch saveConsentForm start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchConsentForm(getWorker_1().id, getProject_1().id, true);
    expect(dispatch).toBeCalledWith(workerState.actions.fetchConsentFormStart(getWorker_1().id, getProject_1().id, true));
  });

  it('should dispatch saveConsentForm start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveConsentForm(getWorker_1().id, getProject_1().id, {} as any);
    expect(dispatch).toBeCalledWith(workerState.actions.saveConsentFormStart(getWorker_1().id, getProject_1().id, {} as any));
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_CONSENT_FORM));
  });

  it('should dispatch downloadConsentForm start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.downloadConsentForm(getWorker_1().id, getProject_1().id, 'name');
    expect(dispatch).toBeCalledWith(workerState.actions.downloadConsentFormStart(getWorker_1().id, getProject_1().id, 'name'));
  });
});
