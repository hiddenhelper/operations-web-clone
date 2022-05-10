import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getClientProjectHirearchy_1, getClient_1, getProject_1 } from '../../../test/entities';

describe('client reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on client ActionType.FETCH_CLIENT_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchClientListSuccess([getClient_1()], 1))).toEqual({
      ...initialState,
      clientMap: { [getClient_1().id]: getClient_1() },
      count: 1,
    });
  });

  it('should return a new state on client ActionType.FETCH_SELF_COMPANY_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchSelfClientSuccess(getClient_1()))).toEqual({
      ...initialState,
      selfCompany: getClient_1(),
    });
  });

  it('should return a new state on client ActionType.FETCH_MWBE_SUCCESS', () => {
    const mwbeList = { id: 'string', name: 'name' };
    expect(reducer(undefined, actions.fetchMWbeListSuccess(mwbeList as any))).toEqual({ ...initialState, mwbeList });
  });

  it('should return a new state on client ActionType.FETCH_TRADES', () => {
    const tradeList = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchTradesSuccess(tradeList as any))).toEqual({ ...initialState, tradeList });
  });

  it('should return a new state on client ActionType.INVITE_DRAFT_CLIENT_SUCCESS', () => {
    const client = { id: 'string', name: 'name', taxpayerIdentificationNumber: 'string' };
    expect(reducer(undefined, actions.inviteDraftClientSuccess(client as any))).toEqual({ ...initialState, clientMap: { [client.id]: client } });
  });

  it('should return a new state on client ActionType.UPDATE_DRAFT_CLIENT_SUCCESS', () => {
    const client = { id: 'string', name: 'name' };
    expect(reducer(undefined, actions.updateDraftClientSuccess(client as any))).toEqual({ ...initialState, clientMap: { [client.id]: client } });
  });

  it('should return a new state on client ActionType.UPDATE_CLIENT_SUCCESS', () => {
    const client = { id: 'string', name: 'name' };
    expect(reducer(undefined, actions.updateClientSuccess(client as any))).toEqual({ ...initialState, clientMap: { [client.id]: client } });
  });

  it('should return a new state on client ActionType.ARCHIVE_CLIENT_SUCCESS', () => {
    const stateWithClient = {
      ...initialState,
      clientMap: {
        client1: {
          name: 'test',
        },
      },
    };
    const clientId = 'client1';
    expect(reducer(undefined, actions.archiveClientSuccess(clientId))).toEqual({
      ...stateWithClient,
      clientMap: {
        client1: {
          status: 3,
        },
      },
    });
  });

  it('should return a new state on client ActionType.UNARCHIVE_CLIENT_SUCCESS', () => {
    const stateWithClient = {
      ...initialState,
      clientMap: {
        client1: {
          name: 'test',
        },
      },
    };
    const clientId = 'client1';
    expect(reducer(undefined, actions.unarchiveClientSuccess(clientId))).toEqual({
      ...stateWithClient,
      clientMap: {
        client1: {
          status: 2,
        },
      },
    });
  });

  it('should return a new state on client ActionType.CLEAR_CLIENT_MAP', () => {
    expect(reducer(undefined, actions.clearClientMap())).toEqual({ ...initialState, clientMap: {}, count: 0 });
  });

  it('should return a new state on user ActionType.FETCH_PROJECT_CLIENT_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectClientListSuccess(getProject_1().id, [getClient_1()], 1))).toEqual({
      ...initialState,
      clientProjectMap: { [getProject_1().id]: { [getClient_1().id]: getClient_1() } },
      count: 1,
    });
  });

  it('should return a new state on user ActionType.FETCH_PROJECT_CLIENT_HIREARCHY_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectClientHirearchyListSuccess([getClientProjectHirearchy_1()]))).toEqual({
      ...initialState,
      clientProjectHirearchyMap: { [getClientProjectHirearchy_1().id]: getClientProjectHirearchy_1() },
    });
  });

  it('should return a new state on user ActionType.FETCH_PROJECT_CLIENT_SUMMARY_SUCCESS', () => {
    expect(
      reducer(
        { ...initialState, clientProjectMap: { [getProject_1().id]: { [getClient_1().id]: getClient_1() as any } } },
        actions.fetchProjectClientSummarySuccess(getProject_1().id, getClient_1())
      )
    ).toEqual({
      ...initialState,
      clientProjectMap: { [getProject_1().id]: { [getClient_1().id]: getClient_1() } },
    });
  });

  it('should return a new state on user ActionType.UPDATE_PROJECT_CLIENT_TAX_CONDITION_SUCCESS', () => {
    expect(
      reducer(
        { ...initialState, clientProjectMap: { [getProject_1().id]: { [getClient_1().id]: getClient_1() as any } } },
        actions.updateProjectClientTaxConditionSuccess(getProject_1().id, getClient_1().id, true)
      )
    ).toEqual({
      ...initialState,
      clientProjectMap: { [getProject_1().id]: { [getClient_1().id]: { ...getClient_1(), isTaxExempt: true } } },
    });
  });
});
