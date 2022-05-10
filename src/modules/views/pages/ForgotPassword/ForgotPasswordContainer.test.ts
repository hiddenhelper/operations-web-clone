import { getInitialState } from '../../../../test/rootState';
import { userState } from '../../../state-mgmt/user';
import { mapStateToProps, mapDispatchToProps } from './ForgotPasswordContainer';
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
      resetPassword: expect.any(Function),
      clearLoading: expect.any(Function),
    });
  });

  it('should dispatch resetPassword action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const email = 'email';
    props.resetPassword(email);
    expect(dispatch).toBeCalledWith(userState.actions.resetPasswordStart(email));
  });

  it('should dispatch clearLoading action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const key = 'key';
    props.clearLoading(key);
    expect(dispatch).toBeCalledWith(generalState.actions.clear(key));
  });
});
