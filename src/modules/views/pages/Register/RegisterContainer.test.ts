import { push } from 'connected-react-router';
import { getInitialState } from '../../../../test/rootState';
import { userState } from '../../../state-mgmt/user';
import { mapStateToProps, mapDispatchToProps } from './RegisterContainer';

describe('RegisterContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      loadingCreateStatus: undefined,
      loadingTokenStatus: undefined,
      email: null,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      validateToken: expect.any(Function),
      createAccount: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch validateToken action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const token = 'token';
    props.validateToken(token);
    expect(dispatch).toBeCalledWith(userState.actions.validateTokenStart(token));
  });

  it('should dispatch createAccount start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const token = 'token';
    const password = 'password';
    props.createAccount(token, password);
    expect(dispatch).toBeCalledWith(userState.actions.signUpStart(token, password));
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
});
