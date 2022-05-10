import { Epic, ofType } from 'redux-observable';
import { of, concat, EMPTY, from } from 'rxjs';
import { mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';

import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';
import { generalState } from '../general';
import { GENERAL } from '../../../constants';
import { clientState } from '../client';

export const authSignIn: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SIGN_IN_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_LOGIN, true)),
        deps.authService.signIn(payload).pipe(
          mergeMap(res => {
            const isCompany = res.attributes['custom:companyid'];
            const actionsCollection: IAction[] = [actions.signInSuccess(res.signInUserSession.idToken.payload)];
            if (!!isCompany) actionsCollection.push(clientState.actions.fetchClientStart(isCompany));
            return concat(from(actionsCollection));
          })
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_LOGIN, false))
      ).pipe(catchError(error => of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_LOGIN, false, true, error))))
    )
  );

export const authSignOut: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SIGN_OUT_START),
    mergeMap(() =>
      concat(
        deps.authService.signOut().pipe(
          tap(() => window.location.reload()),
          switchMap(() => EMPTY)
        )
      )
    )
  );

export const recoverSession: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.RECOVER_SESSION_START),
    mergeMap(() =>
      deps.authService.isSignedIn().pipe(
        mergeMap(session => of(actions.signInSuccess(session.signInUserSession.idToken.payload), actions.recoverSessionDone())),
        catchError(() => of(actions.signOutSuccess(), push('/')))
      )
    )
  );

export const epics = [authSignIn, authSignOut, recoverSession];
