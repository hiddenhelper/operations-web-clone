import { Epic, ofType } from 'redux-observable';
import { of, concat, EMPTY } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { ToastType } from '../../models/general';
import { GENERAL } from '../../../constants';
import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';
import { generalState } from '../general';
import { handleError, handleToastError } from '../core/operators';
import { fileState } from '../file';
import { UserModel } from '../../models';

export const userSignUp: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SIGN_UP_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, true)),
        deps.apiService.createAccount(payload.token, payload.password).pipe(mergeMap(() => EMPTY)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, false))
      ).pipe(catchError(error => of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.AUTH_SIGN_UP, false, true, error))))
    )
  );

export const validateToken: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.VALIDATE_TOKEN_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, true)),
        deps.apiService.validateToken(payload.token).pipe(mergeMap(res => of(actions.validateTokenSuccess(res.email)))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.VALIDATE_TOKEN, false))
      ).pipe(
        catchError(error => {
          return of(
            coreState.actions.epicError(error),
            generalState.actions.setLoading(
              GENERAL.LOADING_KEY.VALIDATE_TOKEN,
              false,
              true,
              error.response?.errors?.EXPIRED_TOKEN ? error.response.errors.EXPIRED_TOKEN[0] : error.title
            )
          );
        })
      )
    )
  );

export const fetchClientUserListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_CLIENT_USER_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, true)),
        deps.apiService.getClientUserList(payload).pipe(map(res => actions.fetchClientUserListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_CLIENT_USER_LIST, false, true, error))
        )
      )
    )
  );

export const fetchProjectUserListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_PROJECT_USER_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, true)),
        deps.apiService.getProjectUserList(payload).pipe(map(res => actions.fetchProjectUserListSuccess(payload.id, res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_USER_LIST, false, true, error))
        )
      )
    )
  );

export const fetchUserProjectStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_USER_PROJECT_LIST_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, true)),
        deps.apiService.getUserList(payload.query).pipe(map(res => generalState.actions.setModalMap(res.items, res.totalResults))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROJECT_LIST, false, true, error))
        )
      )
    )
  );

export const fetchRoleListStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_USER_ROLE_LIST_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, true)),
        deps.apiService.getUserRoles().pipe(map(res => actions.fetchRoleListSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_ROLE_LIST, false, true, error))
        )
      )
    )
  );

export const fetchGroupSearchStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_GROUP_SEARCH_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROUP_SEARCH_LIST, true)),
        deps.apiService.getGroupList(payload.query).pipe(map(res => actions.fetchGroupSearchSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROUP_SEARCH_LIST, false))
      ).pipe(
        catchError(error =>
          of(coreState.actions.epicError(error), generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_GROUP_SEARCH_LIST, false, true, error))
        )
      )
    )
  );

export const saveUserStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SAVE_USER_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, true)),
        deps.apiService
          .saveUser(payload.companyId, payload.user)
          .pipe(mergeMap(res => [actions.saveUserSuccess(res), generalState.actions.addToastStart(`User created successfully!`, ToastType.SUCCESS)])),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, false))
      ).pipe(
        catchError(error =>
          [
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_USER, false, true, error),
            error.response && !error.response.errors && generalState.actions.addToastStart(error.title, ToastType.ERROR),
          ].filter(Boolean)
        )
      )
    )
  );

export const resetPassword: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.RESET_PASSWORD_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.RESET_PASSWORD, true)),
        deps.apiService.resetPassword(payload.email).pipe(mergeMap(() => EMPTY)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.RESET_PASSWORD, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.RESET_PASSWORD))
    )
  );

export const confirmResetPassword: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.CONFIRM_RESET_PASSWORD_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD, true)),
        deps.apiService.confirmResetPassword(payload.token, payload.email, payload.password).pipe(mergeMap(() => EMPTY)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD))
    )
  );

export const changePassword: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.CHANGE_PASSWORD_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CHANGE_PASSWORD, true)),
        deps.apiService.changePassword(payload.currentPassword, payload.newPassword).pipe(mergeMap(() => EMPTY)),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.CHANGE_PASSWORD, false)),
        of(generalState.actions.addToastStart(`Password changed successfully!`, ToastType.SUCCESS))
      ).pipe(handleError(GENERAL.LOADING_KEY.CHANGE_PASSWORD))
    )
  );

export const updateProfileStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROFILE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, true)),
        (state$.value.auth.role === UserModel.Role.FCA_ADMIN
          ? deps.apiService.updateProfile(payload.data)
          : deps.apiService.updateCompanyUserProfile(payload.data)
        ).pipe(map(() => actions.fetchProfileDataSuccess(payload.data))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE, false)),
        of(generalState.actions.addToastStart(`Profile updated successfully!`, ToastType.SUCCESS))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPDATE_PROFILE))
    )
  );

export const fetchAccountStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_ACCOUNT_DATA_START),
    mergeMap(() =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, true)),
        (state$.value.auth.role === UserModel.Role.FCA_ADMIN ? deps.apiService.getAccount() : deps.apiService.getCompanyUserAccount()).pipe(
          map(res => actions.fetchProfileDataSuccess(res))
        ),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_ACCOUNT, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_ACCOUNT))
    )
  );

export const updateProfilePhotoStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_PROFILE_PHOTO_START),
    mergeMap(({ payload }) => {
      const file = Object.values(state$?.value?.file?.fileMap?.profilePhoto)[0];
      return [
        generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE_PHOTO, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO),
        actions.uploadProfilePhotoStart(file),
        actions.updateProfilePhotoSuccess(),
        generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_PROFILE_PHOTO, false),
      ];
    })
  );

export const uploadProfilePhotoStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPLOAD_PROFILE_PHOTO_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO, true, false, undefined, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO)),
        deps.apiService
          .getProfilePhotoResource(payload.file.file.name)
          .pipe(map(response => fileState.actions.uploadFileStart(payload.file, response.url, response.fileId, GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO, false))
      ).pipe(handleToastError(GENERAL.LOADING_KEY.UPLOAD_PROFILE_PHOTO))
    )
  );

export const fetchUserProfileStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_USER_PROFILE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROFILE, true)),
        deps.apiService.getCompanyUser(payload.companyId, payload.companyUserId).pipe(map(res => actions.fetchUserProfileSuccess(res))),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_USER_PROFILE, false))
      ).pipe(handleError(GENERAL.LOADING_KEY.FETCH_USER_PROFILE))
    )
  );

export const updateUserProfileStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.UPDATE_USER_PROFILE_START),
    mergeMap(({ payload }) =>
      concat(
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_USER, true)),
        deps.apiService
          .updateCompanyUser(payload.companyId, payload.companyUserId, payload.user)
          .pipe(mergeMap(res => [actions.updateUserProfileSuccess(res), generalState.actions.addToastStart(`User updated successfully!`, ToastType.SUCCESS)])),
        of(generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_USER, false))
      ).pipe(
        catchError(error =>
          [
            coreState.actions.epicError(error),
            generalState.actions.setLoading(GENERAL.LOADING_KEY.UPDATE_USER, false, true, error),
            error.response && !error.response.errors && generalState.actions.addToastStart(error.title, ToastType.ERROR),
          ].filter(Boolean)
        )
      )
    )
  );

export const epics = [
  userSignUp,
  validateToken,
  resetPassword,
  fetchClientUserListStart,
  fetchProjectUserListStart,
  fetchGroupSearchStart,
  fetchUserProjectStart,
  fetchRoleListStart,
  saveUserStart,
  confirmResetPassword,
  changePassword,
  updateProfileStart,
  fetchAccountStart,
  updateProfilePhotoStart,
  uploadProfilePhotoStart,
  fetchUserProfileStart,
  updateUserProfileStart,
];
