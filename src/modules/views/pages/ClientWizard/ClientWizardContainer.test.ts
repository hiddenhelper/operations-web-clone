import { getInitialState } from '../../../../test/rootState';
import { clientState } from '../../../state-mgmt/client';
import { generalState } from '../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './ClientWizardContainer';

import { GENERAL } from '../../../../constants';

describe('ClientWizardContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clientMap: {},
      mwbeList: [],
      tradeList: [],
      loading: undefined,
      sendForApprovalLoading: undefined,
      approveLoading: undefined,
      countryList: [],
      groupList: [],
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchClient: expect.any(Function),
      fetchMwbe: expect.any(Function),
      fetchTradeList: expect.any(Function),
      saveClient: expect.any(Function),
      sendClientForApproval: expect.any(Function),
      updateClient: expect.any(Function),
      clearErrors: expect.any(Function),
      approveClient: expect.any(Function),
      clearClientMap: expect.any(Function),
      fetchGroupSearch: expect.any(Function),
    });
  });

  it('should dispatch fetchClientStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.fetchClient(id);
    expect(dispatch).toBeCalledWith(clientState.actions.fetchDraftClientStart(id));
  });

  it('should dispatch fetchMWbeListStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchMwbe();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchMWbeListStart());
  });

  it('should dispatch fetchTradeListStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTradeList();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchTradesStart());
  });

  it('should dispatch saveClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const client = { name: 'client name' } as any;
    const step = { key: 'step' } as any;
    props.saveClient(client, step);
    expect(dispatch).toBeCalledWith(clientState.actions.saveClientStart(client, step));
  });

  it('should dispatch updateClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const client = { name: 'client name' } as any;
    props.updateClient(client);
    expect(dispatch).toBeCalledWith(clientState.actions.updateDraftClientStart(client));
  });

  it('should dispatch sendClientForApproval start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.sendClientForApproval(id);
    expect(dispatch).toBeCalledWith(clientState.actions.sendApproveClientStart(id));
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_CLIENT));
  });

  it('should dispatch sendClientForApproval start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const clientId = 'id';
    props.sendClientForApproval(clientId);
    expect(dispatch).toBeCalledWith(clientState.actions.sendApproveClientStart(clientId));
  });

  it('should dispatch approveClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const clientId = 'id';
    props.approveClient(clientId);
    expect(dispatch).toBeCalledWith(clientState.actions.approveClientStart(clientId));
  });

  it('should dispatch clearClientMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientMap();
    expect(dispatch).toBeCalledWith(clientState.actions.clearClientMap());
  });
});
