import { AuthService } from './AuthService';
import { of, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { LANG } from '../../constants';

describe('AuthService', () => {
  let authService: AuthService;
  const serviceProvider = {
    configure: jest.fn().mockReturnValue(of({ user: {} })),
    currentSession: jest.fn().mockReturnValue(of({ user: {} })),
    currentAuthenticatedUser: jest.fn().mockReturnValue(of({ user: {} })),
    signIn: jest.fn().mockReturnValue(of({ user: {} })),
    signOut: jest.fn().mockReturnValue(of(EMPTY)),
  } as any;

  beforeAll(() => {
    authService = new AuthService();
    (AuthService as any).auth = serviceProvider;
  });

  describe('configure', () => {
    it('should call configure from serviceProvider', () => {
      AuthService.configure();
      expect(serviceProvider.configure).toHaveBeenCalled();
    });
  });

  describe('getSession', () => {
    it('should call currentSession from serviceProvider', () => {
      AuthService.getSession();
      expect(serviceProvider.currentSession).toHaveBeenCalled();
    });

    it('should catch error', done => {
      const error = { msg: 'get session error' };
      (AuthService as any).auth.currentSession = () => Promise.reject(error);
      AuthService.getSession()
        .pipe(
          tap(() => expect(true).toBe(false)),
          catchError(e => {
            expect(e).toEqual(e);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });
  });

  describe('isSignedIn', () => {
    it('should call currentAuthenticatedUser from serviceProvider', () => {
      authService.isSignedIn();
      expect(serviceProvider.currentAuthenticatedUser).toHaveBeenCalled();
    });

    it('should catch error', done => {
      const error = { msg: 'get session error' };
      (AuthService as any).auth.currentAuthenticatedUser = () => Promise.reject(error);
      authService
        .isSignedIn()
        .pipe(
          tap(() => expect(true).toBe(false)),
          catchError(e => {
            expect(e).toEqual(e);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });
  });

  describe('signIn', () => {
    const username = 'username';
    const password = 'password';

    it('should call signIn from serviceProvider', () => {
      authService.signIn({ username, password });
      expect(serviceProvider.signIn).toHaveBeenCalledWith(username, password);
    });

    describe('should catch error', () => {
      it('should throw an error message for auth code', done => {
        const error = { code: 'NotAuthorizedException' };
        (AuthService as any).auth.signIn = () => Promise.reject(error);
        authService
          .signIn({ username, password })
          .pipe(
            tap(() => expect(true).toBe(false)),
            catchError(e => {
              expect(e).toEqual(LANG.EN.AMPLIFY.ERROR.NotAuthorizedException);
              done();
              return EMPTY;
            })
          )
          .subscribe();
      });

      it('should throw default error message', done => {
        const error = { code: 'invalid' };
        (AuthService as any).auth.signIn = () => Promise.reject(error);
        authService
          .signIn({ username, password })
          .pipe(
            tap(() => expect(true).toBe(false)),
            catchError(e => {
              expect(e).toEqual(LANG.EN.AMPLIFY.ERROR.defaultMessage);
              done();
              return EMPTY;
            })
          )
          .subscribe();
      });
    });
  });

  describe('should call signOut from serviceProvider', () => {
    it('should signIn with items', () => {
      authService.signOut();
      expect(serviceProvider.signOut).toHaveBeenCalled();
    });
  });
});
