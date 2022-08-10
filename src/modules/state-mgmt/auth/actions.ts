import { UserModel } from '../../models';

export enum ActionType {
  SIGN_IN_START = '[auth] sign in start',
  SIGN_IN_SUCCESS = '[auth] sign in success',
  SIGN_OUT_START = '[auth] sign out start',
  SIGN_OUT_SUCCESS = '[auth] sign out success',
  RECOVER_SESSION_START = '[auth] recover session start',
  RECOVER_SESSION_DONE = '[auth] recover session success',
  FETCH_USER_PERMISSIONS_START = '[auth] fetch admin permission start',
  FETCH_USER_PERMISSIONS_SUCCESS = '[auth] fetch user permissions success',
}

export const actions = {
  signInStart: (username: string, password: string) => ({ type: ActionType.SIGN_IN_START, payload: { username, password } }),
  signInSuccess: (session: UserModel.IUser) => ({ type: ActionType.SIGN_IN_SUCCESS, payload: { session } }),
  signOutStart: () => ({ type: ActionType.SIGN_OUT_START, payload: {} }),
  signOutSuccess: () => ({ type: ActionType.SIGN_OUT_SUCCESS, payload: {} }),
  recoverSessionStart: () => ({ type: ActionType.RECOVER_SESSION_START, payload: {} }),
  recoverSessionDone: () => ({ type: ActionType.RECOVER_SESSION_DONE, payload: {} }),
  fetchUserPermissionsStart: (id: string) => ({ type: ActionType.FETCH_USER_PERMISSIONS_START, payload: { id } }),
  fetchUserPermissionsSuccess: (perimissions: any) => ({ type: ActionType.FETCH_USER_PERMISSIONS_SUCCESS, payload: { perimissions } }),
};
