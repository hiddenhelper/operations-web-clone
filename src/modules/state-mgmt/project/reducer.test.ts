import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import {
  getProject_1,
  getAccessControlSystemDevice_1,
  getBadgePrinterSystem_1,
  getBadgePrinterSystem_2,
  getClient_1,
  getWorker_1,
  getConsentFormFieldConfigs,
  getAccessControlSystemDevice_2,
} from '../../../test/entities';

describe('project reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on project ActionType.FETCH_PROJECT_LIST_SUCCESS', () => {
    const count = 1;
    expect(reducer(undefined, actions.fetchProjectListSuccess([getProject_1()], count))).toEqual({
      ...initialState,
      projectMap: { [getProject_1().id]: { ...getProject_1() } },
      count,
    });
  });

  it('should return a new state on project ActionType.UPDATE_PROJECT_SUCCESS', () => {
    expect(reducer(undefined, actions.updateProjectSuccess(getProject_1()))).toEqual({ ...initialState, projectMap: { [getProject_1().id]: getProject_1() } });
  });

  it('should return a new state on project ActionType.FETCH_PROJECT_CATEGORY_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchCategoryListSuccess(list as any))).toEqual({ ...initialState, categoryList: list });
  });

  it('should return a new state on project ActionType.FETCH_PROJECT_REGION_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchRegionListSuccess(list as any))).toEqual({ ...initialState, regionList: list });
  });

  it('should return a new state on project ActionType.FETCH_PROJECT_FCANAE_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchNaeListSuccess(list as any))).toEqual({ ...initialState, fcaNaeList: list });
  });

  it('should return a new state on project ActionType.FETCH_BILLING_TIER_SUCCESS', () => {
    const list = [{ id: 'string', name: 'name' }];
    expect(reducer(undefined, actions.fetchBillingTierListSuccess(list as any))).toEqual({ ...initialState, billingTierList: list });
  });

  it('should return a new state on project ActionType.CLEAR_PROJECT_MAP', () => {
    expect(reducer(undefined, actions.clearProjectMap())).toEqual({ ...initialState, projectMap: {} });
  });

  it('should return a new state on project ActionType.ARCHIVE_PROJECT_SUCCESS', () => {
    const stateWithProject = {
      ...initialState,
      projectMap: {
        project1: {
          name: 'test',
        },
      },
    };
    const projectId = 'project1';
    expect(reducer(undefined, actions.archiveProjectSuccess(projectId))).toEqual({
      ...stateWithProject,
      projectMap: {
        project1: {
          status: 3,
        },
      },
    });
  });

  it('should return a new state on project ActionType.UNARCHIVE_PROJECT_SUCCESS', () => {
    const stateWithProject = {
      ...initialState,
      projectMap: {
        project1: {
          name: 'test',
        },
      },
    };
    const projectId = 'project1';
    expect(reducer(undefined, actions.unarchiveProjectSuccess(projectId))).toEqual({
      ...stateWithProject,
      projectMap: {
        project1: {
          status: 2,
        },
      },
    });
  });

  it('should return a new state on project ActionType.ASSOCIATE_ACCESS_CONTROL_SYSTEM_PROJECT', () => {
    const id = '123';
    const list = [{ location: { id: 'locId', name: 'locName' }, accessControlSystems: [{ id: '12' }, { id: '32' }, { id: 'aa' }] }] as any;
    expect(reducer(undefined, actions.associateAccessControlSystemProject(id, list))).toEqual({
      ...initialState,
      projectMap: {
        [id]: {
          acsIdListByLocation: [
            {
              location: { id: 'locId', name: 'locName' },
              accessControlSystems: ['12', '32', 'aa'],
            },
          ],
        },
      },
    });
  });

  describe('should return a new state on project ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS', () => {
    it('should remove location if it was the only ACS on that location', () => {
      const projectState = {
        ...initialState,
        projectMap: {
          [getProject_1().id]: {
            ...getProject_1(),
            acsIdListByLocation: [
              {
                location: getAccessControlSystemDevice_1().location,
                accessControlSystems: [getAccessControlSystemDevice_1().id],
              },
            ],
          },
        },
      };
      expect(reducer(projectState, actions.unAssignAccessControlSystemSuccess(getProject_1().id, getAccessControlSystemDevice_1().id))).toEqual({
        ...initialState,
        projectMap: { [getProject_1().id]: { ...getProject_1(), acsIdListByLocation: [] } },
      });
    });

    it('should remove ACS from location if there are more ACSs on that location', () => {
      const projectState = {
        ...initialState,
        projectMap: {
          [getProject_1().id]: {
            ...getProject_1(),
            acsIdListByLocation: [
              {
                location: getAccessControlSystemDevice_1().location,
                accessControlSystems: [getAccessControlSystemDevice_1().id, getAccessControlSystemDevice_2().id],
              },
            ],
          },
        },
      };
      expect(reducer(projectState, actions.unAssignAccessControlSystemSuccess(getProject_1().id, getAccessControlSystemDevice_2().id))).toEqual({
        ...initialState,
        projectMap: {
          [getProject_1().id]: {
            ...getProject_1(),
            acsIdListByLocation: [
              {
                location: getAccessControlSystemDevice_1().location,
                accessControlSystems: [getAccessControlSystemDevice_1().id],
              },
            ],
          },
        },
      });
    });

    it('locations without changes should left the same', () => {
      const projectState = {
        ...initialState,
        projectMap: {
          [getProject_1().id]: {
            ...getProject_1(),
            acsIdListByLocation: [
              {
                location: getAccessControlSystemDevice_1().location,
                accessControlSystems: [getAccessControlSystemDevice_1().id],
              },
              {
                location: { id: 'otherLocationId', name: 'otherLocationName' },
                accessControlSystems: [getAccessControlSystemDevice_2().id],
              },
            ],
          },
        },
      };
      expect(reducer(projectState, actions.unAssignAccessControlSystemSuccess(getProject_1().id, getAccessControlSystemDevice_1().id))).toEqual({
        ...initialState,
        projectMap: {
          [getProject_1().id]: {
            ...getProject_1(),
            acsIdListByLocation: [
              {
                location: { id: 'otherLocationId', name: 'otherLocationName' },
                accessControlSystems: [getAccessControlSystemDevice_2().id],
              },
            ],
          },
        },
      });
    });
  });

  it('should return a new state on project ActionType.ASSOCIATE_BADGE_PRINTING_SYSTEM_PROJECT', () => {
    const id = getProject_1().id;
    const list = [{ id: getBadgePrinterSystem_1().id }, { id: getBadgePrinterSystem_2().id }] as any;
    expect(reducer(undefined, actions.associateBadgePrintingSystemProject(id, list))).toEqual({
      ...initialState,
      projectMap: { [id]: { bpsIdList: [getBadgePrinterSystem_1().id, getBadgePrinterSystem_2().id] } },
    });
  });

  it('should return a new state on project ActionType.UNASSIGN_BADGE_PRINTING_SYSTEM_PROJECT_SUCCESS', () => {
    const projectState = { ...initialState, projectMap: { [getProject_1().id]: { ...getProject_1(), bpsIdList: [getBadgePrinterSystem_1().id] } } };
    expect(reducer(projectState, actions.unAssignBadgePrintingSystemSuccess(getProject_1().id, getBadgePrinterSystem_1().id))).toEqual({
      ...initialState,
      projectMap: { [getProject_1().id]: { ...getProject_1(), bpsIdList: [] } },
    });
  });

  it('should return a new state on project ActionType.FETCH_CLIENT_PROJECT_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchClientProjectListSuccess(getClient_1().id, [getProject_1()], 1))).toEqual({
      ...initialState,
      projectClientMap: { [getClient_1().id]: { [getProject_1().id]: getProject_1() } },
      count: 1,
    });
  });

  it('should return a new state on project ActionType.FETCH_WORKER_PROJECT_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchWorkerProjectListSuccess([getProject_1()], 1, getWorker_1().id))).toEqual({
      ...initialState,
      projectWorkerMap: { [getWorker_1().id]: { [getProject_1().id]: getProject_1() } },
      count: 1,
    });
  });

  it('should return a new state on project ActionType.FETCH_CONSENT_FORM_FIELDS_SUCCESS', () => {
    const consentFormFields = getConsentFormFieldConfigs();
    expect(reducer(undefined, actions.fetchConsentFormFieldsSuccess(consentFormFields as any))).toEqual({ ...initialState, consentFormFields });
  });

  it('should return a new state on project ActionType.FETCH_BADGE_VISITOR_ENTITY_LIST_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchBadgeVisitorEntityListSuccess(['one', 'two']))).toEqual({ ...initialState, badgeVisitorEntityList: ['one', 'two'] });
  });
});
