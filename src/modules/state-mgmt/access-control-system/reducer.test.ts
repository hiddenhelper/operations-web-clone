import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getAccessControlSystemDevice_1, getProjectAccessControlSystem_1 } from '../../../test/entities';

describe('access-control-system reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on auth ActionType.FETCH_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS', () => {
    const accessControlSystem = { id: 'string' };
    expect(reducer(undefined, actions.fetchAccessControlSystemListSuccess([accessControlSystem as any], 1))).toEqual({
      ...initialState,
      accessControlSystemMap: { [accessControlSystem.id]: accessControlSystem },
      count: 1,
    });
  });

  it('should return a new state on auth ActionType.UPDATE_ACCESS_CONTROL_SYSTEM_SUCCESS', () => {
    const accessControlSystem = { id: 'string' };
    expect(reducer(undefined, actions.updateAccessControlSystemSuccess(accessControlSystem as any))).toEqual({
      ...initialState,
      accessControlSystemMap: { [accessControlSystem.id]: accessControlSystem },
    });
  });

  it('should return a new state on auth ActionType.FETCH_ACCESS_CONTROL_SYSTEM_SUCCESS', () => {
    const accessControlSystem = { id: 'string' };
    expect(reducer(undefined, actions.fetchAccessControlSystemSuccess(accessControlSystem as any))).toEqual({
      ...initialState,
      accessControlSystemMap: { [accessControlSystem.id]: accessControlSystem },
    });
  });

  it('should return a new state on client ActionType.CLEAR_ACCESS_CONTROL_SYSTEM_MAP', () => {
    expect(reducer(undefined, actions.clearAccessControlSystemMap())).toEqual({
      ...initialState,
      accessControlSystemMap: {},
      count: 0,
      projectAccessControlSystem: null,
    });
  });

  it('should return a new state on client ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_LIST_SUCCESS', () => {
    expect(
      reducer(
        undefined,
        actions.fetchProjectAccessControlSystemListSuccess([
          {
            location: getAccessControlSystemDevice_1().location,
            accessControlSystems: [getAccessControlSystemDevice_1()],
          },
        ])
      )
    ).toEqual({
      ...initialState,
      accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() },
    });
  });

  it('should return a new state on client ActionType.FETCH_PROJECT_ACCESS_CONTROL_SYSTEM_SUCCESS', () => {
    expect(reducer(undefined, actions.fetchProjectAccessControlSystemSuccess(getProjectAccessControlSystem_1()))).toEqual({
      ...initialState,
      projectAccessControlSystem: getProjectAccessControlSystem_1(),
    });
  });

  it('should return a new state on client ActionType.UNASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT_SUCCESS', () => {
    const initState = { ...initialState, accessControlSystemMap: { [getAccessControlSystemDevice_1().id]: getAccessControlSystemDevice_1() } };
    expect(reducer(initState, actions.unassignAccessControlSystemProjectSuccess(getAccessControlSystemDevice_1().id))).toEqual({
      ...initialState,
      accessControlSystemMap: {},
    });
  });
});
