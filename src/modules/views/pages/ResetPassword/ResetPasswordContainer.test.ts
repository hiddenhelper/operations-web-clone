import { getInitialState } from '../../../../test/rootState';
import { userState } from '../../../state-mgmt/user';
import { mapStateToProps, mapDispatchToProps } from './ResetPasswordContainer';
import { generalState } from '../../../state-mgmt/general';

describe('RegisterContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      loadingStatus: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      confirmResetPassword: expect.any(Function),
      clearLoading: expect.any(Function),
    });
  });

  it('should dispatch confirmResetPassword action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const email = 'email';
    const token = 'token';
    const pwd = 'pwd';
    props.confirmResetPassword(token, email, pwd);
    expect(dispatch).toBeCalledWith(userState.actions.confirmResetPasswordStart(token, email, pwd));
  });

  it('should dispatch clearLoading action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const key = 'key';
    props.clearLoading(key);
    expect(dispatch).toBeCalledWith(generalState.actions.clear(key));
  });
});
