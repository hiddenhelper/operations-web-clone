import { ActionsObservable } from 'redux-observable';
import { push } from 'connected-react-router';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { authSignIn, authSignOut, recoverSession } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getUser_1 } from '../../../test/entities';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authSignIn', () => {
    const username = 'username';
    const password = 'password';

    it('should get epic for auth sign in', () => {
      return runEpic(authSignIn(ActionsObservable.of(actions.signInStart(username, password)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_LOGIN, true));
        expect(deps.authService.signIn).toHaveBeenCalledWith({ username, password });
      });
    });

    it('should catch errors', () => {
      deps.authService.signIn = () => throwError(error);
      return runEpic(authSignIn(ActionsObservable.of(actions.signInStart(username, password)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_LOGIN, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_LOGIN, false, true, error));
      });
    });
  });

  describe('authSignOut', () => {
    window.location.reload = jest.fn();
    it('should get epic for auth sign out', () => {
      return runEpic(authSignOut(ActionsObservable.of(actions.signOutStart()), {} as any, deps), actionList => {
        expect(deps.authService.signOut).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
      });
    });

    it('should catch errors', () => {
      deps.authService.signOut = () => throwError(error);
      return runEpic(recoverSession(ActionsObservable.of(actions.signOutStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(undefined);
      });
    });
  });

  describe('recoverSession', () => {
    it('should get epic for recoverSessionDone when no session', () => {
      return runEpic(recoverSession(ActionsObservable.of(actions.recoverSessionStart()), {} as any, deps), actionList => {
        expect(deps.authService.isSignedIn).toHaveBeenCalled();
        expect(actionList[0]).toEqual(actions.signInSuccess(getUser_1()));
        expect(actionList[1]).toEqual(actions.recoverSessionDone());
      });
    });

    it('should catch errors', () => {
      deps.authService.isSignedIn = () => throwError(error);
      return runEpic(recoverSession(ActionsObservable.of(actions.recoverSessionStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.signOutSuccess());
        expect(actionList[1]).toEqual(push('/'));
      });
    });
  });
});
