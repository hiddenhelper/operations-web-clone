import { AccessControlSystemModel, GeneralModel } from '../../models';

export enum ActionType {
  FETCH_ACCESS_CONTROL_SYSTEM_LIST_START = '[accessControlSystem] fetch accessControlSystem list start',
  FETCH_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS = '[accessControlSystem] fetch accessControlSystem list success',
  FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY_START = '[accessControlSystem] fetch accessControlSystem summary start',
  DELETE_ACCESS_CONTROL_SYSTEM_START = '[accessControlSystem] delete accessControlSystem start',
  SAVE_ACCESS_CONTROL_SYSTEM_START = '[accessControlSystem] save accessControlSystem start',
  UPDATE_ACCESS_CONTROL_SYSTEM_START = '[accessControlSystem] update accessControlSystem start',
  UPDATE_ACCESS_CONTROL_SYSTEM_SUCCESS = '[accessControlSystem] update access control system success',
  FETCH_ACCESS_CONTROL_SYSTEM_START = '[accessControlSystem] fetch access control system start',
  FETCH_ACCESS_CONTROL_SYSTEM_SUCCESS = '[accessControlSystem] fetch access control system success',
  CLEAR_ACCESS_CONTROL_SYSTEM_MAP = '[accessControlSystem] clear access control system map',
  FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_START = '[accessControlSystem] fetch project access control system list start',
  FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS = '[accessControlSystem] fetch project access control system list success',
  UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_START = '[accessControlSystem] update project access control system start',
  FETCH_ACCESS_CONTROL_SYSTEM_PROJECT_LIST_START = '[accessControlSystem] fetch access control system project list start',
  FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_START = '[accessControlSystem] fetch project access control system start',
  FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_SUCCESS = '[accessControlSystem] fetch project access control system success',
  UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS = '[accessControlSystem] unassign access control system project success',
}

export const actions = {
  fetchAccessControlSystemListStart: (query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_ACCESS_CONTROL_SYSTEM_LIST_START,
    payload: { query },
  }),
  fetchAccessControlSystemListSuccess: (list: Partial<AccessControlSystemModel.IAccessControlSystem>[], count: number) => ({
    type: ActionType.FETCH_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS,
    payload: { list, count },
  }),
  fetchAccessControlSystemSummaryStart: (id: string) => ({ type: ActionType.FETCH_ACCESS_CONTROL_SYSTEM_SUMMARY_START, payload: { id } }),
  deleteAccessControlSystemStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.DELETE_ACCESS_CONTROL_SYSTEM_START,
    payload: { id, query },
  }),
  saveAccessControlSystemStart: (accessControlSystem: AccessControlSystemModel.IAccessControlSystem) => ({
    type: ActionType.SAVE_ACCESS_CONTROL_SYSTEM_START,
    payload: { accessControlSystem },
  }),
  updateAccessControlSystemStart: (accessControlSystem: AccessControlSystemModel.IAccessControlSystem) => ({
    type: ActionType.UPDATE_ACCESS_CONTROL_SYSTEM_START,
    payload: { accessControlSystem },
  }),
  updateAccessControlSystemSuccess: (accessControlSystem: AccessControlSystemModel.IAccessControlSystem) => ({
    type: ActionType.UPDATE_ACCESS_CONTROL_SYSTEM_SUCCESS,
    payload: { accessControlSystem },
  }),
  fetchAccessControlSystemStart: (id: string) => ({ type: ActionType.FETCH_ACCESS_CONTROL_SYSTEM_START, payload: { id } }),
  fetchAccessControlSystemSuccess: (accessControlSystem: AccessControlSystemModel.IAccessControlSystem) => ({
    type: ActionType.FETCH_ACCESS_CONTROL_SYSTEM_SUCCESS,
    payload: { accessControlSystem },
  }),
  clearAccessControlSystemMap: () => ({ type: ActionType.CLEAR_ACCESS_CONTROL_SYSTEM_MAP, payload: {} }),
  fetchProjectAccessControlSystemListStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_START,
    payload: { id, query },
  }),
  fetchProjectAccessControlSystemListSuccess: (list: AccessControlSystemModel.IProjectAccessControlSystemByLocation[]) => ({
    type: ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS,
    payload: { list },
  }),
  updateProjectAccessControlSystemStart: (projectId: string, acsId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) => ({
    type: ActionType.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_START,
    payload: { projectId, acsId, acs },
  }),
  fetchAccessControlSystemProjectListStart: (query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_ACCESS_CONTROL_SYSTEM_PROJECT_LIST_START,
    payload: { query },
  }),
  fetchProjectAccessControlSystemStart: (projectId: string, acsId: string) => ({
    type: ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_START,
    payload: { projectId, acsId },
  }),
  fetchProjectAccessControlSystemSuccess: (accessControlSystem: AccessControlSystemModel.IProjectAccessControlSystem) => ({
    type: ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_SUCCESS,
    payload: { accessControlSystem },
  }),
  unassignAccessControlSystemProjectSuccess: (id: string) => ({
    type: ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS,
    payload: { id },
  }),
};
