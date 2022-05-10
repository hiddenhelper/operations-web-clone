import { ActionType } from './actions';
import { initialState, IState } from './state';
import { preloadProject } from '../../../utils/projectUtils';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.REVIEW_MODE:
      return { ...state, reviewMode: payload.reviewMode };
    case ActionType.FETCH_PROJECT_CATEGORY_SUCCESS:
      return { ...state, categoryList: payload.list };
    case ActionType.FETCH_PROJECT_REGION_SUCCESS:
      return { ...state, regionList: payload.list };
    case ActionType.FETCH_PROJECT_FCANAE_SUCCESS:
      return { ...state, fcaNaeList: payload.list };
    case ActionType.FETCH_BILLING_TIER_SUCCESS:
      return { ...state, billingTierList: payload.list };
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
    case ActionType.FETCH_CONSENT_FORM_FIELDS_SUCCESS:
      return { ...state, consentFormFields: payload.list };
    default:
      return state;
  }
};
