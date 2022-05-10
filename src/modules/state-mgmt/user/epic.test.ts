import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import {
  userSignUp,
  validateToken,
  fetchClientUserListStart,
  fetchUserProjectStart,
  fetchRoleListStart,
  saveUserStart,
  resetPassword,
  confirmResetPassword,
  changePassword,
  updateProfileStart,
  fetchAccountStart,
  updateProfilePhotoStart,
  uploadProfilePhotoStart,
  fetchProjectUserListStart,
} from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import {
  validateTokenResponse,
  getClient_1,
  getUserPagination_1,
  getClientUserPagination_1,
  getProject_1,
  getUserRole_1,
  getUser_1,
  getUploadFile_1,
  getUserAccount_1,
  getProjectUserPagination_1,
} from '../../../test/entities';
import { GENERAL } from '../../../constants';
import { coreState } from '../core';
import { generalState } from '../general';
import { runEpic } from '../../../test/runEpic';
import { GeneralModel, UserModel } from '../../../modules/models';

describe('user epics', () => {
  let deps: IEpicDependencies;
  let error;
  let errorResponse = { title: 'scary error' };
  let stateMgmtAdmin = { value: { auth: { role: UserModel.Role.FCA_ADMIN } } };
  let stateMgmtClient = { value: { auth: { role: UserModel.Role.CLIENT_ADMIN } } };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
  });

  describe('userSignUp', () => {
    const token = 'token';
    const password = 'password';

    it('should get epic for user sign up', () => {
      return runEpic(userSignUp(ActionsObservable.of(actions.signUpStart(token, password)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, true));
        expect(deps.apiService.createAccount).toHaveBeenCalledWith(token, password);
        expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.createAccount = () => throwError(error);
      return runEpic(userSignUp(ActionsObservable.of(actions.signUpStart(token, password)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, false, true, error));
      });
    });
  });

  describe('validateToken', () => {
    const token = 'token';

    it('should get epic for user validateToken', () => {
      return runEpic(validateToken(ActionsObservable.of(actions.validateTokenStart(token)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, true));
        expect(deps.apiService.validateToken).toHaveBeenCalledWith(token);
        expect(actionList[1]).toEqual(actions.validateTokenSuccess(validateTokenResponse().email));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, false));
      });
    });

    it('should catch errors with service response', () => {
      const expiredToken = { response: { errors: { EXPIRED_TOKEN: ['expired token message'] } } };
      deps.apiService.validateToken = () => throwError(expiredToken);
      return runEpic(validateToken(ActionsObservable.of(actions.validateTokenStart(token)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(expiredToken));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, false, true, 'expired token message'));
      });
    });

    it('should catch errors default response', () => {
      deps.apiService.validateToken = () => throwError({ title: 'error title' });
      return runEpic(validateToken(ActionsObservable.of(actions.validateTokenStart(token)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ title: 'error title' }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, false, true, 'error title'));
      });
    });
  });

  describe('fetchClientUserListStart', () => {
    const id = getClient_1().id;

    it('should get epic for clients fetch user list', () => {
      return runEpic(fetchClientUserListStart(ActionsObservable.of(actions.fetchClientUserListStart(id, 1, 15)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, true));
        expect(deps.apiService.getClientUserList).toHaveBeenCalledWith({ id, limit: 15, page: 1 });
        expect(actionList[1]).toEqual(actions.fetchClientUserListSuccess(id, getClientUserPagination_1().items, getClientUserPagination_1().totalResults));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientUserList = () => throwError(error);
      return runEpic(fetchClientUserListStart(ActionsObservable.of(actions.fetchClientUserListStart(id, 1, 15)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, false, true, error));
      });
    });
  });

  describe('fetchClientUserListStart', () => {
    const id = getClient_1().id;

    it('should get epic for clients fetch user list', () => {
      return runEpic(fetchClientUserListStart(ActionsObservable.of(actions.fetchClientUserListStart(id, 1, 15)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, true));
        expect(deps.apiService.getClientUserList).toHaveBeenCalledWith({ id, limit: 15, page: 1 });
        expect(actionList[1]).toEqual(actions.fetchClientUserListSuccess(id, getClientUserPagination_1().items, getClientUserPagination_1().totalResults));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getClientUserList = () => throwError(error);
      return runEpic(fetchClientUserListStart(ActionsObservable.of(actions.fetchClientUserListStart(id, 1, 15)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, false, true, error));
      });
    });
  });

  describe('fetchProjectUserListStart', () => {
    it('should get epic for clients fetch user list', () => {
      return runEpic(
        fetchProjectUserListStart(ActionsObservable.of(actions.fetchProjectUserListStart(getProject_1().id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, true));
          expect(deps.apiService.getProjectUserList).toHaveBeenCalledWith({ id: getProject_1().id, query: {} });
          expect(actionList[1]).toEqual(
            actions.fetchProjectUserListSuccess(getProject_1().id, getProjectUserPagination_1().items, getProjectUserPagination_1().totalResults)
          );
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProjectUserList = () => throwError(error);
      return runEpic(
        fetchProjectUserListStart(ActionsObservable.of(actions.fetchProjectUserListStart(getProject_1().id, {})), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, false, true, error));
        }
      );
    });
  });

  describe('fetchUserProjectStart', () => {
    const id = getProject_1().id;

    it('should get epic for user fetch project user list', () => {
      return runEpic(
        fetchUserProjectStart(ActionsObservable.of(actions.fetchUserProjectListStart({ id, page: 1, limit: 15 })), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, true));
          expect(deps.apiService.getUserList).toHaveBeenCalledWith({ id, limit: 15, page: 1 });
          expect(actionList[1]).toEqual(generalState.actions.setModalMap(getUserPagination_1().items, getUserPagination_1().totalResults));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getUserList = () => throwError(error);
      return runEpic(fetchUserProjectStart(ActionsObservable.of(actions.fetchUserProjectListStart({} as any)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, false, true, error));
      });
    });
  });

  describe('fetchRoleListStart', () => {
    it('should get epic for user fetch role list', () => {
      return runEpic(fetchRoleListStart(ActionsObservable.of(actions.fetchRoleListStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, true));
        expect(deps.apiService.getUserRoles).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchRoleListSuccess([getUserRole_1()]));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getUserRoles = () => throwError(error);
      return runEpic(fetchRoleListStart(ActionsObservable.of(actions.fetchRoleListStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, false, true, error));
      });
    });
  });

  describe('saveUserStart', () => {
    it('should get epic for user fetch role list', () => {
      return runEpic(saveUserStart(ActionsObservable.of(actions.saveUserStart(getClient_1().id, getUser_1())), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, true));
        expect(deps.apiService.saveUser).toHaveBeenCalledWith(getClient_1().id, getUser_1());
        expect(actionList[1]).toEqual(actions.saveUserSuccess(getUser_1()));
        expect(actionList[2]).toEqual(generalState.actions.addToastStart('User created successfully!', GeneralModel.ToastType.SUCCESS));
        expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.saveUser = () => throwError({ title: 'error title', response: {} });
      return runEpic(saveUserStart(ActionsObservable.of(actions.saveUserStart(getClient_1().id, getUser_1())), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError({ title: 'error title', response: {} }));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, false, true, { title: 'error title', response: {} }));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('error title', GeneralModel.ToastType.ERROR));
      });
    });
  });

  describe('resetPasswordStart', () => {
    const email = 'email';

    it('should get epic for user reset password', () => {
      return runEpic(resetPassword(ActionsObservable.of(actions.resetPasswordStart(email)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.RESET_PASSWORD, true));
        expect(deps.apiService.resetPassword).toHaveBeenCalledWith(email);
        expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.RESET_PASSWORD, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.resetPassword = () => throwError(error);
      return runEpic(resetPassword(ActionsObservable.of(actions.resetPasswordStart(email)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.RESET_PASSWORD, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.RESET_PASSWORD, false, true, errorResponse));
      });
    });
  });

  describe('confirmResetPasswordStart', () => {
    const email = 'email';
    const token = 'token';
    const password = 'password';

    it('should get epic for user reset password', () => {
      return runEpic(
        confirmResetPassword(ActionsObservable.of(actions.confirmResetPasswordStart(token, email, password)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD, true));
          expect(deps.apiService.confirmResetPassword).toHaveBeenCalledWith(token, email, password);
          expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.confirmResetPassword = () => throwError(error);
      return runEpic(
        confirmResetPassword(ActionsObservable.of(actions.confirmResetPasswordStart(token, email, password)), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD, false, true, errorResponse));
        }
      );
    });
  });

  describe('changePasswordStart', () => {
    it('should get epic for user change password', () => {
      return runEpic(changePassword(ActionsObservable.of(actions.changePasswordStart('old', 'new')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CHANGE_PASSWORD, true));
        expect(deps.apiService.changePassword).toHaveBeenCalledWith('old', 'new');
        expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CHANGE_PASSWORD, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.changePassword = () => throwError(error);
      return runEpic(changePassword(ActionsObservable.of(actions.changePasswordStart('old', 'new')), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CHANGE_PASSWORD, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CHANGE_PASSWORD, false, true, errorResponse));
      });
    });
  });

  describe('updateProfileStart', () => {
    const data = getUserAccount_1();
    it('should get epic for user update profile', () => {
      return runEpic(updateProfileStart(ActionsObservable.of(actions.updateProfileStart(data)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, true));
        expect(deps.apiService.updateProfile).toHaveBeenCalledWith(data);
        expect(actionList[1]).toEqual(actions.fetchProfileDataSuccess(data));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, false));
      });
    });

    it('should get epic for user update profile for client admin', () => {
      return runEpic(updateProfileStart(ActionsObservable.of(actions.updateProfileStart(data)), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, true));
        expect(deps.apiService.updateCompanyUserProfile).toHaveBeenCalledWith(data);
        expect(actionList[1]).toEqual(actions.fetchProfileDataSuccess(data));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.updateProfile = () => throwError(error);
      return runEpic(updateProfileStart(ActionsObservable.of(actions.updateProfileStart(data)), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, false, true, errorResponse));
      });
    });
  });

  describe('fetchAccountStart', () => {
    it('should get epic for user fetch account', () => {
      return runEpic(fetchAccountStart(ActionsObservable.of(actions.fetchProfileDataStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, true));
        expect(deps.apiService.getAccount).toHaveBeenCalled();
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, false));
      });
    });

    it('should get epic for user fetch company user account', () => {
      return runEpic(fetchAccountStart(ActionsObservable.of(actions.fetchProfileDataStart()), stateMgmtClient as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, true));
        expect(deps.apiService.getCompanyUserAccount).toHaveBeenCalled();
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getAccount = () => throwError(error);
      return runEpic(fetchAccountStart(ActionsObservable.of(actions.fetchProfileDataStart()), stateMgmtAdmin as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, false, true, errorResponse));
      });
    });
  });

  describe('updateProfilePhotoStart', () => {
    it('should get epic for user update profile photo', () => {
      return runEpic(
        updateProfilePhotoStart(
          ActionsObservable.of(actions.updateProfilePhotoStart()),
          { ...stateMgmtAdmin, value: { file: { fileMap: { profilePhoto: {} } } } } as any,
          deps
        ),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE_PHOTO, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO)
          );
          expect(actionList[1]).toEqual(actions.uploadProfilePhotoStart(undefined));
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE_PHOTO, false));
        }
      );
    });
  });

  describe('uploadProfilePhotoStart', () => {
    it('should get epic for user upload profile photo', () => {
      return runEpic(
        uploadProfilePhotoStart(ActionsObservable.of(actions.uploadProfilePhotoStart(getUploadFile_1())), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO)
          );
          expect(deps.apiService.getProfilePhotoResource).toHaveBeenCalled();
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.getProfilePhotoResource = () => throwError(error);
      return runEpic(
        uploadProfilePhotoStart(ActionsObservable.of(actions.uploadProfilePhotoStart(getUploadFile_1())), stateMgmtAdmin as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO)
          );
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO, false, true, errorResponse));
        }
      );
    });
  });
});
