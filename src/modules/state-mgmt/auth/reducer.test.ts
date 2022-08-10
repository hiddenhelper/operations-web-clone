import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { cognitoResponse } from '../../../test/entities';

describe('auth reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  // it('should return a new state on auth ActionType.SIGN_IN_SUCCESS', () => {
  //   expect(reducer(undefined, actions.signInSuccess(cognitoResponse() as any))).toEqual({
  //     ...initialState,
  //     authenticated: true,
  //     session: cognitoResponse(),
  //     role: cognitoResponse()['custom:role'],
  //   });
  // });

  it('should return a new state on auth ActionType.SIGN_OUT_SUCCESS', () => {
    expect(reducer(undefined, actions.signOutSuccess())).toEqual({ ...initialState, authenticated: false });
  });

  it('should return a new state on auth ActionType.RECOVER_SESSION_DONE', () => {
    expect(reducer(undefined, actions.recoverSessionDone())).toEqual({ ...initialState, sessionChecked: true });
  });
});
