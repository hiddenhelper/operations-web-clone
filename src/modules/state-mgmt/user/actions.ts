import { GeneralModel, UserModel } from '../../models';

export enum ActionType {
  SIGN_UP_START = '[user] sign up start',
  VALIDATE_TOKEN_START = '[user] validate token start',
  VALIDATE_TOKEN_SUCCESS = '[user] validate token success',
  FETCH_CLIENT_USER_LIST_START = '[user] user by client id list start',
  FETCH_CLIENT_USER_LIST_SUCCESS = '[user] user by client id list success',
  FETCH_PROJECT_USER_LIST_START = '[user] project user list start',
  FETCH_PROJECT_USER_LIST_SUCCESS = '[user] project user list success',
  FETCH_USER_LIST_SUCCESS = '[user] user list success',
  FETCH_USER_PROJECT_LIST_START = '[user] user project list start',
  FETCH_USER_ROLE_LIST_START = '[user] user role list start',
  FETCH_USER_ROLE_LIST_SUCCESS = '[user] user role list success',
  SAVE_USER_START = '[user] save user start',
  SAVE_USER_SUCCESS = '[user] save user success',
  RESET_PASSWORD_START = '[user] reset password start',
  CONFIRM_RESET_PASSWORD_START = '[user] confirm reset password start',
  CLEAR_USER_MAP = '[user] clear user map',
  CHANGE_PASSWORD_START = '[user] change password start',
  CHANGE_PASSWORD_SUCCESS = '[user] change password success',
  UPDATE_PROFILE_START = '[user] update profile start',
  FETCH_ACCOUNT_DATA_START = '[user] fetch account data start',
  FETCH_ACCOUNT_DATA_SUCCESS = '[user] fetch account data success',
  UPDATE_PROFILE_PHOTO_START = '[user] update profile photo start',
  UPLOAD_PROFILE_PHOTO_START = '[user] upload profile photo start',
  UPDATE_PROFILE_PHOTO_SUCCESS = '[user] update profile photo success',
  CLEAR_ACCOUNT_DATA = '[user] clear account data',
  FETCH_GROUP_SEARCH_START = '[user] fetch group search start',
  FETCH_GROUP_SEARCH_SUCCESS = '[user] fetch group search success',
  FETCH_USER_PROFILE_START = '[user] fetch user profile start',
  FETCH_USER_PROFILE_SUCCESS = '[user] fetch user profile success',
  UPDATE_USER_PROFILE_START = '[user] update user profile start',
  UPDATE_USER_PROFILE_SUCCESS = '[user] update user profile success',
}

export const actions = {
  signUpStart: (token: string, password: string) => ({ type: ActionType.SIGN_UP_START, payload: { token, password } }),
  validateTokenStart: (token: string) => ({ type: ActionType.VALIDATE_TOKEN_START, payload: { token } }),
  validateTokenSuccess: (email: string) => ({ type: ActionType.VALIDATE_TOKEN_SUCCESS, payload: { email } }),
  fetchUserListSuccess: (list: Partial<UserModel.IUser>[], count: number) => ({ type: ActionType.FETCH_USER_LIST_SUCCESS, payload: { list, count } }),
  fetchClientUserListStart: (id: string, page: number, limit: number) => ({
    type: ActionType.FETCH_CLIENT_USER_LIST_START,
    payload: { id, page, limit },
  }),
  fetchClientUserListSuccess: (clientId: string, list: Partial<UserModel.IUser>[], count: number) => ({
    type: ActionType.FETCH_CLIENT_USER_LIST_SUCCESS,
    payload: { clientId, list, count },
  }),
  fetchProjectUserListStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECT_USER_LIST_START,
    payload: { id, query },
  }),
  fetchProjectUserListSuccess: (projectId, list: Partial<UserModel.IUser>[], count: number) => ({
    type: ActionType.FETCH_PROJECT_USER_LIST_SUCCESS,
    payload: { projectId, list, count },
  }),
  fetchUserProjectListStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_USER_PROJECT_LIST_START, payload: { query } }),
  fetchRoleListStart: () => ({ type: ActionType.FETCH_USER_ROLE_LIST_START, payload: {} }),
  fetchRoleListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_USER_ROLE_LIST_SUCCESS, payload: { list } }),
  saveUserStart: (companyId: string, user: UserModel.IUser) => ({ type: ActionType.SAVE_USER_START, payload: { companyId, user } }),
  saveUserSuccess: (user: UserModel.IUser) => ({ type: ActionType.SAVE_USER_SUCCESS, payload: { user } }),
  resetPasswordStart: (email: string) => ({ type: ActionType.RESET_PASSWORD_START, payload: { email } }),
  changePasswordStart: (currentPassword: string, newPassword: string) => ({
    type: ActionType.CHANGE_PASSWORD_START,
    payload: { currentPassword, newPassword },
  }),
  confirmResetPasswordStart: (token: string, email: string, password: string) => ({
    type: ActionType.CONFIRM_RESET_PASSWORD_START,
    payload: { email, token, password },
  }),
  updateProfileStart: data => ({ type: ActionType.UPDATE_PROFILE_START, payload: { data } }),
  updateProfilePhotoStart: () => ({ type: ActionType.UPDATE_PROFILE_PHOTO_START, payload: {} }),
  uploadProfilePhotoStart: file => ({ type: ActionType.UPLOAD_PROFILE_PHOTO_START, payload: { file } }),
  updateProfilePhotoSuccess: () => ({ type: ActionType.UPDATE_PROFILE_PHOTO_SUCCESS, payload: {} }),
  fetchProfileDataStart: () => ({ type: ActionType.FETCH_ACCOUNT_DATA_START, payload: {} }),
  fetchProfileDataSuccess: (data: UserModel.IAccount) => ({ type: ActionType.FETCH_ACCOUNT_DATA_SUCCESS, payload: { data } }),
  fetchGroupSearchStart: query => ({ type: ActionType.FETCH_GROUP_SEARCH_START, payload: { query } }),
  fetchGroupSearchSuccess: data => ({ type: ActionType.FETCH_GROUP_SEARCH_SUCCESS, payload: { data } }),
  clearUserMap: () => ({ type: ActionType.CLEAR_USER_MAP, payload: {} }),
  clearAccountData: () => ({ type: ActionType.CLEAR_ACCOUNT_DATA, payload: {} }),
  fetchUserProfileStart: (companyId: string, companyUserId: string) => ({ type: ActionType.FETCH_USER_PROFILE_START, payload: { companyId, companyUserId } }),
  fetchUserProfileSuccess: (data: UserModel.IAccount) => ({ type: ActionType.FETCH_USER_PROFILE_SUCCESS, payload: { data } }),
  updateUserProfileStart: (companyId: string, companyUserId: string, user: UserModel.IAccount) => ({
    type: ActionType.UPDATE_USER_PROFILE_START,
    payload: { companyId, companyUserId, user },
  }),
  updateUserProfileSuccess: (data: UserModel.IAccount) => ({ type: ActionType.UPDATE_USER_PROFILE_SUCCESS, payload: { data } }),
};
