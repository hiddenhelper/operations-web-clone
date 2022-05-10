import { mapStateToProps, mapDispatchToProps } from './ProcoreClientsContainer';
import { getInitialState } from '../../../../test/rootState';
import { procoreState } from '../../../state-mgmt/procore';

describe('ProcoreClientsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clients: getInitialState().procore.clients,
      loading: undefined,
      userRole: getInitialState().auth.role,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      getProcoreClients: expect.any(Function),
    });
  });

  it('should dispatch getStatusProcore start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.getProcoreClients();
    expect(dispatch).toBeCalledWith(procoreState.actions.getProcoreClientsStart());
  });
});
