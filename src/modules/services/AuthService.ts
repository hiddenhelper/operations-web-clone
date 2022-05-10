import Auth from '@aws-amplify/auth';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LANG } from '../../constants';

const config = process.env;
export class AuthService {
  private static auth = Auth;

  public static configure = () =>
    AuthService.auth.configure({
      userPoolId: config.REACT_APP_AWS_USER_POOL_ID,
      userPoolWebClientId: config.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
      region: config.REACT_APP_AWS_REGION,
    });

  public static getSession = () => from(AuthService.auth.currentSession()).pipe(catchError(error => throwError(error)));

  public isSignedIn = (): Observable<any> => from(AuthService.auth.currentAuthenticatedUser()).pipe(catchError(error => throwError(error)));

  public signIn = ({ username, password }): Observable<any> =>
    from(AuthService.auth.signIn(username, password)).pipe(
      catchError(error => throwError(LANG.EN.AMPLIFY.ERROR[error.code] || LANG.EN.AMPLIFY.ERROR.defaultMessage))
    );

  public signOut = (): Observable<any> => from(AuthService.auth.signOut({ global: true }));
}
