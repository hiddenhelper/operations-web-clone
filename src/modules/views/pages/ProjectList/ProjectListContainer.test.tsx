import { mapStateToProps, mapDispatchToProps } from './ProjectListContainer';
import { getInitialState } from '../../../../test/rootState';
import { getProject_1 } from '../../../../test/entities';
import { projectState } from '../../../state-mgmt/project';
import { push } from 'connected-react-router';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('ProjectListContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      projectMap: getInitialState().project.projectMap,
      projectCount: getInitialState().project.count,
      projectStatistics: getInitialState().statistics.projectStatistics,
      invoiceStatistics: getInitialState().statistics.invoiceStatistics,
      listLoading: undefined,
      loading: undefined,
      deleteLoading: undefined,
      statisticsLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      navigate: expect.any(Function),
      fetchProjectList: expect.any(Function),
      fetchProjectSummary: expect.any(Function),
      clearProjectMap: expect.any(Function),
      deleteProject: expect.any(Function),
      fetchProjectStatistics: expect.any(Function),
      fetchInvoiceStatistics: expect.any(Function),
      clearProjectStatistics: expect.any(Function),
      clearInvoiceStatistics: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.fetchProjectList(query);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchProjectListStart(query));
  });

  it('should dispatch fetchProjectSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectSummary(getProject_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchProjectSummaryStart(getProject_1().id));
  });

  it('should dispatch clearProjectMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearProjectMap();
    expect(dispatch).toBeCalledWith(projectState.actions.clearProjectMap());
  });

  it('should dispatch deleteProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteProject('id', {});
    expect(dispatch).toBeCalledWith(projectState.actions.deleteProjectStart('id', {}));
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
  it('should dispatch fetchProjectStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectStatisticsStart());
  });
  it('should dispatch fetchInvoiceStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInvoiceStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchInvoiceStatisticsStart());
  });
  it('should dispatch clearProjectStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearProjectStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearProjectStatistics());
  });
  it('should dispatch clearInvoiceStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearInvoiceStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearInvoiceStatistics());
  });
});
