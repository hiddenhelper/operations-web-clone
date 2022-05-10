import { getInitialState } from '../../../../../../test/rootState';
import { procoreState } from '../../../../../state-mgmt/procore';
import { mapStateToProps, mapDispatchToProps } from './ProjectMappingsTabContainer';

describe('ProcoreProjectMappingsTabContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      procoreProjects: getInitialState().procore.procoreProjects,
      procoreProjectMappings: getInitialState().procore.procoreProjectMappings,
      procoreProjectsLoading: undefined,
      procoreProjectMappingsLoading: undefined,
      procoreProjectMappingsSaving: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProcoreProjects: expect.any(Function),
      fetchProcoreProjectMappings: expect.any(Function),
      saveProcoreProjectMappings: expect.any(Function),
    });
  });

  it('should dispatch fetch data start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProcoreProjects('123');
    props.fetchProcoreProjectMappings('123');
    expect(dispatch).toBeCalledWith(procoreState.actions.fetchProcoreProjectsStart('123'));
    expect(dispatch).toBeCalledWith(procoreState.actions.fetchProcoreProjectMappingsStart('123'));
  });

  it('should dispatch save data', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveProcoreProjectMappings('123', []);
    expect(dispatch).toBeCalledWith(procoreState.actions.saveProcoreProjectMappingsStart('123', []));
  });
});
