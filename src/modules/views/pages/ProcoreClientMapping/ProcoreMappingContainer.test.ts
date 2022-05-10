import { mapStateToProps, mapDispatchToProps } from './ProcoreMappingContainer';
import { getInitialState } from '../../../../test/rootState';
import { clientState } from '../../../state-mgmt/client';
import { procoreState } from 'modules/state-mgmt/procore';

describe('ProcoreMappingContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clientMap: getInitialState().client.clientMap,
      loading: undefined,
      procoreReportFrequency: undefined,
      procoreSaveReportFrequencyLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchClient: expect.any(Function),
      fetchProcoreReportFrequency: expect.any(Function),
      saveProcoreReportFrequency: expect.any(Function),
    });
  });

  it('should dispatch fetchClientStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClient('123');
    expect(dispatch).toBeCalledWith(clientState.actions.fetchClientStart('123'));
  });

  it('should dispatch fetProcoreReportFrecuency action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProcoreReportFrequency('123');
    expect(dispatch).toBeCalledWith(procoreState.actions.fetchProcoreReportFrequencyStart('123'));
  });

  it('should dispatch save report frequency', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveProcoreReportFrequency('aaa', 1);
    expect(dispatch).toBeCalledWith(procoreState.actions.saveProcoreReportFrequencyStart('aaa', 1));
  });
});
