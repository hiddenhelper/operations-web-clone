import { ActionType } from './actions';
import { initialState, IState } from './state';
import { preloadProject } from '../../../utils/projectUtils';
import { ResourceModel } from '../../models';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.FETCH_PROJECT_LIST_SUCCESS:
      return { ...state, projectMap: payload.list.reduce((total, item) => ({ ...total, [item.id]: preloadProject(item) }), {}), count: payload.count };
    case ActionType.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projectMap: {
          ...state.projectMap,
          [payload.project.id]: { ...state.projectMap[payload.project.id], ...preloadProject({ ...state.projectMap[payload.project.id], ...payload.project }) },
        },
      };
    case ActionType.FETCH_PROJECT_CATEGORY_SUCCESS:
      return { ...state, categoryList: payload.list };
    case ActionType.FETCH_PROJECT_REGION_SUCCESS:
      return { ...state, regionList: payload.list };
    case ActionType.FETCH_PROJECT_FCANAE_SUCCESS:
      return { ...state, fcaNaeList: payload.list };
    case ActionType.FETCH_BILLING_TIER_SUCCESS:
      return { ...state, billingTierList: payload.list };
    case ActionType.CLEAR_PROJECT_MAP:
      return { ...state, projectMap: {}, projectClientMap: {}, projectWorkerMap: {}, count: null };
    case ActionType.ASSOCIATE_ACCESS_CONTROL_SYSTEM_PROJECT:
      return {
        ...state,
        projectMap: {
          ...state.projectMap,
          [payload.id]: {
            ...state.projectMap[payload.id],
            acsIdListByLocation: payload.list.map(item => ({
              location: item.location,
              accessControlSystems: item.accessControlSystems.map(acs => acs.id),
            })),
          },
        },
      };
    case ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS:
      return {
        ...state,
        projectMap: {
          ...state.projectMap,
          [payload.projectId]: {
            ...state.projectMap[payload.projectId],
            acsIdListByLocation: state.projectMap[payload.projectId].acsIdListByLocation.reduce((total, acsByLocation) => {
              const isAcsInLocation = acsByLocation.accessControlSystems.find(acsId => acsId === payload.acsId);
              if (isAcsInLocation) {
                // If it was the only ACS on the location, skip it
                if (acsByLocation.accessControlSystems.length === 1) {
                  return total;
                } else {
                  // Remove the ACS from location
                  total.push({
                    location: acsByLocation.location,
                    accessControlSystems: acsByLocation.accessControlSystems.filter(acsId => acsId !== payload.acsId),
                  });
                  return total;
                }
              } else {
                // add location withouth changes
                total.push(acsByLocation);
                return total;
              }
            }, []),
          },
        },
      };
    case ActionType.ASSOCIATE_BADGE_PRINTING_SYSTEM_PROJECT:
      return {
        ...state,
        projectMap: {
          ...state.projectMap,
          [payload.id]: { ...state.projectMap[payload.id], bpsIdList: payload.list.map(item => item.id) },
        },
      };
    case ActionType.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_SUCCESS:
      return {
        ...state,
        projectMap: {
          ...state.projectMap,
          [payload.projectId]: {
            ...state.projectMap[payload.projectId],
            bpsIdList: state.projectMap[payload.projectId].bpsIdList.filter(item => item !== payload.bpsId),
          },
        },
      };
    case ActionType.ARCHIVE_PROJECT_SUCCESS:
      return { ...state, projectMap: { ...state.projectMap, [payload.id]: { ...state.projectMap[payload.id], status: ResourceModel.Status.ARCHIVED } } };
    case ActionType.UNARCHIVE_PROJECT_SUCCESS:
      return { ...state, projectMap: { ...state.projectMap, [payload.id]: { ...state.projectMap[payload.id], status: ResourceModel.Status.ACTIVE } } };
    case ActionType.FETCH_CLIENT_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        projectClientMap: { [payload.clientId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_WORKER_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        projectWorkerMap: { [payload.workerId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
        count: payload.count,
      };
    case ActionType.FETCH_CONSENT_FORM_FIELDS_SUCCESS:
      return { ...state, consentFormFields: payload.list };
    case ActionType.FETCH_BADGE_VISITOR_ENTITY_LIST_SUCCESS:
      return { ...state, badgeVisitorEntityList: payload.list };
    default:
      return state;
  }
};
