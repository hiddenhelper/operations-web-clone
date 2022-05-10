import { getInitialState } from '../../../../../../test/rootState';
import { getProject_1, getAccessControlSystemDevice_1, getProjectAccessControlSystem_1 } from '../../../../../../test/entities';
import { accessControlSystemState } from '../../../../../state-mgmt/access-control-system';
import { projectState } from '../../../../../state-mgmt/project';
import { generalState } from '../../../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './AccessControlSystemTabContainer';

describe('AccessControlSystemTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectAccessControlSystem: getInitialState().accessControlSystem.projectAccessControlSystem,
      accessControlSystemMap: getInitialState().accessControlSystem.accessControlSystemMap,
      accessControlSystemCount: getInitialState().accessControlSystem.count,
      modalMap: getInitialState().general.modalMap,
      modalCount: getInitialState().general.modalCount,
      assignAccessControlSystemLoading: undefined,
      accessControlSystemSummaryLoading: undefined,
      assignLoading: undefined,
      loadAccessControlSystemModalLoading: undefined,
      unassignAccessControlSystemLoading: undefined,
      accessControlSystemProjectLoading: undefined,
      accessControlSystemAssignProjectLoading: undefined,
      updateProjectAccessControlSystemLoading: undefined,
      accessControlSystemLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      assignAccessControlSystem: expect.any(Function),
      fetchAccessControlSystemList: expect.any(Function),
      fetchProjectAccessControlSystem: expect.any(Function),
      fetchProjectAccessControlSystemList: expect.any(Function),
      fetchAccessControlSystemSummary: expect.any(Function),
      unAssignAccessControlSystem: expect.any(Function),
      updateAccessControlSystem: expect.any(Function),
      clearLoading: expect.any(Function),
    });
  });

  it('should dispatch assignAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.assignAccessControlSystem(getProject_1().id, getProjectAccessControlSystem_1());
    expect(dispatch).toBeCalledWith(projectState.actions.assignAcsProjectStart(getProject_1().id, getProjectAccessControlSystem_1()));
  });

  it('should dispatch fetchProjectAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectAccessControlSystem(getProject_1().id, getAccessControlSystemDevice_1().id);
    expect(dispatch).toBeCalledWith(
      accessControlSystemState.actions.fetchProjectAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id)
    );
  });

  it('should dispatch fetchAccessControlSystemList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.fetchAccessControlSystemList(query);
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.fetchAccessControlSystemProjectListStart(query));
  });

  it('should dispatch fetchProjectAccessControlSystemList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectAccessControlSystemList(getProject_1().id, {});
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.fetchProjectAccessControlSystemListStart(getProject_1().id, {}));
  });

  it('should dispatch fetchAccessControlSystemSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchAccessControlSystemSummary(getAccessControlSystemDevice_1().id);
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.fetchAccessControlSystemSummaryStart(getAccessControlSystemDevice_1().id));
  });

  it('should dispatch unAssignAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.unAssignAccessControlSystem(getProject_1().id, getAccessControlSystemDevice_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.unAssignAccessControlSystemStart(getProject_1().id, getAccessControlSystemDevice_1().id));
  });

  it('should dispatch updateAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateAccessControlSystem(getProject_1().id, getAccessControlSystemDevice_1().id, getProjectAccessControlSystem_1());
    expect(dispatch).toBeCalledWith(
      accessControlSystemState.actions.updateProjectAccessControlSystemStart(
        getProject_1().id,
        getAccessControlSystemDevice_1().id,
        getProjectAccessControlSystem_1()
      )
    );
  });

  it('should dispatch clearLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoading('key');
    expect(dispatch).toBeCalledWith(generalState.actions.clear('key'));
  });
});
