import { GeneralModel, ProjectModel, AccessControlSystemModel, BadgePrintingSystemModel, ConsentFormModel, WorkerModel } from '../../models';

export enum ActionType {
  FETCH_PROJECT_START = '[project] fetch project start',
  FETCH_DRAFT_PROJECT_START = '[project] fetch draft project start',
  FETCH_PROJECT_LIST_SUCCESS = '[project] fetch project list success',
  FETCH_PROJECT_LIST_START = '[project] fetch project list start',
  FETCH_PROJECT_SUMMARY_START = '[project] fetch project summary start',
  SAVE_PROJECT_START = '[project] save project start',
  SAVE_PROJECT_SUCCESS = '[project] save project success',
  UPDATE_DRAFT_PROJECT_START = '[project] update draft project start',
  UPDATE_DRAFT_PROJECT_SUCCESS = '[project] update draft project success',
  UPDATE_PROJECT_START = '[project] update project start',
  UPDATE_PROJECT_SUCCESS = '[project] update project success',
  FETCH_PROJECT_CATEGORY_START = '[project] fetch category list success',
  FETCH_PROJECT_CATEGORY_SUCCESS = '[project] fetch category list start',
  FETCH_PROJECT_REGION_START = '[project] fetch region list success',
  FETCH_PROJECT_REGION_SUCCESS = '[project] fetch region list start',
  FETCH_PROJECT_FCANAE_START = '[project] fetch fca-nae list success',
  FETCH_PROJECT_FCANAE_SUCCESS = '[project] fetch fca-nae list start',
  FETCH_CLIENT_PROJECT_LIST_START = '[project] project by client id list start',
  FETCH_CLIENT_PROJECT_LIST_SUCCESS = '[project] project by client id list success',
  CLEAR_PROJECT_MAP = '[project] clear map',
  SEND_FOR_APPROVE_PROJECT_START = '[project] send for approve project start',
  APPROVE_PROJECT_START = '[project] approve project start',
  FETCH_BILLING_TIER_START = '[project] fetch billing tier start',
  FETCH_BILLING_TIER_SUCCESS = '[project] fetch billing tier success',
  ASSOCIATE_ACCESS_CONTROL_SYSTEM_PROJECT = '[project] associate access control system project',
  ASSOCIATE_BADGE_PRINTING_SYSTEM_PROJECT = '[project] associate badge printing system project',
  DELETE_PROJECT_START = '[project] delete project start',
  ASSIGN_CLIENT_PROJECT_START = '[project] assign client project start',
  ASSIGN_CLIENT_PROJECT_SUCCESS = '[project] assign client project success',
  ARCHIVE_PROJECT_START = '[project] archive project start',
  ARCHIVE_PROJECT_SUCCESS = '[project] archive project success',
  UNARCHIVE_PROJECT_START = '[project] unarchive project start',
  UNARCHIVE_PROJECT_SUCCESS = '[project] unarchive project success',
  ASSIGN_USER_PROJECT_START = '[project] assign user project start',
  ASSIGN_USER_PROJECT_SUCCESS = '[project] assign user project success',
  ACCEPT_PROJECT_START = '[project] accept project start',
  ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_START = '[project] assign access control system project start',
  ASSIGN_WORKER_PROJECT_START = '[project] assign worker project start',
  ASSIGN_WORKER_PROJECT_SUCCESS = '[project] assign worker project success',
  UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_START = '[project] unassign access control system project start',
  UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS = '[project] unassign access control system project success',
  UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_START = '[project] unassign badge printing system project start',
  UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_SUCCESS = '[project] unassign badge printing system project success',
  ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_START = '[project] assign badge printing system project start',
  ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_SUCCESS = '[project] assign badge printing system project success',
  FETCH_WORKER_PROJECT_LIST_START = '[project] fetch worker project list start',
  FETCH_WORKER_PROJECT_LIST_SUCCESS = '[project] fetch worker project list success',
  FETCH_CONSENT_FORM_FIELDS_START = '[project] fetch consent form fields start',
  FETCH_CONSENT_FORM_FIELDS_SUCCESS = '[project] fetch consent form fields success',
  ADD_PROJECT_BADGES_START = '[project] add project badges start',
  ADD_PROJECT_BADGES_SUCCESS = '[project] add project badges success',
  UPLOAD_PROJECT_BADGES_START = '[project] upload project badges start',
  FETCH_BADGE_VISITOR_ENTITY_LIST_START = '[project] fetch badge visitor entity list start',
  FETCH_BADGE_VISITOR_ENTITY_LIST_SUCCESS = '[project] fetch badge visitor entity list success',
  SEARCH_PROJECT_START = '[project] search project start',
  UPDATE_PROJECT_PAYMENT_METHOD_START = '[project] update project payment method start',
  UPDATE_CURRENT_FILTER = '[project] update current filter',
}

export const actions = {
  fetchProjectStart: (id: string) => ({ type: ActionType.FETCH_PROJECT_START, payload: { id } }),
  fetchDraftProjectStart: (id: string) => ({ type: ActionType.FETCH_DRAFT_PROJECT_START, payload: { id } }),
  fetchProjectListStart: (query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_PROJECT_LIST_START, payload: { query } }),
  fetchProjectListSuccess: (list: Partial<ProjectModel.IProject>[], count: number) => ({
    type: ActionType.FETCH_PROJECT_LIST_SUCCESS,
    payload: { list, count },
  }),
  fetchProjectSummaryStart: (id: string) => ({ type: ActionType.FETCH_PROJECT_SUMMARY_START, payload: { id } }),
  acceptProjectInvitationStart: (id: string, paymentMethodId: string) => ({ type: ActionType.ACCEPT_PROJECT_START, payload: { id, paymentMethodId } }),
  saveProjectStart: (project: Partial<ProjectModel.IProject>, stepKey: string) => ({
    type: ActionType.SAVE_PROJECT_START,
    payload: { project, stepKey },
  }),
  saveProjectSuccess: (project: ProjectModel.IProject) => ({ type: ActionType.SAVE_PROJECT_SUCCESS, payload: { project } }),
  updateDraftProjectStart: (project: Partial<ProjectModel.IProject>) => ({ type: ActionType.UPDATE_DRAFT_PROJECT_START, payload: { project } }),
  updateProjectStart: (project: Partial<ProjectModel.IProject>) => ({ type: ActionType.UPDATE_PROJECT_START, payload: { project } }),
  updateProjectSuccess: (project: ProjectModel.IProject) => ({ type: ActionType.UPDATE_PROJECT_SUCCESS, payload: { project } }),
  fetchCategoryListStart: () => ({ type: ActionType.FETCH_PROJECT_CATEGORY_START, payload: {} }),
  fetchCategoryListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_PROJECT_CATEGORY_SUCCESS, payload: { list } }),
  fetchRegionListStart: () => ({ type: ActionType.FETCH_PROJECT_REGION_START, payload: {} }),
  fetchRegionListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_PROJECT_REGION_SUCCESS, payload: { list } }),
  fetchNaeListStart: () => ({ type: ActionType.FETCH_PROJECT_FCANAE_START, payload: {} }),
  fetchNaeListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_PROJECT_FCANAE_SUCCESS, payload: { list } }),
  fetchClientProjectListStart: (id: string, query: GeneralModel.IQueryParams) => ({ type: ActionType.FETCH_CLIENT_PROJECT_LIST_START, payload: { id, query } }),
  fetchClientProjectListSuccess: (clientId: string, list: Partial<ProjectModel.IProject>[], count: number) => ({
    type: ActionType.FETCH_CLIENT_PROJECT_LIST_SUCCESS,
    payload: { clientId, list, count },
  }),
  fetchBillingTierListStart: () => ({ type: ActionType.FETCH_BILLING_TIER_START, payload: {} }),
  fetchBillingTierListSuccess: (list: ProjectModel.IBillingTier[]) => ({ type: ActionType.FETCH_BILLING_TIER_SUCCESS, payload: { list } }),
  associateAccessControlSystemProject: (id: string, list: Partial<AccessControlSystemModel.IProjectAccessControlSystemByLocation>[]) => ({
    type: ActionType.ASSOCIATE_ACCESS_CONTROL_SYSTEM_PROJECT,
    payload: { id, list },
  }),
  associateBadgePrintingSystemProject: (id: string, list: Partial<BadgePrintingSystemModel.IBadgePrintingSystem>[]) => ({
    type: ActionType.ASSOCIATE_BADGE_PRINTING_SYSTEM_PROJECT,
    payload: { id, list },
  }),
  clearProjectMap: () => ({ type: ActionType.CLEAR_PROJECT_MAP, payload: {} }),
  sendApproveProjectStart: (id: string) => ({ type: ActionType.SEND_FOR_APPROVE_PROJECT_START, payload: { id } }),
  approveProjectStart: (id: string) => ({ type: ActionType.APPROVE_PROJECT_START, payload: { id } }),
  deleteProjectStart: (id: string, query: GeneralModel.IQueryParams) => ({ type: ActionType.DELETE_PROJECT_START, payload: { id, query } }),
  assignClientProjectStart: (id: string, list: ProjectModel.IAssignClientProject[], sponsorId: string) => ({
    type: ActionType.ASSIGN_CLIENT_PROJECT_START,
    payload: { id, list, sponsorId },
  }),
  assignClientProjectSuccess: (list: ProjectModel.IAssignClientProject[]) => ({
    type: ActionType.ASSIGN_CLIENT_PROJECT_SUCCESS,
    payload: { list },
  }),
  archiveProjectStart: (id: string) => ({ type: ActionType.ARCHIVE_PROJECT_START, payload: { id } }),
  archiveProjectSuccess: (id: string) => ({ type: ActionType.ARCHIVE_PROJECT_SUCCESS, payload: { id } }),
  unarchiveProjectStart: (id: string) => ({ type: ActionType.UNARCHIVE_PROJECT_START, payload: { id } }),
  unarchiveProjectSuccess: (id: string) => ({ type: ActionType.UNARCHIVE_PROJECT_SUCCESS, payload: { id } }),
  assignUserProjectStart: (id: string, list: ProjectModel.IProjectAssignUser[]) => ({
    type: ActionType.ASSIGN_USER_PROJECT_START,
    payload: { id, list },
  }),
  assignUserProjectSuccess: (list: ProjectModel.IProjectAssignUser[]) => ({
    type: ActionType.ASSIGN_USER_PROJECT_SUCCESS,
    payload: { list },
  }),
  assignAcsProjectStart: (projectId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) => ({
    type: ActionType.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_START,
    payload: { projectId, acs },
  }),
  assignBadgePrintingProjectStart: (projectId: string, list: BadgePrintingSystemModel.IBadgePrintingSystemUpdateDate[]) => ({
    type: ActionType.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_START,
    payload: { projectId, list },
  }),
  assignBadgePrintingProjectSuccess: (list: { id: string; date: string }[]) => ({
    type: ActionType.ASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_SUCCESS,
    payload: { list },
  }),
  assignWorkerProjectStart: (projectId: string, list: Partial<WorkerModel.IWorker>[]) => ({
    type: ActionType.ASSIGN_WORKER_PROJECT_START,
    payload: { projectId, list },
  }),
  assignWorkerProjectSuccess: (list: string[]) => ({ type: ActionType.ASSIGN_WORKER_PROJECT_SUCCESS, payload: { list } }),
  unAssignAccessControlSystemStart: (projectId: string, acsId: string) => ({
    type: ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_START,
    payload: { projectId, acsId },
  }),
  unAssignAccessControlSystemSuccess: (projectId: string, acsId: string) => ({
    type: ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS,
    payload: { projectId, acsId },
  }),
  unAssignBadgePrintingSystemStart: (projectId: string, id: string) => ({
    type: ActionType.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_START,
    payload: { projectId, id },
  }),
  unAssignBadgePrintingSystemSuccess: (projectId: string, bpsId: string) => ({
    type: ActionType.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_SUCCESS,
    payload: { projectId, bpsId },
  }),
  fetchWorkerProjectListStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKER_PROJECT_LIST_START,
    payload: { id, query },
  }),
  fetchWorkerProjectListSuccess: (list: ProjectModel.IWorkerProject[], count: number, workerId: string) => ({
    type: ActionType.FETCH_WORKER_PROJECT_LIST_SUCCESS,
    payload: { list, count, workerId },
  }),
  fetchConsentFormFieldsStart: () => ({ type: ActionType.FETCH_CONSENT_FORM_FIELDS_START, payload: {} }),
  fetchConsentFormFieldsSuccess: (list: ConsentFormModel.IConsentFormField[]) => ({ type: ActionType.FETCH_CONSENT_FORM_FIELDS_SUCCESS, payload: { list } }),
  addProjectBadgesStart: (projectId: string, files: string[]) => ({
    type: ActionType.ADD_PROJECT_BADGES_START,
    payload: { projectId, files },
  }),
  addProjectBadgesSuccess: () => ({
    type: ActionType.ADD_PROJECT_BADGES_SUCCESS,
    payload: {},
  }),
  uploadProjectBadgesStart: (projectId: string, uploadIdList: string[], fileMap: object) => ({
    type: ActionType.UPLOAD_PROJECT_BADGES_START,
    payload: { projectId, uploadIdList, fileMap },
  }),
  fetchBadgeVisitorEntityListStart: (id: string) => ({ type: ActionType.FETCH_BADGE_VISITOR_ENTITY_LIST_START, payload: { id } }),
  fetchBadgeVisitorEntityListSuccess: (list: string[]) => ({ type: ActionType.FETCH_BADGE_VISITOR_ENTITY_LIST_SUCCESS, payload: { list } }),
  searchProjectStart: (query: GeneralModel.IQueryParams, uiRelationId?: string) => ({
    type: ActionType.SEARCH_PROJECT_START,
    payload: { query, uiRelationId },
  }),
  updateProjectPaymentMethodStart: (projectId: string, paymentMethodId: string) => ({
    type: ActionType.UPDATE_PROJECT_PAYMENT_METHOD_START,
    payload: { projectId, paymentMethodId },
  }),
  updateCurrentFilter: (filter: string) => ({
    type: ActionType.UPDATE_CURRENT_FILTER,
    payload: { filter },
  }),
};
