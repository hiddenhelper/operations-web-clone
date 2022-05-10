import { of, empty } from 'rxjs';

import { getUser_1 } from './entities';

export class AuthServiceMock {
  public static getSession = jest.fn().mockReturnValue(of({ getIdToken: () => ({ getJwtToken: () => 'token' }) }));
  public isSignedIn = jest.fn().mockReturnValueOnce(of({ signInUserSession: { idToken: { payload: getUser_1() } } }));
  public signIn = jest.fn().mockReturnValue(of({ signInUserSession: { idToken: { payload: getUser_1() } } }));
  public signOut = jest.fn().mockReturnValue(of(empty()));
}
