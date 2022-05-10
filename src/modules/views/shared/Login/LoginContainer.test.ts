import { getInitialState } from '../../../../test/rootState';
import { mapStateToProps, mapDispatchToProps } from './LoginContainer';
import { authState } from '../../../state-mgmt/auth';

describe('LoginContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      loadingStatus: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      login: expect.any(Function),
    });
  });

  it('should dispatch login start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const username = 'email';
    const password = 'password';
    props.login(username, password);
    expect(dispatch).toBeCalledWith(authState.actions.signInStart(username, password));
  });
});
