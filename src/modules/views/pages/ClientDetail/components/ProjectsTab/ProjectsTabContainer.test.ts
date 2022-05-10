import { mapDispatchToProps, mapStateToProps } from './ProjectsTabContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { projectState } from '../../../../../state-mgmt/project';

describe('ProjectsTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectMap: getInitialState().project.projectMap,
      projectClientMap: getInitialState().project.projectClientMap,
      projectCount: getInitialState().project.count,
      loading: undefined,
      loadingSummary: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProjectList: expect.any(Function),
      fetchProjectSummary: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectList('id', {});
    expect(dispatch).toBeCalledWith(projectState.actions.fetchClientProjectListStart('id', {}));
  });

  it('should dispatch fetchProjectSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectSummary('id');
    expect(dispatch).toBeCalledWith(projectState.actions.fetchProjectSummaryStart('id'));
  });
});
