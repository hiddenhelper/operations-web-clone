import { mapStateToProps, mapDispatchToProps } from './ClientListContainer';
import { getInitialState } from '../../../../test/rootState';
import { clientState } from '../../../state-mgmt/client';
import { push } from 'connected-react-router';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('ClientListContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      clientMap: getInitialState().client.clientMap,
      mwbeList: getInitialState().client.mwbeList,
      clientCount: getInitialState().client.count,
      clientStatistics: getInitialState().statistics.clientStatistics,
      listLoading: undefined,
      loading: undefined,
      deleteLoading: undefined,
      statisticsLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchMwbe: expect.any(Function),
      fetchClientSummary: expect.any(Function),
      fetchClientList: expect.any(Function),
      clearClientMap: expect.any(Function),
      deleteClient: expect.any(Function),
      fetchClientStatistics: expect.any(Function),
      clearClientStatistics: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchMwbe start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchMwbe();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchMWbeListStart());
  });

  it('should dispatch fetchClientSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const clientId = '1';
    props.fetchClientSummary(clientId);
    expect(dispatch).toBeCalledWith(clientState.actions.fetchClientSummaryStart(clientId));
  });

  it('should dispatch fetchClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {};
    props.fetchClientList(query);
    expect(dispatch).toBeCalledWith(clientState.actions.fetchClientListStart(query));
  });

  it('should dispatch clearClientMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientMap();
    expect(dispatch).toBeCalledWith(clientState.actions.clearClientMap());
  });

  it('should dispatch deleteClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteClient('id', {});
    expect(dispatch).toBeCalledWith(clientState.actions.deleteClientStart('id', {}));
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });

  it('should dispatch fetchClientStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchClientStatisticsStart());
  });

  it('should dispatch clearClientStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearClientStatistics());
  });
});
