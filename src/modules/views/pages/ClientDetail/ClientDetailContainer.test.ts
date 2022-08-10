import { GENERAL } from '../../../../constants';
import { getInitialState } from '../../../../test/rootState';
import { clientState } from '../../../state-mgmt/client';
import { generalState } from '../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './ClientDetailContainer';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('ClientDetailContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clientMap: getInitialState().client.clientMap,
      mwbeList: getInitialState().client.mwbeList,
      tradeList: getInitialState().client.tradeList,
      clientStatistics: getInitialState().statistics.clientDetailStatistics,
      updateClientLoading: undefined,
      clientLoading: undefined,
      statisticsLoading: undefined,
      isFcaUser: getInitialState().auth.isFcaUser,
      isAdmin: getInitialState().auth.isAdmin,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchClient: expect.any(Function),
      clearClientMap: expect.any(Function),
      fetchMwbe: expect.any(Function),
      fetchTradeList: expect.any(Function),
      fetchClientStatistics: expect.any(Function),
      saveClient: expect.any(Function),
      archiveClient: expect.any(Function),
      unarchiveClient: expect.any(Function),
      clearErrors: expect.any(Function),
      clearLoadingMap: expect.any(Function),
      clearClientStatistics: expect.any(Function),
    });
  });

  it('should dispatch fetchClientStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.fetchClient(id);
    expect(dispatch).toBeCalledWith(clientState.actions.fetchClientStart(id));
  });

  it('should dispatch clearClientMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientMap();
    expect(dispatch).toBeCalledWith(clientState.actions.clearClientMap());
  });

  it('should dispatch updateClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const client = { name: 'client name' } as any;
    props.saveClient(client);
    expect(dispatch).toBeCalledWith(clientState.actions.updateClientStart(client));
  });

  it('should dispatch archiveClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.archiveClient(id);
    expect(dispatch).toBeCalledWith(clientState.actions.archiveClientStart(id));
  });

  it('should dispatch unarchiveClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = 'id';
    props.unarchiveClient(id);
    expect(dispatch).toBeCalledWith(clientState.actions.unarchiveClientStart(id));
  });

  it('should dispatch fetchMwbe start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchMwbe();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchMWbeListStart());
  });

  it('should dispatch fetchTradeList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTradeList();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchTradesStart());
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_CLIENT));
  });

  it('should dispatch clearLoadingMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoadingMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearLoadingMap());
  });

  it('should dispatch fetchClientStatistics start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientStatistics('id');
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchClientDetailStatisticsStart('id'));
  });

  it('should dispatch clearClientStatistics start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearClientDetailStatistics());
  });
});
