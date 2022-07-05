import { mapStateToProps, mapDispatchToProps } from './HeaderContainer';

import { getInitialState } from '../../../../test/rootState';
import { authState } from '../../../state-mgmt/auth';
import { push } from 'connected-react-router';

describe('HeaderContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      user: getInitialState().auth.session,
      userRole: getInitialState().auth.role,
      accountData: getInitialState().user.accountData,
      clientMap: {},
      companyId: null,
      isGeneralAdmin: false,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      logout: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch logout action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.logout();
    expect(dispatch).toBeCalledWith(authState.actions.signOutStart());
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
});
