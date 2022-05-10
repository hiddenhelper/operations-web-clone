import { ActionType } from './actions';
import { initialState, IProcoreState } from './state';

export const reducer = (state: IProcoreState = initialState, { type, payload }: { type: ActionType; payload?: any }): IProcoreState => {
  switch (type) {
    case ActionType.FETCH_PROCORE_CLIENTS_SUCCESS:
      return { ...state, clients: payload };

    case ActionType.PROCORE_STATUS_SUCCESS:
      return { ...state, status: payload };

    case ActionType.CONNECT_PROCORE_SUCCESS:
      return { ...state, status: payload };

    case ActionType.DISCONNECT_PROCORE_SUCCESS:
      return { ...state, status: payload };

    case ActionType.FETCH_PROCORE_PROJECTS_SUCCESS:
      return { ...state, procoreProjects: payload };

    case ActionType.FETCH_PROCORE_PROJECT_MAPPINGS_SUCCESS:
      return { ...state, procoreProjectMappings: payload };

    case ActionType.FETCH_PROCORE_VENDORS_SUCCESS:
      return { ...state, procoreVendors: payload };

    case ActionType.FETCH_PROCORE_VENDOR_MAPPINGS_SUCCESS:
      return { ...state, procoreVendorMappings: payload };

    case ActionType.FETCH_PROCORE_REPORT_FREQUENCY_SUCCESS: {
      return { ...state, procoreReportFrequency: payload.frequency.reportingFrequency };
    }
    case ActionType.SAVE_PROCORE_REPORT_FREQUENCY_SUCCESS: {
      return { ...state, procoreReportFrequency: payload.frequency.reportingFrequency };
    }

    default:
      return state;
  }
};
