import { Epic, ofType } from 'redux-observable';
import { of, concat, EMPTY, from } from 'rxjs';
import { mergeMap, catchError, tap, switchMap, map } from 'rxjs/operators';
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
            const session = res.signInUserSession.idToken.payload;
            const isCompany = session['custom:currentcompanyid'];
            const companyUserId = session['custom:companyuserid'];
            const actionsCollection: IAction[] = [actions.signInSuccess(session)];
            if (!!companyUserId) actionsCollection.push(actions.fetchUserPermissionsStart(companyUserId));
            if (!!isCompany && isCompany !== 'ffffffff-ffff-ffff-ffff-ffffffffffff') actionsCollection.push(clientState.actions.fetchClientStart(isCompany));

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
        mergeMap(res => {
          const session = res.signInUserSession.idToken.payload;
          const isCompany = session['custom:currentcompanyid'];
          const companyUserId = session['custom:companyuserid'];
          const actionsCollection: IAction[] = [actions.signInSuccess(session)];
          if (!!companyUserId) actionsCollection.push(actions.fetchUserPermissionsStart(companyUserId));
          if (!!isCompany && isCompany !== 'ffffffff-ffff-ffff-ffff-ffffffffffff') actionsCollection.push(clientState.actions.fetchClientStart(isCompany));
          actionsCollection.push(actions.recoverSessionDone());
          return concat(from(actionsCollection));
        }),
        catchError(() => of(actions.signOutSuccess(), push('/')))
      )
    )
  );

export const fetchUserPermissionsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_USER_PERMISSIONS_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PERMISSIONS, true)),
        deps.apiService.getUserPermissions(payload.id).pipe(map(res => actions.fetchUserPermissionsSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PERMISSIONS, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PERMISSIONS, false, true, error))
        )
      )
    )
  );

export const epics = [authSignIn, authSignOut, recoverSession, fetchUserPermissionsStart];
