import { mapStateToProps, mapDispatchToProps } from './ProtectedRouteContainer';

import { getInitialState } from '../../../../test/rootState';
import { actions as authActions } from '../../../state-mgmt/auth/actions';
import { actions as clientActions } from '../../../state-mgmt/client/actions';

describe('ProtectedRouteContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      authenticated: getInitialState().auth.authenticated,
      currentUserRole: getInitialState().auth.role,
      sessionChecked: false,
      clientMap: getInitialState().client.clientMap,
      companyId: getInitialState().auth.companyId,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      recoverSession: expect.any(Function),
      fetchClient: expect.any(Function),
      getAccountData: expect.any(Function),
    });
  });

  it('should dispatch recoverSession action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.recoverSession();
    expect(dispatch).toBeCalledWith(authActions.recoverSessionStart());
  });

  it('should dispatch fetchClient action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClient(getInitialState().auth.companyId);
    expect(dispatch).toBeCalledWith(clientActions.fetchClientStart(getInitialState().auth.companyId));
  });
});
