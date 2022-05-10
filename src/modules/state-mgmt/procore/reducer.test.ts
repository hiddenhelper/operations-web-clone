import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';

describe('procore reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should be equal to the company', () => {
    const clients = [
      {
        company: {
          id: '123',
          name: 'foo',
        },
        status: 1,
        createdAt: '25/01/2021 10:00',
        numberOfProjects: 4,
      },
    ];
    expect(reducer(undefined, actions.getProcoreClientsSuccess(clients))).toEqual({ ...initialState, clients });
  });

  it('should return isConnected ActionType.PROCORE_STATUS_SUCCESS', () => {
    const status = { isConnected: false };
    expect(reducer(undefined, actions.getStatusProcoreSuccess(status))).toEqual({ ...initialState, status });
  });

  it('should return ActionType.CONNECT_PROCORE_SUCCESS', () => {
    const status = {
      isConnected: true,
    };
    expect(reducer(undefined, actions.connectProcoreSuccess(status))).toEqual({ ...initialState, status });
  });

  it('should return ActionType.DISCONNECT_PROCORE_SUCCESS', () => {
    const status = { isConnected: false };
    expect(reducer(undefined, actions.disconnectProcoreSuccess(status))).toEqual({ ...initialState, status });
  });

  it('should return ActionType.FETCH_PROCORE_PROJECTS_SUCCESS', () => {
    const projects = [];
    const clientId = '111';
    expect(reducer(undefined, actions.fetchProcoreProjectsSuccess(clientId, projects))).toEqual({
      ...initialState,
      procoreProjects: { clientId, projects },
    });
  });

  it('should return ActionType.FETCH_PROCORE_PROJECT_MAPPINGS_SUCCESS', () => {
    const mappings = [];
    const clientId = '111';
    expect(reducer(undefined, actions.fetchProcoreProjectMappingsSuccess(clientId, mappings))).toEqual({
      ...initialState,
      procoreProjectMappings: { clientId, mappings },
    });
  });

  it('should return ActionType.FETCH_PROCORE_VENDORS_SUCCESS', () => {
    const vendors = [];
    const clientId = '111';
    expect(reducer(undefined, actions.fetchProcoreVendorsSuccess(clientId, vendors))).toEqual({
      ...initialState,
      procoreVendors: { clientId, vendors },
    });
  });

  it('should return ActionType.FETCH_PROCORE_VENDOR_MAPPINGS_SUCCESS', () => {
    const mappings = [];
    const clientId = '111';
    expect(reducer(undefined, actions.fetchProcoreVendorMappingsSuccess(clientId, mappings))).toEqual({
      ...initialState,
      procoreVendorMappings: { clientId, mappings },
    });
  });

  it('should return ActionType.FETCH_PROCORE_REPORT_FREQUENCY_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProcoreReportFrequencySuccess({ reportingFrequency: 111 }))).toEqual({
      ...initialState,
      procoreReportFrequency: 111,
    });
  });

  it('should return ActionType.SAVE_PROCORE_REPORT_FREQUENCY_SUCCESS', () => {
    expect(reducer(undefined, actions.saveProcoreReportFrequencySuccess({ reportingFrequency: 111 }))).toEqual({
      ...initialState,
      procoreReportFrequency: 111,
    });
  });
});
