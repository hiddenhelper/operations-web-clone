import { getInitialState } from '../../../../../../test/rootState';
import { projectState } from '../../../../../state-mgmt/project';
import { mapStateToProps, mapDispatchToProps } from './ProjectsTabContainer';
import { push } from 'connected-react-router';
import { getProject_1 } from '../../../../../../test/entities';

describe('ProjectsTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectMap: getInitialState().project.projectWorkerMap,
      count: getInitialState().project.count,
      listLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkerProjectList: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkerProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerProjectList(getProject_1().id, {});
    expect(dispatch).toBeCalledWith(projectState.actions.fetchWorkerProjectListStart(getProject_1().id, {}));
  });

  it('should dispatch push action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const path = 'path';
    props.navigate(path);
    expect(dispatch).toBeCalledWith(push(path));
  });
});
